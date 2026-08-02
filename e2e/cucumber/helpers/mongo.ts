import { MongoClient, ObjectId } from "mongodb";

export const MONGO_URL =
  "mongodb://admin:admin@127.0.0.1:27017/odds_worklog_db?authSource=admin";

export const E2E_SITE_PREFIX = "E2E ";

async function withDb<T>(fn: (db: ReturnType<MongoClient["db"]>) => Promise<T>): Promise<T> {
  const client = new MongoClient(MONGO_URL);
  try {
    await client.connect();
    return await fn(client.db("odds_worklog_db"));
  } finally {
    await client.close();
  }
}

export async function setUserAsUserAdmin(userId: string) {
  await withDb(async (db) => {
    await db.collection("user").updateOne(
      { _id: new ObjectId(userId) },
      { $set: { role: "user-admin", firstName: "E2E", lastName: "UserAdmin" } }
    );
  });
}

export async function deleteUser(userId: string) {
  await withDb(async (db) => {
    await db.collection("user").deleteOne({ _id: new ObjectId(userId) });
  });
}

export async function deleteUsersByEmailPrefix(prefix: string) {
  await withDb(async (db) => {
    await db.collection("user").deleteMany({ email: { $regex: `^${prefix}` } });
  });
}

export async function insertSite(name: string): Promise<string> {
  return withDb(async (db) => {
    const id = new ObjectId();
    await db.collection("site").insertOne({ _id: id, name });
    return id.toHexString();
  });
}

export async function findSiteIdByName(name: string): Promise<string | null> {
  return withDb(async (db) => {
    const site = await db.collection("site").findOne({ name });
    return site ? (site._id as ObjectId).toHexString() : null;
  });
}

export async function deleteSitesByNamePrefix(prefix: string) {
  await withDb(async (db) => {
    await db.collection("site").deleteMany({ name: { $regex: `^${prefix}` } });
  });
}

export async function insertTargetUser(opts: {
  firstName: string;
  lastName: string;
  email: string;
  siteId?: string;
}): Promise<string> {
  return withDb(async (db) => {
    const id = new ObjectId();
    const now = new Date();
    await db.collection("user").insertOne({
      _id: id,
      firstName: opts.firstName,
      lastName: opts.lastName,
      email: opts.email,
      role: "individual",
      vat: "N",
      bankAccountName: "E2E Bank",
      bankAccountNumber: "1234567890",
      thaiCitizenId: "1234567890123",
      siteId: opts.siteId || "",
      statusTavi: true,
      address: "E2E address",
      phone: "0812345678",
      startDate: "2022-01-01",
      create: now,
      lastUpdate: now,
    });
    return id.toHexString();
  });
}

export function splitDisplayName(displayName: string): { firstName: string; lastName: string } {
  const parts = displayName.trim().split(/\s+/);
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: "User" };
  }
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}
