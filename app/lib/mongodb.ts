// lib/mongodb.ts
import { MongoClient } from 'mongodb';
 
const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017');
const dbName = 'NextJS-Customers';  // Replace with your database name
 
export const connectToDB = async () => {
  try {
    console.log('Connecting to database...');  // Debugging log
    // The MongoClient.connect() method is asynchronous, we use await here.
    await client.connect();
    const db = client.db(dbName);
    console.log('Connected to database!');  // Success log
    return db;
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Could not connect to database');
  }
};
 
 