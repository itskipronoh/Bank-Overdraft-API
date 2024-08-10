const express = require('express');
const connectDB = require('./config/db');
const overdraftAccounts = require('./routes/overdraftAccounts');
const dotenv = require('dotenv');
dotenv.config();
const userRoutes = require('./routes/UserRoutes');
const transactionRoutes = require('./routes/TransactionRoutes');



connectDB();



const app = express();

connectDB();

app.use(express.json());

app.use('/api/overdraftAccounts', overdraftAccounts);
app.use('/api/userRoutes', userRoutes);
app.use('/api/transactionRoutes', transactionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
