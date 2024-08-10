const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    overdraftAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OverdraftAccount',
        required: true,
    },
    transactionType: {
        type: String,
        enum: ['deposit', 'withdrawal', 'overdraft_fee'],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
