const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    userid: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String }  // Make password optional
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
