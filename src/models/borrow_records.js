// Schema
// borrow_records
// - id (integer, primary key)
// - borrower_id (integer, foreign key to borrowers)
// - book_id (integer, foreign key to books)
// - borrow_date (date)
// - due_date (date)
// - return_date (date, nullable)

const pool = require('../config/db');

const borrowBook = async (borrowerId, bookId) => {
  const borrowDate = new Date();
  const dueDate = new Date(borrowDate.getTime() + 7 * 24 * 60 * 60 * 1000);

  const checkBorrower = await pool.query('SELECT * FROM borrowers WHERE id = $1', [borrowerId]);
  if (checkBorrower.rows.length === 0) {
    throw new Error('Borrower not found');
  }
  const checkBook = await pool.query('SELECT * FROM books WHERE id = $1', [bookId]);
  if (checkBook.rows.length === 0) {
    throw new Error('Book not found');
  }

  const checkAvailability = await pool.query(
    'SELECT * FROM borrow_records WHERE book_id = $1 AND return_date IS NULL',
    [bookId]
  );
  if (checkAvailability.rows.length > 0) {
    throw new Error('Book is not available for borrowing');
  }

  const bookBorrowed = await pool.query(
    'SELECT * FROM borrow_records WHERE borrower_id = $1 AND book_id = $2 AND return_date IS NULL',
    [borrowerId, bookId]
  );
  if (bookBorrowed.rows.length > 0) {
    throw new Error('Book is already borrowed by this borrower');
  }
    
  const result = await pool.query(
    'INSERT INTO borrow_records (borrower_id, book_id, borrow_date, due_date) VALUES ($1, $2, $3, $4) RETURNING *',
    [borrowerId, bookId, borrowDate, dueDate]
  );
  return result.rows[0];
};

const returnBook = async (borrowerId, bookId) => {
  const result = await pool.query(
    'UPDATE borrow_records SET return_date = $1 WHERE borrower_id = $2 AND book_id = $3 RETURNING *',
    [new Date(), borrowerId, bookId]
  );
  return result.rows[0];
};

const getBooksForBorrower = async (borrowerId) => {
  const result = await pool.query(
    'SELECT books.* FROM books JOIN borrow_records ON books.id = borrow_records.book_id WHERE borrow_records.borrower_id = $1 AND borrow_records.return_date IS NULL',
    [borrowerId]
  );
  return result.rows;
};

const getDueBooks = async () => {
  const today = new Date();
  const result = await pool.query(
    'SELECT * FROM borrow_records WHERE due_date < $1 AND return_date IS NULL',
    [today]
  );
  return result.rows;
};

module.exports = {
  borrowBook,
  returnBook,
  getBooksForBorrower,
  getDueBooks
};
