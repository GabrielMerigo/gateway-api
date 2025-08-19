import {
  boolean,
  integer,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { uuid } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  apiKey: varchar({ length: 255 }).notNull().unique(),
  balance: integer().notNull(),
  isTotpEnabled: boolean().default(false).notNull(),
  password: varchar({ length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const invoicesTable = pgTable('invoices', {
  id: uuid().defaultRandom().primaryKey(),
  accountId: uuid().notNull(),
  amount: integer().notNull(),
  status: varchar({ length: 255 }).notNull().default('PENDING'),
  description: varchar({ length: 255 }),
  paymentType: varchar({ length: 255 }).notNull().default('PIX'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  // Card details
  expiryMonth: integer(),
  expiryYear: integer(),
  cardholderName: varchar({ length: 255 }),
  cardLastDigits: varchar({ length: 255 }),
});
