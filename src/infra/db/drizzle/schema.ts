import { relations, sql } from 'drizzle-orm';
import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable('user', {
  id: integer('user_id').primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().unique().notNull(),
  password: text().notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const userRelations = relations(userTable, ({ one }) => ({
  userTokenTable: one(userTokenTable, {
    fields: [userTable.id],
    references: [userTokenTable.userId],
  }),

  userSecondFactorTable: one(userSecondFactorTable, {
    fields: [userTable.id],
    references: [userSecondFactorTable.userId],
  }),
}));

export const userTokenTable = sqliteTable(
  'user_token',
  {
    userId: integer('user_id')
      .references(() => userTable.id)
      .notNull(),
    refreshToken: text('refresh_token').notNull(),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    primaryKey({
      name: 'user_token_pk',
      columns: [table.userId],
    }),
  ],
);

export const userSecondFactorTable = sqliteTable(
  'user_second_factor',
  {
    userId: integer('user_id')
      .references(() => userTable.id)
      .notNull(),
    type: text({ enum: ['one_time_password', 'pin_email'] })
      .notNull()
      .default('one_time_password'),
    otpHash: text('otp_hash'),
    otpValidatedAt: text('otp_validated_at'),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    primaryKey({
      name: 'user_second_factor_pk',
      columns: [table.userId],
    }),
  ],
);
