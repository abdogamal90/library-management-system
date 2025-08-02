const pool = require('../config/db');

const getAllBorrowersService = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM borrowers', (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const createBorrowerService = (borrowerData) => {
  return new Promise((resolve, reject) => {
    const { name } = borrowerData;

    if (!name) {
      reject(new Error('Name is a required field'));
      return;
    }

    pool.query(
      'INSERT INTO borrowers (name) VALUES ($1) RETURNING *',
      [name],
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
const getBorrowerByIdService = (id) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM borrowers WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows[0]);
      }
    });
  });
};
const updateBorrowerService = (id, borrowerData) => {
  return new Promise((resolve, reject) => {
    const { name } = borrowerData;
    if (!name) {
      reject(new Error('Name is a required field'));
      return;
    }
    pool.query(
      'UPDATE borrowers SET name = $1 WHERE id = $2 RETURNING *',
      [name, id],
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
const deleteBorrowerService = (id) => {
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM borrowers WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rowCount > 0);
      }
    });
  });
};

const searchBorrowersService = (searchParams) => {
  return new Promise((resolve, reject) => {
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

    pool.query(query, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
}
module.exports = {
  getAllBorrowersService,
  createBorrowerService,
  getBorrowerByIdService,
  updateBorrowerService,
  searchBorrowersService,
  deleteBorrowerService
};