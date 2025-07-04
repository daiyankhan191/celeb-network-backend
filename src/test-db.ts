// src/test-db.ts
import 'dotenv/config';
import { Client } from 'pg';
console.log('DATABASE_URL:', process.env.DATABASE_URL); // Add this line

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});


client.connect()
  .then(() => console.log('✅ Connected to DB'))
  .catch(err => console.error('❌ DB Connection Error:', err));
