const express = require('express');
const connectDB = require('./config/db');
const overdraftAccounts = require('./routes/overdraftAccounts');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/overdraftAccounts', overdraftAccounts);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
