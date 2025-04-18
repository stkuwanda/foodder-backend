import mongoose from 'mongoose';
import 'dotenv/config';

export async function connect() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log('Db connection established...');
}