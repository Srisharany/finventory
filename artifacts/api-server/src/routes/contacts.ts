import { Router } from "express";
import { db, contactsTable } from "@workspace/db";
import { eq, desc, count } from "drizzle-orm";
import { SubmitContactBody, ListAdminContactsQueryParams, UpdateContactStatusBody, UpdateContactStatusParams } from "@workspace/api-zod";
import { requireAuth } from "../lib/auth";

const router = Router();

router.post("/contacts", async (req, res): Promise<void> => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  await db.insert(contactsTable).values({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone ?? null,
    company: parsed.data.company ?? null,
    subject: parsed.data.subject ?? null,
    message: parsed.data.message,
    status: "new",
  });

  res.status(201).json({ success: true, message: "Thank you! We will get back to you shortly." });
});

router.get("/admin/contacts", requireAuth, async (req, res): Promise<void> => {
  const parsed = ListAdminContactsQueryParams.safeParse(req.query);
  const page = parsed.success ? (parsed.data.page ?? 1) : 1;
  const limit = parsed.success ? (parsed.data.limit ?? 20) : 20;
  const status = parsed.success ? parsed.data.status : undefined;
  const offset = (page - 1) * limit;

  const baseQuery = db.select().from(contactsTable);
  const countQuery = db.select({ count: count() }).from(contactsTable);

  const [totalResult] = status
    ? await countQuery.where(eq(contactsTable.status, status))
    : await countQuery;

  const total = Number(totalResult?.count ?? 0);

  const rows = status
    ? await baseQuery.where(eq(contactsTable.status, status)).orderBy(desc(contactsTable.createdAt)).limit(limit).offset(offset)
    : await baseQuery.orderBy(desc(contactsTable.createdAt)).limit(limit).offset(offset);

  res.json({
    data: rows.map(r => ({ ...r, id: String(r.id), createdAt: r.createdAt.toISOString() })),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
});

router.patch("/admin/contacts/:id", requireAuth, async (req, res): Promise<void> => {
  const params = UpdateContactStatusParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const body = UpdateContactStatusBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const id = parseInt(params.data.id, 10);
  await db.update(contactsTable).set({ status: body.data.status }).where(eq(contactsTable.id, id));

  res.json({ success: true, message: "Status updated" });
});

export default router;
