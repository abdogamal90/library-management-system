CREATE TABLE IF NOT EXISTS borrowers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  registered_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  published_date DATE,
  isbn VARCHAR(20) UNIQUE,
  available_quantity INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS borrow_records (
  id SERIAL PRIMARY KEY,
  book_id INT REFERENCES books(id) ON DELETE CASCADE,
  borrower_id INT REFERENCES borrowers(id) ON DELETE CASCADE,
  borrow_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  due_date TIMESTAMP,
  return_date TIMESTAMP
);

ALTER TABLE borrowers
ADD COLUMN IF NOT EXISTS email VARCHAR(255) UNIQUE;
CREATE INDEX IF NOT EXISTS idx_borrowers_email ON borrowers(email);

-- for performance optimization
CREATE INDEX IF NOT EXISTS idx_books_title ON books(title);
CREATE INDEX IF NOT EXISTS idx_borrowers_email ON borrowers(email);

CREATE INDEX IF NOT EXISTS idx_borrow_records_book_id ON borrow_records(book_id);
CREATE INDEX IF NOT EXISTS idx_borrow_records_borrower_id ON borrow_records(borrower_id);
