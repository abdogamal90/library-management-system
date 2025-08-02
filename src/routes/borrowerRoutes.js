const express = require('express');
const router = express.Router();
const {
  getAllBorrowers,
  createBorrower,
  updateBorrower,
  deleteBorrower,
  searchBorrowers
} = require('../controllers/borrowerController');

router.get('/borrowers', getAllBorrowers);
router.post('/borrowers', createBorrower);
router.put('/borrowers/:id', updateBorrower);
router.delete('/borrowers/:id', deleteBorrower);
router.get('/borrowers/search', searchBorrowers);

module.exports = router;
