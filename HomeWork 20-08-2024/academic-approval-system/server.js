const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Data storage (in-memory for simplicity)
let formData = {};

// Routes
app.get('/', (req, res) => {
    res.redirect('/dealing-hand');
});

app.get('/dealing-hand', (req, res) => {
    res.render('dealing-hand', { formData });
});

// app.get('/dealing-hand', (req, res) => {
//     res.render('dealing-hand', { formData: {} });
// });

app.post('/section-incharge', (req, res) => {
    formData = { ...formData, ...req.body };
    res.redirect('/section-incharge');
});

app.get('/section-incharge', (req, res) => {
    res.render('section-incharge', { formData });
});

app.post('/dr-academic', (req, res) => {
    formData = { ...formData, ...req.body };
    res.redirect('/dr-academic');
});

app.get('/dr-academic', (req, res) => {
    res.render('dr-academic', { formData });
});

app.post('/dean-academic', (req, res) => {
    formData = { ...formData, ...req.body };
    res.redirect('/dean-academic');
});

app.get('/dean-academic', (req, res) => {
    res.render('dean-academic', { formData });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

//////////////////////////////////////////////////////////////////

// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// const mysql = require('mysql2');

// const app = express();
// const port = 3000;

// // MySQL database connection
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root', // Your MySQL username
//     password: 'jay123@A', // Your MySQL password
//     database: 'academic_approval'
// });

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));
// app.set('view engine', 'ejs');

// // Routes
// app.get('/', (req, res) => {
//     res.redirect('/dealing-hand');
// });


// app.get('/dealing-hand', (req, res) => {
//     res.render('dealing-hand', { formData: {} });
// });

// app.post('/section-incharge', (req, res) => {
//     const { rollNumber, internalNumber, semester, studentName, studentEmail, remark } = req.body;
//     console.log('Received data for section-incharge:', req.body);
//     pool.query(
//         `INSERT INTO approvals (roll_number, internal_number, semester, student_name, student_email, dealing_hand_remark)
//         VALUES (?, ?, ?, ?, ?, ?)`,
//         [rollNumber, internalNumber, semester, studentName, studentEmail, remark],
//         (err, results) => {
//             if (err) {
//                 console.error('Error inserting data:', err);
//                 return;
//             }
//             console.log('Data inserted:', results);
//             res.redirect('/section-incharge');
//         }
//     );
// });

// app.get('/section-incharge', (req, res) => {
//     pool.query('SELECT * FROM approvals ORDER BY id DESC LIMIT 1', (err, results) => {
//         if (err) {
//             console.error('Error retrieving data:', err);
//             return;
//         }
//         console.log('Data retrieved for section-incharge:', results);
//         res.render('section-incharge', { formData: results[0] || {} });
//     });
// });

// app.post('/dr-academic', (req, res) => {
//     const { id, remark, recommendation } = req.body;
//     pool.query(
//         `UPDATE approvals SET section_incharge_recommendation = ? WHERE id = ?`,
//         [recommendation, id],
//         (err, results) => {
//             if (err) throw err;
//             res.redirect('/dr-academic');
//         }
//     );
// });

// app.get('/dr-academic', (req, res) => {
//     pool.query('SELECT * FROM approvals ORDER BY id DESC LIMIT 1', (err, results) => {
//         if (err) throw err;
//         res.render('dr-academic', { formData: results[0] || {} });
//     });
// });

// app.post('/dean-academic', (req, res) => {
//     const { id, verification } = req.body;
//     pool.query(
//         `UPDATE approvals SET dr_academic_verification = ? WHERE id = ?`,
//         [verification, id],
//         (err, results) => {
//             if (err) throw err;
//             res.redirect('/dean-academic');
//         }
//     );
// });

// app.get('/dean-academic', (req, res) => {
//     pool.query('SELECT * FROM approvals ORDER BY id DESC LIMIT 1', (err, results) => {
//         if (err) throw err;
//         res.render('dean-academic', { formData: results[0] || {} });
//     });
// });

// // Start server
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });
