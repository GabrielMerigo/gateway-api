import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const accountsTable = pgTable('accounts', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  apiKey: varchar({ length: 255 }).notNull().unique(),
  balance: integer().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
