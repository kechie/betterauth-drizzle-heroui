// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { createAccessControl } from "better-auth/plugins/access";
import { adminAc } from "better-auth/plugins/admin/access";
import { APIError } from "better-auth/api";
import { db } from "../db";
import * as authSchema from "../db/schema";

// 1. Define your system's resources and permitted CRUD actions
const statements = {
  user: ["create", "list", "set-role", "ban", "delete"],
  session: ["read", "list", "revoke", "delete"]
} as const; // 👈 Note the "as const" — this is critical for TypeScript auto-inference!

// 2. Pass the statements directly to the constructor
const ac = createAccessControl(statements);

// 3. Define your roles securely as before
const superadminRole = ac.newRole({
  user: ["create", "list", "set-role", "ban", "delete"],
  session: ["read", "list", "revoke", "delete"],
});

const useradminRole = ac.newRole({
  user: ["create", "list", "set-role", "ban", "delete"],
  session: ["read"],
});

const adminRole = ac.newRole({
  user: ["create", "list", "set-role", "ban"],
  session: ["read"],
});

export const auth = betterAuth({
    database: drizzleAdapter(db, {
      provider: "pg",
      schema: authSchema,
    }),
    emailAndPassword: {
        enabled: true
    },
    databaseHooks: {
      user: {
        create: {
          before: async (user) => {
            const existingUsers = await db.select().from(authSchema.user).limit(1);
            if (existingUsers.length > 0) {
              throw new APIError("BAD_REQUEST", {
                message: "Registration is closed. Please contact system administrators.",
              });
            }
            // First user automatically claims the superadmin role
            user.role = "superadmin";
            return { user };
          }
        }
      }
    },
    plugins: [
      admin({
        // 2. Pass your custom Access Control properties cleanly
        ac,
        roles: {
          superadmin: superadminRole,
          admin: adminRole,
          useradmin: useradminRole,
        },
        adminRoles: ["superadmin", "admin", "useradmin"],
      }),
    ],
});
