document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    const loginRegId = document.getElementById('loginRegId').value;
    const users = getUsers(); // Get existing users

    if (users.some(user => user.regId === loginRegId)) {
        localStorage.setItem('loggedInUser', loginRegId); // Save logged in user
        alert('Login successful! Redirecting to seat booking...');
        window.location.href = 'seat-booking.html'; // Redirect to seat booking page
    } else {
        alert('Invalid Registration ID! Please try again.');
    }
});

document.getElementById('backBtn').addEventListener('click', function () {
    window.location.href = 'index.html'; // Redirect back to the home page
});

// Function to retrieve user data from localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}
