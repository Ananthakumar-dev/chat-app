import { Request, Response } from "express";
import db from "../lib/db";
import { eq } from "drizzle-orm";
import { messages } from "../db/message.schema";
import path from "node:path";
import fs from "node:fs/promises";

interface SendMessageRequest {
    message: string;
    file?: File;
}

const uploadDir = path.join(process.cwd(), "uploads");

export const send = async (req: Request, res: Response) => {
    const user_id = req.user?.id;

    if(!user_id) {
        res.status(401).json({
            success: false,
            message: "User not found"
        })
    }

    const { message, file }: SendMessageRequest = req.body;
    let filename = '';

    if(file) {
        // File upload logic
        // upload image to local directory and save the path to the database
        filename = `${Date.now()}_${file.name}`;
        const filePath = path.join(uploadDir, filename);
        const buffer = Buffer.from(await file.arrayBuffer());
        await fs.writeFile(filePath, buffer);
    }

    const now = new Date();
    await db.insert(messages).values({
        from: user_id as number,
        to: Number(req.params.id),
        message,
        file: file ? filename : null,
        created_at: now,
        updated_at: now
    });

    res.status(200).json({
        success: true,
        message: "Message sent successfully"
    });
}

export const update = async (req: Request, res: Response) => {
    const user_id = req.user?.id;

    if(!user_id) {
        res.status(401).json({
            success: false,
            message: "User not found"
        })
    }

    const message_id = Number(req.params.id);
    const { message }: { message: string } = req.body;

    const [msg] = await db.select().from(messages).where(eq(messages.id, message_id)).limit(1);
    if(!msg) {
        res.status(404).json({
            success: false,
            message: "Message not found"
        })
    }

    if(msg.from !== user_id) {
        res.status(403).json({
            success: false,
            message: "You are not authorized to update this message"
        })
    }

    await db.update(messages).set({
        message,
        updated_at: new Date()
    }).where(eq(messages.id, message_id));

    res.status(200).json({
        success: true,
        message: "Message updated successfully"
    });
}

export const destroy = async (req: Request, res: Response) => {
    const user_id = req.user?.id;

    if(!user_id) {
        res.status(401).json({
            success: false,
            message: "User not found"
        })
    }

    const message_id = Number(req.params.id);
    const { message }: { message: string } = req.body;

    const [msg] = await db.select().from(messages).where(eq(messages.id, message_id)).limit(1);
    if(!msg) {
        res.status(404).json({
            success: false,
            message: "Message not found"
        })
    }

    if(msg.from !== user_id) {
        res.status(403).json({
            success: false,
            message: "You are not authorized to delete this message"
        })
    }

    await db.delete(messages).where(eq(messages.id, message_id));

    res.status(200).json({
        success: true,
        message: "Message deleted successfully"
    });
}