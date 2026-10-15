// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "@better-auth/mongo-adapter";

// const client = new MongoClient(process.env.BETTER_AUTH_MONGODB_URL as string);
// const db = client.db("bazar-dor-a7");

// export const auth = betterAuth({
//     emailAndPassword:{
//         enabled: true,
//     },
//   database: mongodbAdapter(db, {
//     client,
//   }),
// });



import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { mongoClient, mongoDb } from "@/lib/mongo";

// only register a provider when its keys are actually present, otherwise
// better-auth tries to build an authorization url out of undefined
const socialProviders: Record<string, { clientId: string; clientSecret: string }> = {};

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  socialProviders.google = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
}

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  socialProviders.github = {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  };
}

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  socialProviders,
  database: mongodbAdapter(mongoDb, {
    client: mongoClient,
  }),
});