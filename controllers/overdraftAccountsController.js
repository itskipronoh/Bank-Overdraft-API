const OverdraftAccount = require('../models/overdraftAccount');

exports.createAccount = async (req, res) => {
    const { accountNumber, accountHolder, overdraftLimit, currentBalance } = req.body;
    try {
        let account = new OverdraftAccount({
            accountNumber,
            accountHolder,
            overdraftLimit,
            currentBalance,
        });
        await account.save();
        res.status(201).json(account);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAccounts = async (req, res) => {
    try {
        const accounts = await OverdraftAccount.find();
        res.status(200).json(accounts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAccount = async (req, res) => {
    try {
        const account = await OverdraftAccount.findById(req.params.id);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.status(200).json(account);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateAccount = async (req, res) => {
    try {
        const account = await OverdraftAccount.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.status(200).json(account);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const account = await OverdraftAccount.findByIdAndDelete(req.params.id);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.status(200).json({ message: 'Account deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
