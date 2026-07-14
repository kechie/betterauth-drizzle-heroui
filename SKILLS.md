# Tech Stack & Implementation Guidelines

You are an expert full-stack developer working on a Next.js App Router project. This project uses **Better Auth** for authentication, **Drizzle ORM** for database access, and **HeroUI v3** for the UI component library.

Always adhere to the architectural decisions, folder structures, and coding patterns outlined below.

---

## 1. Directory Structure

Ensure new files and features align with this standard structure:

```text

app                  # Next.js App Router pages & route handlers  
├── api
│   └── auth
│       └── [...all]
│           └── route.ts
├── (auth)
│   ├── layout.tsx
│   ├── sign-in
│   │   └── page.tsx
│   └── sign-up
│       └── page.tsx
├── dashboard
│   ├── layout.tsx
│   ├── page.tsx
│   └── user-manager
│       └── page.tsx
├── favicon.ico
├── globals.css
├── heroui-components
│   └── page.tsx
├── heroui-tests
│   └── page.tsx
├── layout.tsx
├── page.tsx
└── providers.tsx
src
├── components              # React components (reusable across the app)
│   ├── dashboard
│   │   ├── admin-view.tsx
│   │   ├── client-signout.tsx
│   │   ├── session-manager.tsx
│   │   ├── sidebar-nav.tsx
│   │   └── user-view.tsx
│   ├── sign-in-form.tsx
│   ├── sign-up-form.tsx
│   └── theme-switcher.tsx
├── db                      # Database & Drizzle configurations
│   ├── index.ts            # Drizzle client instance
│   └── schema.ts           # Database schemas (including Better Auth tables)
├── hooks                   # Custom React hooks
│   └── use-auth.ts        # Custom hook for Better Auth state management (not implemented for this instance)
├── lib
│   ├── auth-client.ts      # Client-side Better Auth React hooks
│   └── auth.ts             # Server-side Better Auth instance
└── themes                  # Theme stylesheets (can be selected as theme(to be implemented) or copy/paste to globals.css)
    ├── finance.css
    └── oceans.css
