// Schema
// books
// - id (integer, primary key)
// - title (string, not null)
// - author (string, not null)
// - isbn (string, not null, unique)
// - available_quantity (integer, default 1)
// - shelf_location (string, default 'A1')

const pool = require('../config/db');


const getAllBooksService = async () => {
  const result = await pool.query('SELECT * FROM books');
  return result.rows;
};

const createBookService = async (bookData) => {
  const { title, author, isbn, available_quantity, shelf_location } = bookData;

  if (!title || !author || !isbn) {
    throw new Error('Title, author, and ISBN are required fields');
  }

  const result = await pool.query(
    'INSERT INTO books (title, author, isbn, available_quantity, shelf_location) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [title, author, isbn, available_quantity || 1, shelf_location || 'A1']
  );
  return result.rows[0];
};

const updateBookService = async (id, bookData) => {
  const { title, author, isbn, available_quantity, shelf_location } = bookData;

    pool.query(
      'UPDATE books SET title = $1, author = $2, isbn = $3, available_quantity = $4, shelf_location = $5 WHERE id = $6 RETURNING *',
      [title, author, isbn, available_quantity, shelf_location, id],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows[0]);
        }
      }
    );
    return result.rows[0];
};

const deleteBookService = async (id) => {
  const result = await pool.query('DELETE FROM books WHERE id = $1', [id]);
  return result.rowCount > 0;
};


const searchBooksService = async (searchParams) => {
    const { title, author } = searchParams;
    let query = 'SELECT * FROM books WHERE';
    const params = [];
    const conditions = [];
    if (title) {
      conditions.push(`title ILIKE $${params.length + 1}`);
      params.push(`%${title}%`);
    }
    
    if (author) {
      conditions.push(`author ILIKE $${params.length + 1}`);
      params.push(`%${author}%`);
    }
    
    query += ' ' + conditions.join(' AND ');

    const result = await pool.query(query, params);
    return result.rows;
};

module.exports = {
  getAllBooksService,
  createBookService,
  updateBookService,
  deleteBookService,
  searchBooksService
};
