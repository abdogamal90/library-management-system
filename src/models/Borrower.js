// Schema
// borrowers
// - id (integer, primary key)
// - name (string, not null)
// - registered_date (date, default current date)

const pool = require('../config/db');

const getAllBorrowersService = async () => {
    const result = await pool.query('SELECT * FROM borrowers');
    return result.rows;
};

const createBorrowerService = async (borrowerData) => {
  const { name } = borrowerData;

  if (!name) {
    throw new Error('Name is a required field');
  }

  const result = await pool.query(
    'INSERT INTO borrowers (name) VALUES ($1) RETURNING *',
    [name]
  );
  return result.rows[0];
};

const getBorrowerByIdService = async (id) => {
  const result = await pool.query('SELECT * FROM borrowers WHERE id = $1', [id]);
  return result.rows[0];
};

const updateBorrowerService = async (id, borrowerData) => {
  const { name } = borrowerData;
  if (!name) {
    throw new Error('Name is a required field');
  }

  const result = await pool.query(
    'UPDATE borrowers SET name = $1 WHERE id = $2 RETURNING *',
    [name, id]
  );
  return result.rows[0];
};

const deleteBorrowerService = async (id) => {
  const result = await pool.query('DELETE FROM borrowers WHERE id = $1', [id]);
  return result.rowCount > 0;
};


const searchBorrowersService = async (searchParams) => {
  const { name } = searchParams;
  let query = 'SELECT * FROM borrowers WHERE';
  const params = [];
  let conditions = [];

  if (name) {
    conditions.push('name ILIKE $1');
    params.push(`%${name}%`);
  }

  if (conditions.length === 0) {
    reject(new Error('At least one search parameter is required'));
    return;
  }

  query += ' ' + conditions.join(' AND ');

  await pool.query(query, params, (error, results) => {
    if (error) {
      reject(error);
    } else {
      resolve(results.rows);
    }
  });
};

module.exports = {
  getAllBorrowersService,
  createBorrowerService,
  getBorrowerByIdService,
  updateBorrowerService,
  searchBorrowersService,
  deleteBorrowerService
};