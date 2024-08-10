const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/TransactionController');
const { protect } = require('../middleware/authMiddleware');


router.post('/', protect, transactionController.createTransaction);
router.get('/account/:accountId', protect, transactionController.getTransactionsByAccount);
router.get('/:id', protect, transactionController.getTransactionById);
router.delete('/:id', protect, transactionController.deleteTransaction);

module.exports = router;
