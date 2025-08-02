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

// const createBookTable = () => {
//   const query = `
//     CREATE TABLE IF NOT EXISTS books (
//       id SERIAL PRIMARY KEY,
//       title VARCHAR(255) NOT NULL,
//       author VARCHAR(255) NOT NULL,
//       published_date DATE,
//       isbn VARCHAR(20) UNIQUE
//     )
//   `;

//   pool.query(query)
//     .then(() => console.log('Books table created or already exists'))
//     .catch(err => console.error('Error creating books table', err.stack));
// };

createBorrowerTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS borrowers (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      registered_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  pool.query(query)
    .then(() => console.log('Borrowers table created or already exists'))
    .catch(err => console.error('Error creating borrowers table', err.stack));
}
module.exports = pool;
