const pool = require('../config/db');

const createBorrowerTable = () => {
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
};


const getAllBooksService = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM books', (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const createBookService = (bookData) => {
  return new Promise((resolve, reject) => {
    const { title, author, isbn, available_quantity, shelf_location } = bookData;
    
    if (!title || !author || !isbn) {
      reject(new Error('Title, author, and ISBN are required fields'));
      return;
    }
    
    pool.query(
      'INSERT INTO books (title, author, isbn, available_quantity, shelf_location) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, author, isbn, available_quantity || 1, shelf_location || 'A1'],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows[0]);
        }
      }
    );
  });
};

const updateBookService = (id, bookData) => {
  return new Promise((resolve, reject) => {
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
  });
};

const deleteBookService = (id) => {
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM books WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rowCount > 0);
      }
    });
  });
};

const searchBooksService = (searchParams) => {
  return new Promise((resolve, reject) => {
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
    
    pool.query(query, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

module.exports = {
  getAllBooksService,
  createBookService,
  updateBookService,
  deleteBookService,
  searchBooksService
};
