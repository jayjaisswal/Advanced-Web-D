document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    const regId = document.getElementById('regId').value;
    const name = document.getElementById('name').value;

    const users = getUsers(); // Get existing users

    if (!users.some(user => user.regId === regId)) {
        users.push({ regId: regId, name: name });
        saveUsers(users); // Save updated users list
        alert('Registration successful! You can now log in.');
        window.location.href = 'login.html'; // Redirect to login page
    } else {
        alert('Registration ID already exists! Please use a different ID.');
    }
});

document.getElementById('backBtn').addEventListener('click', function () {
    window.location.href = 'index.html'; // Redirect back to the home page
});

// Function to retrieve user data from localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Function to save user data to localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}
