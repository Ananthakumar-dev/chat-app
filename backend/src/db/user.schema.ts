import { int, mysqlTable, serial, varchar, date } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  avatar: varchar({ length: 255 }),
  created_at: date().notNull(),
    updated_at: date().notNull()
});