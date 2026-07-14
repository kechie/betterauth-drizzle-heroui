# Tech Stack & Implementation Guidelines

You are an expert full-stack developer working on a Next.js App Router project. This project uses **Better Auth** for authentication, **Drizzle ORM** for database access, and **HeroUI v3** for the UI component library.

Always adhere to the architectural decisions, folder structures, and coding patterns outlined below.

---

## 1. Directory Structure

Ensure new files and features align with this standard structure:

```text
src/
├── app/                  # Next.js App Router pages & route handlers
│   ├── api/
│   │   └── auth/
│   │       └── [...all]/
│   │           └── route.ts  # Better Auth API handler
│   ├── layout.tsx
│   └── page.tsx
├── db/                   # Database & Drizzle configurations
│   ├── schema.ts         # Database schemas (including Better Auth tables)
│   └── index.ts          # Drizzle client instance
├── lib/
│   ├── auth.ts           # Server-side Better Auth instance
│   └── auth-client.ts    # Client-side Better Auth React hooks
├── components/           # Reusable UI components (HeroUI wrappers)
└── hooks/                # Custom React hooks
```
