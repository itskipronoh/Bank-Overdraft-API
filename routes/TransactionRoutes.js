const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

// Create a new transaction
router.post('/', protect, transactionController.createTransaction);

// Get all transactions for a specific overdraft account
router.get('/account/:accountId', protect, transactionController.getTransactionsByAccount);

// Get a single transaction by ID
router.get('/:id', protect, transactionController.getTransactionById);

// Delete a transaction
router.delete('/:id', protect, transactionController.deleteTransaction);

module.exports = router;
