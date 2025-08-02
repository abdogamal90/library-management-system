const pool = require('../config/db');

const getAllBooksService = (req, res) => {
  pool.query('SELECT * FROM books', (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.status(200).json(results.rows);
  });
};

const createBookService = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: 'Request body is required' });
  }
  
  const { title, author, isbn, available_quantity, shelf_location } = req.body;
  
  if (!title || !author || !isbn) {
    return res.status(400).json({ error: 'Title, author, and ISBN are required fields' });
  }
  
  pool.query(
    'INSERT INTO books (title, author, isbn, available_quantity, shelf_location) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [title, author, isbn, available_quantity || 1, shelf_location || 'A1'],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Database query failed' });
      }
      res.status(201).json(results.rows[0]);
    }
  );
};


module.exports = {
  getAllBooksService,
  createBookService

};
