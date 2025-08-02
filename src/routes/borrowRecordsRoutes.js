const express = require('express');
const router = express.Router();

const {
  borrowBookController,
  returnBookController,
  getBooksForBorrowerController,
  getDueBooksController
} = require('../controllers/borrowRecordsController');

router.post('/borrow', borrowBookController);
router.post('/return', returnBookController);
router.get('/borrowers/:id/books', getBooksForBorrowerController);
router.get('/due-books', getDueBooksController);

module.exports = router;