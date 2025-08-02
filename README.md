# 📚 Library Management System

A lightweight backend API for managing a library's books, borrowers, and borrowing activities using **Node.js**, **Express**, and **PostgreSQL**.

---

## 🚀 Features

- Manage books: Add, update, delete, list
- Manage borrowers: Register, update, delete, list
- Borrowing & returning system
- Overdue tracking
- Optimized for fast reads (search & listings)

---

## 🛠️ Tech Stack

- **Backend**: Node.js + Express  
- **Database**: PostgreSQL  
- **ORM**: Native `pg` queries  
- **Other Tools**: dotenv, nodemon, cors  

---

## ⚙️ Setup Instructions

### ✅ Prerequisites

- Node.js v18+
- PostgreSQL
- Git (optional)

### 📦 Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/abdogamal90/library-management-system.git
   cd library-management-system
2. Install dependencies:
npm install
3.Create your .env file in the project root:
DATABASE_URL=postgresql://your_user:your_password@localhost:5432/your_database
PORT=3000
4. Create your database manually (if not already created):
CREATE DATABASE your_database;
5. Run migrations to initialize tables:
npm run migrate
6. Start the server:
npm run dev

📘 API Endpoints
Base URL: http://localhost:3000

🔹 Borrowers
| Method | Endpoint                  | Description                   |
| ------ | ------------------------- | ----------------------------- |
| GET    | `/borrowers`              | List all borrowers            |
| POST   | `/borrowers`              | Register a new borrower       |
| PUT    | `/borrowers/:id`          | Update borrower details       |
| DELETE | `/borrowers/:id`          | Delete a borrower             |
| GET    | `/borrowers/:id/borrowed` | View books borrowed by a user |
🔹 Books
| Method | Endpoint     | Description         |
| ------ | ------------ | ------------------- |
| GET    | `/books`     | List all books      |
| GET    | `/books/:id` | Get book by ID      |
| POST   | `/books`     | Add a new book      |
| PUT    | `/books/:id` | Update book details |
| DELETE | `/books/:id` | Delete a book       |
🔹 Borrowing
| Method | Endpoint   | Description            |
| ------ | ---------- | ---------------------- |
| POST   | `/borrow`  | Borrow a book          |
| POST   | `/return`  | Return a borrowed book |
| GET    | `/overdue` | List overdue books     |

🧪 Example Request Payloads
Register a Borrower
POST /borrowers
{
  "name": "John Doe",
  "email": "john@example.com"
}

Add a Book

POST /books
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "published_date": "2008-08-11",
  "isbn": "9780132350884",
  "available_quantity": 3
}

Borrow a Book

POST /borrow
{
  "borrower_id": 1,
  "book_id": 2,
  "due_date": "2025-08-10"
}

💡 Performance Consideration
The system is optimized for read-heavy operations, such as listing and searching for books or borrowers. Indexes on frequently queried columns (like book_id, borrower_id) are recommended to maintain performance as data grows.

🧑‍💻 Author
Abdelrahman Gamal
