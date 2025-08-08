import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { uuid } from 'drizzle-orm/pg-core';

export const accountsTable = pgTable('accounts', {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  apiKey: varchar({ length: 255 }).notNull().unique(),
  balance: integer().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const invoicesTable = pgTable('invoices', {
  id: uuid().defaultRandom().primaryKey(),
  accountId: uuid().notNull(),
  amount: integer().notNull(),
  status: varchar({ length: 255 }).notNull().default('PENDING'),
  description: varchar({ length: 255 }).notNull(),
  paymentType: varchar({ length: 255 }).notNull().default('PIX'),
  cardLastDigits: varchar({ length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
