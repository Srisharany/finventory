import { Router } from "express";
import { db, blogPostsTable } from "@workspace/db";
import { eq, desc, count, and } from "drizzle-orm";
import { ListBlogPostsQueryParams, GetBlogPostParams, CreateBlogPostBody, UpdateBlogPostBody, UpdateBlogPostParams, DeleteBlogPostParams } from "@workspace/api-zod";
import { requireAuth } from "../lib/auth";

const router = Router();

function formatPost(p: typeof blogPostsTable.$inferSelect) {
  return {
    id: String(p.id),
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    content: p.content,
    category: p.category,
    tags: p.tags ?? [],
    coverImage: p.coverImage ?? undefined,
    author: p.author,
    published: p.published,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  };
}

router.get("/blog", async (req, res): Promise<void> => {
  const parsed = ListBlogPostsQueryParams.safeParse(req.query);
  const page = parsed.success ? (parsed.data.page ?? 1) : 1;
  const limit = parsed.success ? (parsed.data.limit ?? 9) : 9;
  const category = parsed.success ? parsed.data.category : undefined;
  const offset = (page - 1) * limit;

  const whereClause = category
    ? and(eq(blogPostsTable.published, true), eq(blogPostsTable.category, category))
    : eq(blogPostsTable.published, true);

  const [totalResult] = await db.select({ count: count() }).from(blogPostsTable).where(whereClause);
  const total = Number(totalResult?.count ?? 0);

  const rows = await db.select().from(blogPostsTable).where(whereClause).orderBy(desc(blogPostsTable.createdAt)).limit(limit).offset(offset);

  res.json({
    data: rows.map(formatPost),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
});

router.get("/blog/:slug", async (req, res): Promise<void> => {
  const params = GetBlogPostParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: "Invalid slug" });
    return;
  }

  const [post] = await db.select().from(blogPostsTable).where(and(eq(blogPostsTable.slug, params.data.slug), eq(blogPostsTable.published, true)));

  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  res.json(formatPost(post));
});

router.get("/admin/blog", requireAuth, async (req, res): Promise<void> => {
  const rows = await db.select().from(blogPostsTable).orderBy(desc(blogPostsTable.createdAt));
  res.json({
    data: rows.map(formatPost),
    total: rows.length,
    page: 1,
    totalPages: 1,
  });
});

router.post("/admin/blog", requireAuth, async (req, res): Promise<void> => {
  const parsed = CreateBlogPostBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [post] = await db.insert(blogPostsTable).values({
    title: parsed.data.title,
    slug: parsed.data.slug,
    excerpt: parsed.data.excerpt,
    content: parsed.data.content,
    category: parsed.data.category,
    tags: parsed.data.tags ?? [],
    coverImage: parsed.data.coverImage ?? null,
    author: parsed.data.author,
    published: parsed.data.published ?? false,
  }).returning();

  res.status(201).json(formatPost(post));
});

router.put("/admin/blog/:id", requireAuth, async (req, res): Promise<void> => {
  const params = UpdateBlogPostParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const parsed = UpdateBlogPostBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const id = parseInt(params.data.id, 10);
  const [post] = await db.update(blogPostsTable).set({
    title: parsed.data.title,
    slug: parsed.data.slug,
    excerpt: parsed.data.excerpt,
    content: parsed.data.content,
    category: parsed.data.category,
    tags: parsed.data.tags ?? [],
    coverImage: parsed.data.coverImage ?? null,
    author: parsed.data.author,
    published: parsed.data.published ?? false,
  }).where(eq(blogPostsTable.id, id)).returning();

  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  res.json(formatPost(post));
});

router.delete("/admin/blog/:id", requireAuth, async (req, res): Promise<void> => {
  const params = DeleteBlogPostParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const id = parseInt(params.data.id, 10);
  await db.delete(blogPostsTable).where(eq(blogPostsTable.id, id));

  res.json({ success: true, message: "Post deleted" });
});

export default router;
