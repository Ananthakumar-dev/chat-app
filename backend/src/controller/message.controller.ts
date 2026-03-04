import { Request, Response } from "express";
import db from "../lib/db";
import { users } from "../db/user.schema";
import { eq, not, or, and } from "drizzle-orm";
import { messages } from "../db/message.schema";

export const getAllContacts = async (req: Request, res: Response) => {
    const user_id = req.user?.id;

    if(!user_id) {
        res.status(401).json({
            success: false,
            message: "User not found"
        })
    }

    const contacts = await db.select({id: users.id, name: users}).from(users).where(not(eq(users.id, user_id as number)));

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

    const chatPartners = await db.select({id: users.id, name: users.name}).from(users).where(
        and(
            not(eq(users.id, user_id as number)),
            or(...Array.from(chatPartnersIds).map(id => eq(users.id, id)))
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

export const getMessageById = async (req: Request, res: Response) => {
    const user_id = req.user?.id;

    if(!user_id) {
        res.status(401).json({
            success: false,
            message: "User not found"
        })
    }

    const chat_user_id: number = Number(req.params.id);

    const all_messages = await db.select().from(messages).where(
        or(
            and(eq(messages.to, chat_user_id), eq(messages.from, user_id as number)), 
            and(eq(messages.to, user_id as number), eq(messages.from, chat_user_id))
        ));

    res.status(200).json({
        success: true,
        message: "Messages listed successfully",
        data: {
            all_messages
        }
    })
}