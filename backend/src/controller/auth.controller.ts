import { Request, Response } from "express";
import { genSalt, hash } from "bcryptjs";
import { users } from "../db/user.schema";
import db from "../lib/db";
import { JwtConfig } from "../lib/jwt";
import { eq } from 'drizzle-orm';
import "dotenv/config";

export const signup = async (req: Request, res: Response) => {
    try {
        const {name, email, password} = req.body;
        const salt = await genSalt(password);
        const passwordEncrypted = await hash(password, salt);

        const user: typeof users.$inferInsert = {
            name,
            email,
            password: passwordEncrypted
        }

        const [insert] = await db.insert(users).values(user).$returningId();

        // create jwt token
        const token = JwtConfig.generateToken({ id: insert.id, name, email });

        res.cookie('token', token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            sameSite: 'strict',
            httpOnly: true,
            secure: process.env.APP_ENV === 'developement' ? true : false
        })

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                name,
                email
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1)
        if(!user) {
            throw new Error("User not found");
        }

        // create jwt token
        const token = JwtConfig.generateToken({ id: user.id, name: user.name, email: user.email });

        res.cookie('token', token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            sameSite: 'strict',
            httpOnly: true,
            secure: process.env.APP_ENV === 'developement' ? true : false
        })

        res.status(201).json({
            success: true,
            message: "Login successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const logout = (req: Request, res: Response) => {
    res.clearCookie('token');

    res.status(200).json({
        success: true,
        message: "Logout successfully"
    })
}