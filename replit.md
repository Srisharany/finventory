# Finventory

A premium SaaS marketing website for Finventory — India's all-in-one business management platform (accounting, inventory, payroll, CRM, HR, GST).

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/finventory run dev` — run the frontend (Vite, auto-port)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string, `SESSION_SECRET` — JWT signing secret

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 18 + Vite, Tailwind CSS v4, Framer Motion, Wouter routing, Sonner toasts
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- Auth: JWT (admin only), stored in localStorage key `finventory_admin_token`

## Where things live

- `artifacts/finventory/src/pages/` — all public pages (Home, Services, Industries, About, Contact, BookDemo, Pricing, FAQ, Blog, BlogPost)
- `artifacts/finventory/src/pages/admin/` — admin pages (Login, Dashboard, Contacts, Bookings, Blog)
- `artifacts/finventory/src/components/` — Navbar, Footer, and shadcn/ui components
- `artifacts/finventory/src/lib/auth.ts` — admin token helpers (`getAdminToken`, `setAdminToken`, `getAuthHeaders`, `logout`)
- `artifacts/api-server/src/routes/` — Express route handlers (auth, contacts, demo_bookings, blog, faqs, testimonials, admin_stats)
- `lib/db/src/schema.ts` — Drizzle ORM schema (contacts, demo_bookings, blog_posts, faqs, testimonials, users)
- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth for API contract)
- `lib/api-client-react/src/generated/api.ts` — generated React Query hooks

## Architecture decisions

- Contract-first API: OpenAPI spec drives Orval codegen for all hooks and Zod schemas
- Admin routes (`/api/admin/*`) require JWT Bearer token; `setAuthTokenGetter` wires token into every generated hook automatically
- No session cookies — JWT only, stored in localStorage (admin-only pattern)
- Proxy routes all traffic through shared proxy at port 80; API served at `/api`, frontend at `/`
- Framer Motion for all page animations; glassmorphism design with navy/blue/cyan brand palette

## Product

- **Public pages**: Home (hero + dashboard preview), Services (8 modules), Industries (7 sectors), About (story + team + timeline), Contact (form + WhatsApp CTA), Book Demo (scheduler form), Pricing (3-tier + comparison table), FAQ (accordion by category), Blog (paginated + category filter), Blog Detail
- **Admin panel** (`/admin`): Login with JWT auth, Dashboard (stats overview), Contacts list, Demo Bookings list, Blog Posts list
- **DB seed**: 6 blog posts, 10 FAQs, admin user `admin@finventory.com` / `password`, testimonials

## User preferences

- Brand colors: deep navy `#0B1F3A`, electric blue `#2563EB`, cyan `#06B6D4`
- Dark theme only throughout the entire site
- Premium, glassmorphism aesthetic
- Indian market focus (GST compliance, Indian rupee, Indian business context)

## Gotchas

- Always run `pnpm run typecheck:libs` after changing `lib/db/src/schema.ts` before typechecking `api-server`
- Run `pnpm --filter @workspace/api-spec run codegen` after changing `openapi.yaml`
- `useListAdminContacts`, `useListAdminDemoBookings`, `useListAdminBlogPosts` are the admin-authenticated hooks (not the public equivalents)
- `AdminStats` fields: `totalContacts`, `newContacts`, `totalDemoBookings`, `pendingDemoBookings`, `totalBlogPosts`, `publishedBlogPosts` (no `avgRating`)
- `ContactStatus` values: `new`, `read`, `replied`, `closed`

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
