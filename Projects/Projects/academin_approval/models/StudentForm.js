// models/StudentForm.js
const mongoose = require('mongoose');

const studentFormSchema = new mongoose.Schema({
    rollNumber: { type: String, required: true },
    semester: { type: String, required: true },
    studentName: { type: String, required: true },
    studentEmail: { type: String, required: true },
    dealingHandRemark: { type: String, default: '' },
    deanRemark: { type: String, default: '' },
    drRemark: { type: String, default: '' },
    sectionInchargeRemark: { type: String, default: '' },
    status: { type: String, default: 'Pending' } // Pending, Approved, Rejected
});

const StudentForm = mongoose.model('StudentForm', studentFormSchema);
module.exports = StudentForm;
