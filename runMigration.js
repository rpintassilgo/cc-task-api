const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const dotenv = require('dotenv');

dotenv.config();

async function runMigration() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  try {
    const migration = await fs.readFile('./migration.sql', 'utf-8');
    await connection.query(migration);
    console.log('Migration ran successfully.');
  } catch (error) {
    console.error('Error running migration:', error);
  } finally {
    await connection.end();
  }
}

runMigration();
