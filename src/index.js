require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');
const borrowerRoutes = require('./routes/borrowerRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/api', bookRoutes);
app.use('/api', borrowerRoutes);

// Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});