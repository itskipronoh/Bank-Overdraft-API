const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    overdraftAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OverdraftAccount',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentDate: {
        type: Date,
        default: Date.now,
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'bank_transfer', 'credit_card'],
        required: true,
    },
    referenceNumber: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Payment', PaymentSchema);
