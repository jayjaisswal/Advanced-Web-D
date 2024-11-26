document.addEventListener('DOMContentLoaded', function () {
    const waitingList = getWaitingList(); // Function to get waiting list from local storage
    const waitingListElement = document.getElementById('waitingList');

    if (waitingList.length === 0) {
        waitingListElement.innerHTML = '<li>No users in the waiting list.</li>';
    } else {
        waitingList.forEach(regId => {
            const userLi = document.createElement('li');
            userLi.innerText = `Registration ID: ${regId}`;
            waitingListElement.appendChild(userLi);
        });
    }

    document.getElementById('backBtn').addEventListener('click', function () {
        window.location.href = 'index.html'; // Redirect back to the home page
    });
});

// Function to retrieve waiting list from localStorage
function getWaitingList() {
    return JSON.parse(localStorage.getItem('waitingList')) || [];
}

// Function to save waiting list to localStorage
function saveWaitingList(list) {
    localStorage.setItem('waitingList', JSON.stringify(list));
}
