import { Request, Response, NextFunction } from "express";
import { JwtConfig } from "../lib/jwt.js";
import db from "../lib/db.js";
import { users } from "../db/user.schema.js";
import { eq } from "drizzle-orm";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                name: string;
                email: string;
                password: string;
            };
        }
    }
}

export const protectedRoute = async (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.cookies?.token;

    if(!token) {
        return res.status(401).json({
            success: false,
            message: "Token not found"
        })
    }

    const verify = JwtConfig.verifyToken(token);
    const [user] = await db.select().from(users).where(eq(users.id, verify.id)).limit(1);

    if(!user) {
        return res.status(404).json({
            success: false,
            message: "Token not found"
        })
    }

    req.user = user;

    next();
}