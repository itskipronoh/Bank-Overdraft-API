const mongoose = require('mongoose');

const OverdraftAccountSchema = new mongoose.Schema({
    accountNumber: {
        type: String,
        required: true,
        unique: true,
    },
    accountHolder: {
        type: String,
        required: true,
    },
    overdraftLimit: {
        type: Number,
        required: true,
    },
    currentBalance: {
        type: Number,
        required: true,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('OverdraftAccount', OverdraftAccountSchema);
