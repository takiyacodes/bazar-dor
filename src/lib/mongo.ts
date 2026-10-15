// import { MongoClient } from "mongodb";

// // one client per process, reused across hot reloads in dev and across warm
// // serverless invocations in production, so we never pile up connections
// const globalForMongo = globalThis as unknown as {
//   mongoClient?: MongoClient;
// };

// export const mongoClient =
//   globalForMongo.mongoClient ??
//   new MongoClient(process.env.MONGODB_URL as string, {
//     retryReads: true,
//     retryWrites: true,
//     serverSelectionTimeoutMS: 20000,
//     family: 4,
//   });

// if (process.env.NODE_ENV !== "production") {
//   globalForMongo.mongoClient = mongoClient;
// }

// export const mongoDb = mongoClient.db("bazar-dor");



import { MongoClient } from "mongodb";

const uri = "mongodb://bazar-dor:YA1UsvLSJux625OX@ac-w9kkfdq-shard-00-00.j3fpi2c.mongodb.net:27017,ac-w9kkfdq-shard-00-01.j3fpi2c.mongodb.net:27017,ac-w9kkfdq-shard-00-02.j3fpi2c.mongodb.net:27017/bazardor?ssl=true&replicaSet=atlas-l4yu5y-shard-0&authSource=admin&appName=Cluster0";

// one client per process, reused across hot reloads in dev and across warm
// serverless invocations in production, so we never pile up connections
const globalForMongo = globalThis as unknown as {
  mongoClient?: MongoClient;
};

export const mongoClient =
  globalForMongo.mongoClient ??
  new MongoClient(uri, {
    retryReads: true,
    retryWrites: true,
    serverSelectionTimeoutMS: 20000,
    family: 4,
  });

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = mongoClient;
}

export const mongoDb = mongoClient.db("bazar-dor");