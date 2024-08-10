const Transaction = require('../models/transaction');
const OverdraftAccount = require('../models/overdraftAccount');

// Create a new transaction
exports.createTransaction = async (req, res) => {
    const { overdraftAccount, transactionType, amount } = req.body;

    try {
        // Ensure the overdraft account exists
        const account = await OverdraftAccount.findById(overdraftAccount);

        if (!account) {
            return res.status(404).json({ message: 'Overdraft account not found' });
        }

        // Handle overdraft logic if necessary
        if (transactionType === 'withdrawal' && (account.currentBalance - amount < -account.overdraftLimit)) {
            return res.status(400).json({ message: 'Insufficient funds including overdraft limit' });
        }

        // Adjust account balance
        if (transactionType === 'deposit') {
            account.currentBalance += amount;
        } else if (transactionType === 'withdrawal' || transactionType === 'overdraft_fee') {
            account.currentBalance -= amount;
        }

        await account.save();

        // Create and save the transaction
        const transaction = new Transaction({
            overdraftAccount,
            transactionType,
            amount,
        });

        await transaction.save();

        res.status(201).json(transaction);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all transactions for a specific overdraft account
exports.getTransactionsByAccount = async (req, res) => {
    try {
        const transactions = await Transaction.find({ overdraftAccount: req.params.accountId });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single transaction by ID
exports.getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.json(transaction);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        await transaction.remove();
        res.json({ message: 'Transaction removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
