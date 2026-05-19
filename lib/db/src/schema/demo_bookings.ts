import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const demoBookingsTable = pgTable("demo_bookings", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  businessName: text("business_name").notNull(),
  industry: text("industry").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  companySize: text("company_size").notNull(),
  preferredDate: text("preferred_date").notNull(),
  preferredTime: text("preferred_time").notNull(),
  message: text("message"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertDemoBookingSchema = createInsertSchema(demoBookingsTable).omit({ id: true, createdAt: true });
export type InsertDemoBooking = z.infer<typeof insertDemoBookingSchema>;
export type DemoBooking = typeof demoBookingsTable.$inferSelect;
