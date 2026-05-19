import { Router } from "express";
import { db, contactsTable, demoBookingsTable, blogPostsTable } from "@workspace/db";
import { eq, count } from "drizzle-orm";
import { requireAuth } from "../lib/auth";

const router = Router();

router.get("/admin/stats", requireAuth, async (_req, res): Promise<void> => {
  const [[totalContacts], [newContacts], [totalDemos], [pendingDemos], [totalBlogs], [publishedBlogs]] = await Promise.all([
    db.select({ count: count() }).from(contactsTable),
    db.select({ count: count() }).from(contactsTable).where(eq(contactsTable.status, "new")),
    db.select({ count: count() }).from(demoBookingsTable),
    db.select({ count: count() }).from(demoBookingsTable).where(eq(demoBookingsTable.status, "pending")),
    db.select({ count: count() }).from(blogPostsTable),
    db.select({ count: count() }).from(blogPostsTable).where(eq(blogPostsTable.published, true)),
  ]);

  res.json({
    totalContacts: Number(totalContacts?.count ?? 0),
    newContacts: Number(newContacts?.count ?? 0),
    totalDemoBookings: Number(totalDemos?.count ?? 0),
    pendingDemoBookings: Number(pendingDemos?.count ?? 0),
    totalBlogPosts: Number(totalBlogs?.count ?? 0),
    publishedBlogPosts: Number(publishedBlogs?.count ?? 0),
  });
});

export default router;
