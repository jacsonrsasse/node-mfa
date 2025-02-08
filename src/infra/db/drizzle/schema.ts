import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

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

export const userTokenTable = sqliteTable('user_token', {
  userId: integer('user_id').references(() => userTable.id),
  refreshToken: text('refresh_token').notNull(),
  expiresAt: text('expires_at').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const userSecondFactorTable = sqliteTable('user_second_factor', {
  userId: integer('user_id')
    .primaryKey()
    .references(() => userTable.id),
  hash: text().notNull(),
  validatedAt: text('validated_at'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});
