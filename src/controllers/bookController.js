const { 
  getAllBooksService, 
  createBookService
} = require('../models/Book');

const getAllBooks = async (req, res) => {
  try {
    await getAllBooksService(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


const createBook = async (req, res) => {
  try {
    await createBookService(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getAllBooks,
  createBook

};

