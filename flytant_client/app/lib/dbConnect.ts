// lib/dbConnect.ts

import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/todo_db';

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable in .env.local');
}
async function dbConnect() {
  return mongoose.connect(MONGO_URI, { bufferCommands: false });
}

export default dbConnect;
