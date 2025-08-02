const { 
  getAllBooksService, 
  getBookByIdService,
  createBookService,
  updateBookService,
  deleteBookService,
  searchBooksService
} = require('../models/Book');

const getAllBooks = async (req, res) => {
  try {
    const books = await getAllBooksService();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Database query failed', details: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    if (isNaN(bookId)) {
      return res.status(400).json({ error: 'Invalid book ID' });
    }
    
    const book = await getBookByIdService(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Database query failed', details: error.message });
  }
};

const createBook = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Request body is required' });
    }
    
    const book = await createBookService(req.body);
    res.status(201).json(book);
  } catch (error) {
    if (error.message.includes('required fields')) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Database query failed', details: error.message });
    }
  }
};

const updateBook = async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    if (isNaN(bookId)) {
      return res.status(400).json({ error: 'Invalid book ID' });
    }
    
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Request body is required' });
    }
    
    const book = await updateBookService(bookId, req.body);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Database query failed', details: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    if (isNaN(bookId)) {
      return res.status(400).json({ error: 'Invalid book ID' });
    }

    const deleted = await deleteBookService(bookId);
    if (!deleted) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Database query failed', details: error.message });
  }
};

const searchBooks = async (req, res) => {
  try {
    const { title, author } = req.query;
    if (!title && !author) {
      return res.status(400).json({ error: 'At least one search parameter is required' });
    }
    
    const books = await searchBooksService({ title, author });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Database query failed', details: error.message });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  searchBooks
};