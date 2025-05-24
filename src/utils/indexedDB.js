import { openDB } from 'idb';

const DB_NAME = 'chatDB';
const STORE_NAME = 'chatHistory';

export const getDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    }
  });
};

export const addMessageToDB = async (message) => {
  const db = await getDB();
  await db.add(STORE_NAME, message);
};

export const getAllMessagesFromDB = async () => {
  const db = await getDB();
  return await db.getAll(STORE_NAME);
};

export const clearMessagesFromDB = async () => {
  const db = await getDB();
  await db.clear(STORE_NAME);
};

export const deleteMessageFromDB = async (timestamp) => {
  const db = await getDB();
  const all = await db.getAll(STORE_NAME);
  const target = all.find(msg => msg.timestamp === timestamp);
  if (target) {
    await db.delete(STORE_NAME, target.id);
  }
};