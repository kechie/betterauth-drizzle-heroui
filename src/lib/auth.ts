import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "../db";
import * as authSchema from "../db/schema";
export const auth = betterAuth({
    database: drizzleAdapter(db, {
      provider: "pg",
      schema: authSchema,
    }),
    emailAndPassword: {
        enabled: true // Required if you are building standard sign-in/sign-up components
    },
    plugins: [
      admin(),
    ],
});


// TODO: disable signup after the initial sign-up
