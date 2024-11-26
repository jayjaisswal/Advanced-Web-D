const express = require('express');
const router = express.Router();
const qrcode = require('qrcode');
const Student = require('../models/Student');

// Route to create student and generate QR code
router.post('/create', async (req, res) => {
    try {
        const { userid, password, name, email } = req.body;

        // Generate QR code using userid
        const qrCodeData = await qrcode.toDataURL(userid);

        // Save student data into database
        const student = new Student({ userid, password, name, email, qrCodeData });
        await student.save();

        res.render('index', { qrCodeData, msg: "QR Code Generated Successfully!", success: true });
    } catch (error) {
        res.status(500).send("Error generating QR Code");
    }
});

// Route to verify QR code by comparing decoded data
router.post('/verify', async (req, res) => {
    const { decodedQrData } = req.body;

    // Check if the decoded QR code matches any student userid
    const student = await Student.findOne({ userid: decodedQrData });

    if (student) {
        res.send("Success: QR code matched!");
    } else {
        res.status(400).send("Error: QR code did not match!");
    }
});

module.exports = router;
