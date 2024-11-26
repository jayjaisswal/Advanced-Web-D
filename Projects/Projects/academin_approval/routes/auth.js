// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const studentforms = require('../models/StudentForm'); // Make sure this import exists

router.get('/', (req, res) => {
    res.render('index');
});
// Registration route
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', authController.register);

// Login route
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', authController.login);

// Dealing Hand Form submission
router.get('/dealing-hand',(req, res) => {
    res.render('dealing-hand');
});

router.post('/dealing-hand', authController.submitDealingHand);

// Dean Academic Form submission //,authController.checkRole('Dr. Academics')
router.get('/dean-academic/:id',authController.checkRole('Dean Academic'), async (req, res) => {
    const id=req.params.id;
    console.log("form auth.js se params id hai ye for dean academincs",id); // This logs the correct form data
    const form = await studentforms.findOne({ rollNumber: id }); 
    console.log("form auth.js se params id hai ye for dean academincs",form);
    res.render('dean-academic', { form: form }); // Passed as 'FormData'
});

router.post('/dean-academic', authController.submitDeanRemark);

// Dr. Academic Form submission //, 
router.get('/dr-academic/:id',authController.checkRole('Dr. Academics'), async(req, res) => {
    const roll = req.params.id;
    console.log("from auth.js roll no is :",roll);
    const form = await studentforms.findOne({rollNumber:roll});
    console.log("from auth.js dr-academic roll no is :",form);
    res.render('dr-academic',{ form:form });
}); 

router.post('/dr-academic', authController.submitDrRemark);

// Section In-Charge Form submission //
router.get('/section-incharge/:id', authController.checkRole('Section In-Charge'), async(req, res) => {
    const roll = req.params.id;
    console.log("form auth.js Section In-Charge Form submission roll is:".roll);
    const form = await studentforms.findOne({rollNumber:roll});
    console.log("form auth.js Section In-Charge Form submission roll is:",form);
    res.render('section-incharge',{ form:form });
});

router.post('/section-incharge', authController.submitSectionInchargeRemark);

// Print details
router.get('/print/:id', authController.printDetails);

module.exports = router;
