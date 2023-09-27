import { connectToDatabase } from './connection.js';
import { MONGO_COLLECTIONS } from './constants.js';

export class Store {
  static async setRecord(key, value) {
    const db = await connectToDatabase();
    const collection = await db.collection(MONGO_COLLECTIONS.STORE);
    const record = {
      key,
      data: value,
    };
    return collection.insertOne(record);
  }

  static async getRecord(key) {
    const db = await connectToDatabase();
    const collection = await db.collection(MONGO_COLLECTIONS.ORDERS);
    const filters = { key };
    const res = await collection.find(filters).toArray();
    Store.deleteRecordByKey(key);
    return res[0];
  }

  static async deleteRecordByKey(key) {
    const db = await connectToDatabase();
    const collection = await db.collection(MONGO_COLLECTIONS.ORDERS);
    const filter = { key };
    const res = await collection.deleteOne(filter);
    return res;
  }
}
