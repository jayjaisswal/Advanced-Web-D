const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');

const app = express();

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'users', // Replace with your database username
    password: 'your_db_password', // Replace with your database password
    database: 'your_database_name' // Replace with your database name
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/verify', (req, res) => {
    const { name, age } = req.body;
    const qrData = `Name: ${name}, Age: ${age}`;
    res.render('verification', { qrData, name, age });
});

// Endpoint for database verification
app.post('/check', (req, res) => {
    const scannedData = req.body.scannedData;

    // Assuming scannedData is in the format "Name: John, Age: 30"
    const [namePart, agePart] = scannedData.split(', ');
    const name = namePart.split(': ')[1];
    const age = agePart.split(': ')[1];

    const query = 'SELECT * FROM users WHERE name = ? AND age = ?';
    
    db.query(query, [name, age], (error, results) => {
        if (error) {
            console.error('Database query failed:', error);
            return res.status(500).send('Server Error');
        }
        if (results.length > 0) {
            res.json({ verified: true, user: results[0] });
        } else {
            res.json({ verified: false });
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
