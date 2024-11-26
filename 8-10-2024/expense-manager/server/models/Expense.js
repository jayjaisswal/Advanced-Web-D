const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: Number,
    description: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expense', expenseSchema);
