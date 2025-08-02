const {
  borrowBook,
  returnBook,
  getBooksForBorrower,
  getDueBooks
} = require('../models/borrow_records');

const borrowBookController = async (req, res) => {
  const { borrowerId, bookId } = req.body;

  if (!Number.isInteger(borrowerId) || !Number.isInteger(bookId)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  if (!borrowerId || !bookId) {
    return res.status(400).json({ error: 'Borrower ID and Book ID are required' });
  }

  if (isNaN(borrowerId) || isNaN(bookId)) {
    return res.status(400).json({ error: 'Borrower ID and Book ID must be integers' });
  }
  try {
    const result = await borrowBook(borrowerId, bookId);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const returnBookController = async (req, res) => {
  const { borrowerId, bookId } = req.body;
  try {
    const result = await returnBook(borrowerId, bookId);
    if (!result) {
      return res.status(404).json({ error: 'Borrow record not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
;
const getBooksForBorrowerController = async (req, res) => {
  const borrowerId = parseInt(req.params.id);
  if (isNaN(borrowerId)) {
    return res.status(400).json({ error: 'Invalid borrower ID' });
  }
  try {
    const books = await getBooksForBorrower(borrowerId);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDueBooksController = async (req, res) => {
  try {
    const dueBooks = await getDueBooks();
    res.status(200).json(dueBooks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  borrowBookController,
  returnBookController,
  getBooksForBorrowerController,
  getDueBooksController
};