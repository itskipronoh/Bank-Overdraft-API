const Payment = require('../models/payment');
const OverdraftAccount = require('../models/overdraftAccount');

// Create a new payment
exports.createPayment = async (req, res) => {
    const { overdraftAccount, amount, paymentMethod, referenceNumber } = req.body;

    try {
        // Ensure the overdraft account exists
        const account = await OverdraftAccount.findById(overdraftAccount);

        if (!account) {
            return res.status(404).json({ message: 'Overdraft account not found' });
        }

        // Update the overdraft account balance
        account.currentBalance += amount;

        await account.save();

        // Create and save the payment
        const payment = new Payment({
            overdraftAccount,
            amount,
            paymentMethod,
            referenceNumber,
        });

        await payment.save();

        res.status(201).json(payment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all payments for a specific overdraft account
exports.getPaymentsByAccount = async (req, res) => {
    try {
        const payments = await Payment.find({ overdraftAccount: req.params.accountId });
        res.json(payments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single payment by ID
exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.json(payment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a payment
exports.deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        await payment.remove();
        res.json({ message: 'Payment removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
