import { date, int, mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';

export const messages = mysqlTable('messages', {
    id: serial().primaryKey(),
    from: int().notNull(),
    to: int().notNull(),
    message: varchar({ length: 255 }).notNull(),
    file: varchar({ length: 255 }),
    created_at: date().notNull(),
    updated_at: date().notNull()
});