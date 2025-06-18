
import { serial, text, pgTable, timestamp, pgEnum } from 'drizzle-orm/pg-core';

// Define the status enum
export const appRequestStatusEnum = pgEnum('app_request_status', [
  'pending',
  'generating', 
  'completed',
  'failed'
]);

export const appRequestsTable = pgTable('app_requests', {
  id: serial('id').primaryKey(),
  description: text('description').notNull(),
  generated_code: text('generated_code'), // Nullable by default
  status: appRequestStatusEnum('status').notNull().default('pending'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// TypeScript types for the table schema
export type AppRequest = typeof appRequestsTable.$inferSelect;
export type NewAppRequest = typeof appRequestsTable.$inferInsert;

// Export all tables for proper query building
export const tables = { appRequests: appRequestsTable };
