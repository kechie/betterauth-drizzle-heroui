# ⚡ Next.js + HeroUI + Drizzle + Better Auth Starter

A production-ready, type-safe Next.js boilerplate. This setup features a robust database layer with Drizzle ORM, secure session-based authentication with Better Auth, modern accessible UI styling via HeroUI, and standard Lucide React icons.

---

## 📂 Project Structure

```text
├── src/
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── admin-view.tsx       # Admin panel view
│   │   │   ├── client-signout.tsx   # Client-side signout trigger
│   │   │   ├── session-manager.tsx  # Interactive session/token inspector
│   │   │   ├── sidebar-nav.tsx      # Dashboard navigation layout
│   │   │   └── user-view.tsx        # Standard user panel view
│   │   ├── sign-in-form.tsx         # Handled Client UI for Sign In
│   │   ├── sign-up-form.tsx         # Handled Client UI for Sign Up
│   │   └── theme-switcher.tsx       # Dark/Light/Custom theme toggler
│   ├── db/
│   │   ├── index.ts                 # Database client instantiation
│   │   └── schema.ts                # Table definitions (User, Session, Account)
│   └── lib/
│       ├── auth-client.ts           # Better Auth client for hooks (useSession, etc.)
│       └── auth.ts                  # Better Auth server config and DB adapter
├── app/
│   ├── (auth)/                      # Grouped Auth Routes (hides from URL path)
│   │   ├── layout.tsx               # Auth layout wrapper (forms container)
│   │   ├── sign-in/page.tsx         # Sign In Page
│   │   └── sign-up/page.tsx         # Sign Up Page
│   ├── api/auth/[...all]/route.ts   # Better Auth API catch-all endpoint
│   ├── dashboard/
│   │   ├── user-manager/page.tsx    # Admin user management panel
│   │   ├── layout.tsx               # Dashboard sidebar/navigation frame
│   │   └── page.tsx                 # Dashboard entry point
│   ├── heroui-components/page.tsx   # Showcase and reference for your UI components
│   ├── heroui-tests/page.tsx        # Playground sandbox for layout testing
│   ├── themes/                      # Custom custom CSS theme configurations
│   │   ├── finance.css              
│   │   └── oceans.css               
│   ├── globals.css                  # Global Tailwind imports & custom rules
│   ├── layout.tsx                   # Main HTML layout
│   ├── page.tsx                     # Landing homepage
│   └── providers.tsx                # Context providers (HeroUI, ThemeProvider)
├── drizzle.config.ts                # Drizzle migration and database parameters
├── tailwind.config.ts               # Tailwind configurations with HeroUI plugins
└── .env.example                     # Environment variables schema
```

## Quick Start
### 1. Project Setup & Dependency Installation

Clone this repository and install your packages. This project relies on React 19-compatible packages with Yarn Berry / Pnpm / Bun.
```bash
git clone <your-repo-url>
cd <your-project-name>
npm install # or yarn install / pnpm install / bun install
```

### 2. Configure Environment Variables

Create a .env.local file in your root folder:

### 3. Sync Your Database Schema

Deploy Better Auth structures (user, session, account, etc.) and your custom tables straight to your database instance:
```bash
npx drizzle-kit push
```

### 4. Run the Development Server

Start the development server to see your changes in action:
```bash
npm run dev # or yarn dev / pnpm dev / bun dev
```

## Core Stack Concepts & Configs
### Auth Integration (src/lib/auth.ts & src/lib/auth-client.ts)

Our authentication framework splits cleanly into Server and Client instances:

- Server Core (src/lib/auth.ts): Directly interfaces with your PostgreSQL DB using Drizzle Adapter. It also includes the nextCookies() plugin to guarantee bulletproof cookie state sync within Next.js Server Actions and Router.
- Client Core (src/lib/auth-client.ts): Lightweight client library wrapper for React Components. Simply fetch sessions inside your layout hooks:
```tsx
import { authClient } from "@/lib/auth-client";
const { data: session, isPending } = authClient.useSession();
```

## Custom Themes & HeroUI (app/themes/ & app/providers.tsx)

This boilerplate includes custom styled setups (oceans.css and finance.css) to swap color palettes easily using HeroUI. All CSS files, global overrides, and HeroUI configurations are bound under /app/providers.tsx which wraps the root /app/layout.tsx.

Make sure custom layout containers utilize your classes appropriately:
```html
<!-- Example of applying custom classes globally -->
<div class="oceans-theme text-foreground bg-background">
  <!-- Content here -->
</div>
```

## Developer Cheat Sheet

Command | Action
--- | ---
`npm run dev` | Spins up the Next.js local server
`npx drizzle-kit push` | Force pushes Drizzle schema modifications directly without generating migration files (ideal for rapid initial iterations)
`npx drizzle-kit generate` | Generates safe, version-controlled SQL migration scripts
`npx drizzle-kit migrate` | Executes pending local SQL files onto your production/staging instances
`npx drizzle-kit studio` | Opens an elegant database GUI viewer on localhost:4983
