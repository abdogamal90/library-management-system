// migrate.js
const fs = require('fs');
const { Pool } = require('pg');

// Use your own connection config or ENV vars
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'lms_db',
  password: 'admin',
  port: 5432,
});

async function runMigrations() {
  try {
    const sql = fs.readFileSync('./sql/init.sql', 'utf8');
    await pool.query(sql);
    console.log('Migration completed successfully');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await pool.end();
  }
}

runMigrations();
