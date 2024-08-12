const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

// Create a new payment
router.post('/', protect, paymentController.createPayment);

// Get all payments for a specific overdraft account
router.get('/account/:accountId', protect, paymentController.getPaymentsByAccount);

// Get a single payment by ID
router.get('/:id', protect, paymentController.getPaymentById);

// Delete a payment
router.delete('/:id', protect, paymentController.deletePayment);

module.exports = router;
