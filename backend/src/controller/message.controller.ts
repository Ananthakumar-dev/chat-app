import { Request, Response } from "express";
import db from "../lib/db.js";
import { users } from "../db/user.schema.js";
import { eq, not, or, and, desc, sql } from "drizzle-orm";
import { messages } from "../db/message.schema.js";

export const getAllContacts = async (req: Request, res: Response) => {
  const user_id = req.user?.id;

  if (!user_id) {
    return res.status(401).json({
      success: false,
      message: "User not found",
    });
  }

  const partnerIdSql = sql<number>`CASE
    WHEN ${messages.from} = ${user_id} THEN ${messages.to}
    ELSE ${messages.from}
  END`;

  const latestMessageByPartner = db
    .select({
      partner_id: partnerIdSql.as("partner_id"),
      last_message_id: sql<number>`MAX(${messages.id})`.as("last_message_id"),
    })
    .from(messages)
    .where(
      or(eq(messages.from, user_id), eq(messages.to, user_id)),
    )
    .groupBy(partnerIdSql)
    .as("latest_message_by_partner");

  const contacts = await db
    .select({
      id: users.id,
      name: users.name,
      last_message: {
        id: messages.id,
        from: messages.from,
        to: messages.to,
        message: messages.message,
        file: messages.file,
        created_at: messages.created_at,
        updated_at: messages.updated_at,
      },
    })
    .from(users)
    .leftJoin(
      latestMessageByPartner,
      sql`${latestMessageByPartner.partner_id} = ${users.id}`,
    )
    .leftJoin(messages, sql`${messages.id} = ${latestMessageByPartner.last_message_id}`)
    .where(not(eq(users.id, user_id)));

  res.status(200).json({
    success: true,
    message: "Contact listed successfully",
    data: {
      contacts,
    },
  });
};

export const getChatPartners = async (req: Request, res: Response) => {
  const user_id = req.user?.id;

  if (!user_id) {
    return res.status(401).json({
      success: false,
      message: "User not found",
    });
  }

  const partnerIdSql = sql<number>`CASE
    WHEN ${messages.from} = ${user_id} THEN ${messages.to}
    ELSE ${messages.from}
  END`;

  const latestMessageByPartner = db
    .select({
      partner_id: partnerIdSql.as("partner_id"),
      last_message_id: sql<number>`MAX(${messages.id})`.as("last_message_id"),
    })
    .from(messages)
    .where(
      or(eq(messages.from, user_id), eq(messages.to, user_id)),
    )
    .groupBy(partnerIdSql)
    .as("latest_message_by_partner");

  const chatPartners = await db
    .select({
      id: users.id,
      name: users.name,
      last_message: {
        id: messages.id,
        from: messages.from,
        to: messages.to,
        message: messages.message,
        file: messages.file,
        created_at: messages.created_at,
        updated_at: messages.updated_at,
      },
    })
    .from(users)
    .innerJoin(
      latestMessageByPartner,
      sql`${latestMessageByPartner.partner_id} = ${users.id}`,
    )
    .innerJoin(messages, sql`${messages.id} = ${latestMessageByPartner.last_message_id}`)
    .orderBy(desc(messages.id));

  res.status(200).json({
    success: true,
    message: "Chat partners listed successfully",
    data: {
      partners: chatPartners,
    },
  });
};

export const getMessageByUserId = async (req: Request, res: Response) => {
  const user_id = req.user?.id;

  if (!user_id) {
    return res.status(401).json({
      success: false,
      message: "User not found",
    });
  }

  const chat_user_id: number = Number(req.params.userId);

  const all_messages = await db
    .select()
    .from(messages)
    .where(
      or(
        and(
          eq(messages.to, chat_user_id),
          eq(messages.from, user_id as number),
        ),
        and(
          eq(messages.to, user_id as number),
          eq(messages.from, chat_user_id),
        ),
      ),
    )
    .orderBy(messages.created_at);

  res.status(200).json({
    success: true,
    message: "Messages listed successfully",
    data: {
      all_messages,
    },
  });
};
