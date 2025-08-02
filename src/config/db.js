const { Pool } = require('pg');
require('dotenv').config();

console.log('Connecting to PostgreSQL...');
console.log(`User: ${process.env.DATABASE_USER}`);
console.log(`Database: ${process.env.DATABASE_NAME}`);
const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: 'localhost',
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT
});

pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));


module.exports = pool;
