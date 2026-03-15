import { Request, Response } from "express";
import bcrypt, { genSalt, hash } from "bcryptjs";
import { users } from "../db/user.schema.js";
import db from "../lib/db.js";
import { JwtConfig } from "../lib/jwt.js";
import { eq } from "drizzle-orm";
import "dotenv/config";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const salt = await genSalt(
      process.env.BCRYPT_SALT_ROUNDS
        ? Number(process.env.BCRYPT_SALT_ROUNDS)
        : 10,
    );
    const passwordEncrypted = await hash(password, salt);

    const user: typeof users.$inferInsert = {
      name,
      email,
      password: passwordEncrypted,
    };

    const [insert] = await db.insert(users).values(user).$returningId();

    // create jwt token
    const token = JwtConfig.generateToken({ id: insert.id, name, email });

    const isDevelopment = process.env.APP_ENV === "development";
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: !isDevelopment,
      sameSite: isDevelopment ? "lax" : "none",
      path: "/",
      domain: isDevelopment ? "localhost" : process.env.COOKIE_DOMAIN,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        user: {
          id: insert.id,
          email,
          name,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    if (!user) {
      throw new Error("User not found");
    }

    // compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // create jwt token
    const token = JwtConfig.generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    const isDevelopment = process.env.APP_ENV === "development";

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: !isDevelopment,
      sameSite: isDevelopment ? "lax" : "strict",
      path: "/",
      domain: isDevelopment ? "localhost" : process.env.COOKIE_DOMAIN,
    });

    res.status(200).json({
      success: true,
      message: "Login successfully",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
};
