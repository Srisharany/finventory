import { Router } from "express";
import { db, testimonialsTable } from "@workspace/db";

const router = Router();

router.get("/testimonials", async (_req, res): Promise<void> => {
  const rows = await db.select().from(testimonialsTable);
  res.json(rows.map(r => ({ ...r, id: String(r.id) })));
});

export default router;
