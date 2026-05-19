import { Router } from "express";
import { db, demoBookingsTable } from "@workspace/db";
import { eq, desc, count } from "drizzle-orm";
import { SubmitDemoBookingBody, ListAdminDemoBookingsQueryParams, UpdateDemoBookingStatusBody, UpdateDemoBookingStatusParams } from "@workspace/api-zod";
import { requireAuth } from "../lib/auth";

const router = Router();

router.post("/demo-bookings", async (req, res): Promise<void> => {
  const parsed = SubmitDemoBookingBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  await db.insert(demoBookingsTable).values({
    fullName: parsed.data.fullName,
    businessName: parsed.data.businessName,
    industry: parsed.data.industry,
    phone: parsed.data.phone,
    email: parsed.data.email,
    companySize: parsed.data.companySize,
    preferredDate: parsed.data.preferredDate,
    preferredTime: parsed.data.preferredTime,
    message: parsed.data.message ?? null,
    status: "pending",
  });

  res.status(201).json({ success: true, message: "Demo booked! Our team will confirm shortly." });
});

router.get("/admin/demo-bookings", requireAuth, async (req, res): Promise<void> => {
  const parsed = ListAdminDemoBookingsQueryParams.safeParse(req.query);
  const page = parsed.success ? (parsed.data.page ?? 1) : 1;
  const limit = parsed.success ? (parsed.data.limit ?? 20) : 20;
  const status = parsed.success ? parsed.data.status : undefined;
  const offset = (page - 1) * limit;

  const baseQuery = db.select().from(demoBookingsTable);
  const countQuery = db.select({ count: count() }).from(demoBookingsTable);

  const [totalResult] = status
    ? await countQuery.where(eq(demoBookingsTable.status, status))
    : await countQuery;

  const total = Number(totalResult?.count ?? 0);

  const rows = status
    ? await baseQuery.where(eq(demoBookingsTable.status, status)).orderBy(desc(demoBookingsTable.createdAt)).limit(limit).offset(offset)
    : await baseQuery.orderBy(desc(demoBookingsTable.createdAt)).limit(limit).offset(offset);

  res.json({
    data: rows.map(r => ({ ...r, id: String(r.id), createdAt: r.createdAt.toISOString() })),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
});

router.patch("/admin/demo-bookings/:id", requireAuth, async (req, res): Promise<void> => {
  const params = UpdateDemoBookingStatusParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const body = UpdateDemoBookingStatusBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const id = parseInt(params.data.id, 10);
  await db.update(demoBookingsTable).set({ status: body.data.status }).where(eq(demoBookingsTable.id, id));

  res.json({ success: true, message: "Status updated" });
});

export default router;
