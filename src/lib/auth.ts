import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle-adapter";
import { db } from "../db";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
    }),
    emailAndPassword: {
        enabled: true // Required if you are building standard sign-in/sign-up components
    }
});


// TODO: disable signup after the initial sign-up
