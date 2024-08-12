const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/PaymentController');
const { protect } = require('../middleware/authMiddleware');


router.post('/', protect, paymentController.createPayment);


router.get('/account/:accountId', protect, paymentController.getPaymentsByAccount);


router.get('/:id', protect, paymentController.getPaymentById);


router.delete('/:id', protect, paymentController.deletePayment);

module.exports = router;
