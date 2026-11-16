import {
  pgTable,
  integer,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const admin = pgTable("admin", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: text().notNull().unique(),
  password: text().notNull(),
});

export const product = pgTable("product", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  description: text(),
  category: text().notNull().default("hairstyle"),
  price: integer(),
  image1Url: text("image_1_url"),
  image2Url: text("image_2_url"),
  featured: boolean().notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
