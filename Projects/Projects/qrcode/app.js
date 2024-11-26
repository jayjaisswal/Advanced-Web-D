const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');
const Student = require('./models/Student'); // Ensure you have this model defined

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/studentQR')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

// Serve static files
app.use(express.static('public'));

// Set view engine to EJS
app.set('view engine', 'ejs');

// Home route (generate QR)
app.get('/', (req, res) => {
    res.render('index', { qrCodeData: null, msg: null });
});

// Route to handle QR code generation
app.post('/create', async (req, res) => {
    const { userid, name, email, password } = req.body; // Include password

    // Ensure password is provided
    if (!password) {
        return res.send('Password is required!');
    }

    // Save student info to the database
    const student = new Student({ userid, name, email, password });
    try {
        await student.save();

        // Generate QR code with the user's info
        const qrData = `UserID: ${userid}, Name: ${name}, Email: ${email}`;
        QRCode.toDataURL(qrData, (err, url) => {
            if (err) return res.send('Error generating QR Code');
            res.render('index', { qrCodeData: url, msg: 'QR Code Generated!' });
        });
    } catch (error) {
        res.send('Error saving student: ' + error.message);
    }
});

// Route to verify the QR code
app.post('/verify', async (req, res) => {
    const { scannedQrData } = req.body;
    // Extract UserID from QR Code data
    const matched = scannedQrData.match(/UserID: (\w+),/);
    if (matched && matched[1]) {
        const userid = matched[1];
        // Find the student in the database
        const student = await Student.findOne({ userid });
        if (student) {
            res.json({ success: true, message: 'QR Code Verified Successfully!' });
        } else {
            res.json({ success: false, message: 'QR Code Verification Failed!' });
        }
    } else {
        res.json({ success: false, message: 'Invalid QR Code!' });
    }
});

app.listen(4000, () => {
    console.log('Server running on port 4000');
});
