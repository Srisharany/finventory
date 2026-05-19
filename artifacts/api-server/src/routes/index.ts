import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import contactsRouter from "./contacts";
import demoBookingsRouter from "./demo_bookings";
import blogRouter from "./blog";
import faqsRouter from "./faqs";
import testimonialsRouter from "./testimonials";
import adminStatsRouter from "./admin_stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(contactsRouter);
router.use(demoBookingsRouter);
router.use(blogRouter);
router.use(faqsRouter);
router.use(testimonialsRouter);
router.use(adminStatsRouter);

export default router;
