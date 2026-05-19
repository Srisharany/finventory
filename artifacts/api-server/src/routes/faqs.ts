import { Router } from "express";
import { db, faqsTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";
import { ListFaqsQueryParams } from "@workspace/api-zod";

const router = Router();

router.get("/faqs", async (req, res): Promise<void> => {
  const parsed = ListFaqsQueryParams.safeParse(req.query);
  const category = parsed.success ? parsed.data.category : undefined;

  const rows = category
    ? await db.select().from(faqsTable).where(eq(faqsTable.category, category)).orderBy(asc(faqsTable.order))
    : await db.select().from(faqsTable).orderBy(asc(faqsTable.order));

  res.json(rows.map(r => ({ ...r, id: String(r.id) })));
});

export default router;
