import { Request, Response } from "express";
import db from "../lib/db.js";
import { users } from "../db/user.schema.js";
import { eq, not, or, and } from "drizzle-orm";
import { messages } from "../db/message.schema.js";

export const getAllContacts = async (req: Request, res: Response) => {
    const user_id = req.user?.id;

    if(!user_id) {
        res.status(401).json({
            success: false,
            message: "User not found"
        })
    }

    const contacts = await db
        .select({
            id: users.id,
            name: users.name
        })
        .from(users)
        .where(not(eq(users.id, user_id as number)));

    res.status(200).json({
        success: true,
        message: "Contact listed successfully",
        data: {
            contacts
        }
    })
}

export const getChatPartners = async (req: Request, res: Response) => {
    const user_id = req.user?.id;

    if(!user_id) {
        res.status(401).json({
            success: false,
            message: "User not found"
        })
    }

    const message = await db.select().from(messages).where(
        or(eq(messages.to, user_id as number), eq(messages.from, user_id as number))
    );

    const chatPartnersIds = new Set<number>();

    message.forEach((msg) => {
        if(msg.to !== user_id) {
            chatPartnersIds.add(msg.to);
        }
        if(msg.from !== user_id) {
            chatPartnersIds.add(msg.from);
        }
    });

    const ids = Array.from(chatPartnersIds);

    if (ids.length === 0) {
        return res.json({
            success: true,
            data: { chatPartners: [] }
        });
    }

    const chatPartners = await db.select({id: users.id, name: users.name}).from(users).where(
        and(
            not(eq(users.id, user_id as number)),
            or(...ids.map(id => eq(users.id, id)))
        )
    );

    res.status(200).json({
        success: true,
        message: "Chat partners listed successfully",
        data: {
            chatPartners
        }
    })
}

export const getMessageByUserId = async (req: Request, res: Response) => {
    const user_id = req.user?.id;

    if(!user_id) {
        res.status(401).json({
            success: false,
            message: "User not found"
        })
    }

    const chat_user_id: number = Number(req.params.userId);

    const all_messages = await db
        .select()
        .from(messages)
        .where(
            or(
            and(eq(messages.to, chat_user_id), eq(messages.from, user_id as number)),
            and(eq(messages.to, user_id as number), eq(messages.from, chat_user_id))
            )
        )
        .orderBy(messages.created_at);

    res.status(200).json({
        success: true,
        message: "Messages listed successfully",
        data: {
            all_messages
        }
    })
}