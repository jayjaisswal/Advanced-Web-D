const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

// Middleware to check if admin
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};

// Add Member
router.post('/add-member', authenticate, isAdmin, async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password, role: 'member' });
    await user.save();
    res.status(201).json({ message: 'Member added' });
});

// Delete Member
router.delete('/delete-member/:id', authenticate, isAdmin, async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Member deleted' });
});

module.exports = router;
