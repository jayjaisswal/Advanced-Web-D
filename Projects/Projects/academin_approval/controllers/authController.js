// controllers/authController.js
const User = require('../models/User');
const StudentForm = require('../models/StudentForm');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

exports.register = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, role });

        await newUser.save();
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error during registration');
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && await bcrypt.compare(password, user.password)) {
            req.session.user = user;
            // Assuming that the `rollNumber` is somehow available after login
            const rollNumber = req.session.rollNumber || req.query.rollNumber || req.body.rollNumber;
            // console.log(user.rollNumber);
            console.log("login ke pass se bol rhe hai",rollNumber);
            // Check the user's role and redirect accordingly
            switch (user.role) {
                case 'Dealing Hand':
                    res.redirect(`/dealing-hand?rollNumber=${rollNumber}`); // Append rollNumber in the query
                    break;
                case 'Dr. Academics':
                    res.redirect(`/dr-academic/${rollNumber}`);
                    break;
                case 'Section In-Charge':
                    res.redirect(`/section-incharge/${rollNumber}`);
                    break;
                case 'Dean Academic':
                    res.redirect(`/dean-academic/${rollNumber}`);
                    break;
                default:
                    res.redirect('/home'); // Default route if role doesn't match
                    break;
            }
        } else {
            req.flash('error', 'Invalid credentials');
            res.redirect('/login');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error during login');
    }
};

exports.submitDealingHand = async (req, res) => {
    const { rollNumber, semester, studentName, studentEmail, dealingHandRemark } = req.body;
    req.session.rollNumber = rollNumber;
    try {
        const newForm = new StudentForm({ rollNumber, semester, studentName, studentEmail, dealingHandRemark });
        await newForm.save();
        res.redirect(`/dean-academic/${rollNumber}`);// Redirect after submission
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error while submitting form');
    }
};

exports.submitDeanRemark = async (req, res) => {
    const { remark, rollno } = req.body; 
    req.session.rollNumber = rollno;
    console.log('Received roll number:', rollno); // Log roll number for debugging
    try {
        const singledata = await StudentForm.findOne({ rollNumber: rollno }); 
        if (!singledata) {
            return res.status(404).send('Form not found for the given roll number');
        }

        const formId = singledata._id;
        console.log('Found form data:', singledata); // Log the found form data

        const updatedForm = await StudentForm.findByIdAndUpdate(formId, { deanRemark: remark }, { new: true });
        
        if (!updatedForm) {
            return res.status(404).send('Form not found while updating');
        }
        res.redirect(`/dr-academic/${rollno}`);
    } catch (error) {
        console.error('Error while submitting Dean remark:', error);
        res.status(500).send('Server error while submitting Dean remark');
    }
};

exports.submitDrRemark = async (req, res) => {
    const { remark, rollno } = req.body; 
    req.session.rollNumber = rollno;
    console.log('Received roll number:', rollno);
    const singledata = await StudentForm.findOne({ rollNumber: rollno }); 
    console.log('Received roll form submitDrRemark number:', rollno);
    const formId=singledata._id;
    console.log('Received form auth con submitDrRemark fomid id is::',formId); 

    try {
        const updatedForm = await StudentForm.findByIdAndUpdate(formId, { drRemark: remark });
        if (!updatedForm) {
            return res.status(404).send('Form not found');
        }
        res.redirect(`/section-incharge/${rollno}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error while submitting Dr. remark');
    }
};

exports.submitSectionInchargeRemark = async (req, res) => {
    const { remark, rollno } = req.body; 
    req.session.rollNumber = rollno;
    console.log('Received  submitSectionInchargeRemark roll number:', rollno);
    const singledata = await StudentForm.findOne({ rollNumber: rollno }); 
    const formId=singledata._id;
    console.log('Received formId submitSectionInchargeRemark:', formId);
    console.log('Received form auth con submitSectionInchargeRemark:', rollno,singledata,formId); 
    try {
        const updatedForm = await StudentForm.findByIdAndUpdate(formId, { sectionInchargeRemark: remark }, { new: true });
        if (!updatedForm) 
        {
            return res.status(404).send('Form not found');
        }

        const { dealingHandRemark, deanRemark, drRemark, sectionInchargeRemark } = updatedForm;
        if (dealingHandRemark && deanRemark && drRemark && sectionInchargeRemark) {
            await StudentForm.findOneAndUpdate({rollNumber: rollno}, { status: 'Admission Confirmed' });
        }
        if(dealingHandRemark==='rejected')
        {
            await StudentForm.findOneAndUpdate({rollNumber: rollno}, { status: 'Admission Not Confirmed' });
        }
        if(deanRemark==='rejected')
        {
            await StudentForm.findOneAndUpdate({rollNumber: rollno}, { status: 'Admission Not Confirmed' });
        }
        if(drRemark==='rejected')
        {
            await StudentForm.findOneAndUpdate({rollNumber: rollno}, { status: 'Admission Not Confirmed' });
        }
        if(sectionInchargeRemark==='rejected')
        {
            await StudentForm.findOneAndUpdate({rollNumber: rollno}, { status: 'Admission Not Confirmed' });
        }
        console.log("file till yet before print");
        res.redirect(`/print/${formId}`); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error while submitting Section In-Charge remark');
    }
};

// Middleware to check role
exports.checkRole = (role) => {
    return (req, res, next) => {
        if (req.session.user && req.session.user.role === role) {
            return next();
        }
        res.redirect('/login/'); 
    };
};

exports.printDetails = async (req, res) => {
    try {
        const formId = req.params.id; // Get the form ID from the URL
        console.log("Form ID received for printing:", formId);
        const form = await StudentForm.findById(formId);
        
        if (!form) {
            return res.status(404).send('Form not found');
        }

        // Render the view with the form data
        res.render('print-details', { form });
    } catch (error) {
        console.error('Error while printing details:', error);
        res.status(500).send('Server error while printing details');
    }
};
