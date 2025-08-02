const { 
  getAllBorrowersService, 
  createBorrowerService,
  updateBorrowerService,
  deleteBorrowerService,
  searchBorrowersService
} = require('../models/Borrower');

const getAllBorrowers = async (req, res) => {
  try {
    const borrowers = await getAllBorrowersService();
    res.status(200).json(borrowers);
  } catch (error) {
    res.status(500).json({ error: 'Database query failed', details: error.message });
  }
};

const createBorrower = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Request body is required' });
    }

    const borrower = await createBorrowerService(req.body);
    res.status(201).json(borrower);
  } catch (error) {
    if (error.message.includes('required fields')) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Database query failed', details: error.message });
    }
  }
};

const updateBorrower = async (req, res) => {
  try {
    const borrowerId = parseInt(req.params.id);
    if (isNaN(borrowerId)) {
      return res.status(400).json({ error: 'Invalid borrower ID' });
    }
    
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Request body is required' });
    }

    const borrower = await updateBorrowerService(borrowerId, req.body);
    if (!borrower) {
      return res.status(404).json({ error: 'Borrower not found' });
    }
    
    res.status(200).json(borrower);
  } catch (error) {
    res.status(500).json({ error: 'Database query failed', details: error.message });
  }
};

const deleteBorrower = async (req, res) => {
  try {
    const borrowerId = parseInt(req.params.id);
    if (isNaN(borrowerId)) {
      return res.status(400).json({ error: 'Invalid borrower ID' });
    }

    const deleted = await deleteBorrowerService(borrowerId);
    if (!deleted) {
      return res.status(404).json({ error: 'Borrower not found' });
    }

    res.status(200).json({ message: 'Borrower deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Database query failed', details: error.message });
  }
};

const searchBorrowers = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ error: 'At least one search parameter is required' });
    }

    const borrowers = await searchBorrowersService({ name });
    res.status(200).json(borrowers);
  } catch (error) {
    res.status(500).json({ error: 'Database query failed', details: error.message });
  }
};

module.exports = {
  getAllBorrowers,
  createBorrower,
  updateBorrower,
  deleteBorrower,
  searchBorrowers
};