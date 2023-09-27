import { MongoClient } from 'mongodb';
import { MONGO_DB_NAME, MONGO_CLUSTER, MONGO_PASSWORD } from './constants.js';
const MONGODB_URI = `mongodb+srv://admin:${MONGO_PASSWORD}@${MONGO_CLUSTER}.hj8eztf.mongodb.net/?retryWrites=true&w=majority`;

let cachedDb = { db: null };

export async function connectToDatabase() {
  const temp = cachedDb;
  if (temp.db) {
    return temp.db;
  }
  const client = await MongoClient.connect(MONGODB_URI);
  const db = await client.db(MONGO_DB_NAME);
  temp.db = db;
  return db;
}
