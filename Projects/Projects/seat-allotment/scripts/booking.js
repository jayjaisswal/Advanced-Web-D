// document.addEventListener('DOMContentLoaded', function () {
//     const loggedInUser = localStorage.getItem('loggedInUser'); 
//     if (!loggedInUser) {
//         showModal('You need to log in to book a seat!');
//         console.log(loggedInUser);
//         window.location.href = 'login.html';
//     }
//     else {
//         displayUserInfo(loggedInUser); // Display user info
//         const seats = getSeats();
//         const waitingList = getWaitingList();
//         displaySeats(seats, loggedInUser, waitingList);
//     }

//     document.getElementById('confirmBtn').addEventListener('click', function () {
//         const regId = localStorage.getItem('loggedInUser');
//         const seats = getSeats();
//         // const seatType = (regId % 2 === 0) ? 'even' : 'odd'; 
//         let booked = false;
//         const lastDigit = parseInt(regId.slice(-1));
//         if (lastDigit % 2 === 0) {
//             for (let i = 0; i < seats.length; i += 2) {
//                 if (seats[i] === null) {
//                     seats[i] = regId;
//                     booked = true;
//                     break;
//                 }
//             }
//         }
//         else 
//         { 
//             for (let i = 1; i < seats.length; i += 2) {
//                 if (seats[i] === null) {
//                     seats[i] = regId; // Book the seat
//                     booked = true;
//                     break;
//                 }
//             }
//         }
//         if (booked) {
//             showModal(`Seat booked successfully for Registration ID: ${regId}`);
//             saveSeats(seats);
//             displaySeats(seats, regId);
//         } else {
//             showModal('No available seats for your registration ID. You have been added to the waiting list.');
//             addToWaitingList(regId);
//         }
//     });

//     document.getElementById('backBtn').addEventListener('click', function () {
//         window.location.href = 'index.html'; // Redirect to home page
//     });

//     // Modal functionality
//     const modal = document.getElementById('modal');
//     const span = document.getElementsByClassName('close')[0];

//     span.onclick = function () {
//         modal.style.display = 'none';
//     }

//     window.onclick = function (event) {
//         if (event.target === modal) {
//             modal.style.display = 'none';
//         }
//     }
// });

// // Function to display user information
// function displayUserInfo(userId) {
//     const userInfoDiv = document.getElementById('user-info'); //
//     userInfoDiv.innerText = `Logged in as Registration ID: ${userId}`;
// }

// // Function to retrieve seat data from localStorage
// function getSeats() {
//     return JSON.parse(localStorage.getItem('seats')) || new Array(20).fill(null); // 20 seats
// }

// // Function to save seat data to localStorage
// function saveSeats(seats) {
//     localStorage.setItem('seats', JSON.stringify(seats));
// }

// // Function to display seats
// function displaySeats(seats, regId, waitingList) {
//     const seatsContainer = document.getElementById('seats');
//     seatsContainer.innerHTML = ''; // Clear previous seat display
//     seats.forEach((seat, index) => {
//         const seatElement = document.createElement('div');
//         seatElement.classList.add('seat');
//         seatElement.innerText = seat !== null ? seat : index + 1; // Show user ID or serial number
//         seatElement.classList.add(seat !== null ? 'booked' : 'available');

//         // Add event listener for booked seats to show cancel button
//         if (seat !== null) {
//             seatElement.addEventListener('click', function () {
//                 toggleCancelInput(seatElement, index, seat); // Toggle input and button visibility
//             });
//         }

//         seatsContainer.appendChild(seatElement);
//     });

//     // Reset waiting list if there are seats available
//     resetWaitingList(seats, waitingList);
// }

// // Function to toggle input field and cancel button
// function toggleCancelInput(seatElement, index, regId) {
//     // Check if input and button already exist
//     let existingInput = seatElement.querySelector('input');
//     let existingButton = seatElement.querySelector('.cancel-btn');

//     if (!existingInput) {
//         // Create input field for ID
//         existingInput = document.createElement('input');
//         existingInput.type = 'text';
//         existingInput.placeholder = 'Enter Registration ID';
//         existingInput.style.marginTop = '10px';
//         seatElement.appendChild(existingInput);
//     }

//     if (!existingButton) {
//         // Create cancel button
//         existingButton = document.createElement('button');
//         existingButton.classList.add('cancel-btn');
//         existingButton.innerText = 'Cancel Booking';
//         existingButton.style.marginTop = '10px'; // Add margin for spacing
//         seatElement.appendChild(existingButton);

//         // Cancel seat booking with ID check
//         existingButton.addEventListener('click', function () {
//             const inputIdValue = existingInput.value;
//             const seats = getSeats();

//             if (inputIdValue === seats[index]) { // Check if entered ID matches
//                 const userId = seats[index]; // Get booked user ID
//                 seats[index] = null; // Free the seat
//                 saveSeats(seats);
//                 showModal(`Booking cancelled for Registration ID: ${userId}`);
//                 displaySeats(seats); // Refresh seat display
//             } else {
//                 showModal('Invalid Registration ID. Booking not cancelled.');
//             }
//         });
//     }
// }

// // Function to add user to waiting list
// function addToWaitingList(regId) {
//     const waitingList = getWaitingList();
//     if (!waitingList.includes(regId)) {
//         waitingList.push(regId);
//         saveWaitingList(waitingList);
//     }
// }

// // Function to show modal with message
// function showModal(message) {
//     const modal = document.getElementById('modal');
//     const modalMessage = document.getElementById('modal-message');
//     modalMessage.innerText = message;
//     modal.style.display = 'block';
// }

// // Function to retrieve waiting list from localStorage
// function getWaitingList() {
//     return JSON.parse(localStorage.getItem('waitingList')) || [];
// }

// // Function to save waiting list to localStorage
// function saveWaitingList(waitingList) {
//     localStorage.setItem('waitingList', JSON.stringify(waitingList));
// }

// // Function to reset waiting list if seats become available
// function resetWaitingList(seats, waitingList) {
//     const freeSeatsCount = seats.filter(seat => seat === null).length;
//     if (freeSeatsCount > 0) {
//         waitingList.length = 0; // Clear the waiting list
//         saveWaitingList(waitingList);
//     }
// }



document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = localStorage.getItem('loggedInUser'); 
    if (!loggedInUser) {
        showModal('You need to log in to book a seat!');
        window.location.href = 'login.html';
        return;
    } else {
        displayUserInfo(loggedInUser); // Display user info
        const seats = getSeats();
        const waitingList = getWaitingList();
        displaySeats(seats, loggedInUser, waitingList);
    }

    document.getElementById('confirmBtn').addEventListener('click', function () {
        const regId = localStorage.getItem('loggedInUser');
        const seats = getSeats();
        let booked = false;
        const lastDigit = parseInt(regId.slice(-1));

        // Try to book a seat based on even or odd regId
        if (lastDigit % 2 === 0) {
            for (let i = 1; i < seats.length; i += 2) {
                if (seats[i] === null) {
                    seats[i] = regId; // Book the seat
                    booked = true;
                    break;
                }
            }  
        } else {
           
            
            for (let i = 0; i < seats.length; i += 2) {
                if (seats[i] === null) {
                    seats[i] = regId;
                    booked = true;
                    break;
                }
            }
        }

        if (booked) {
            showModal(`Seat booked successfully for Registration ID: ${regId}`);
            saveSeats(seats);
            displaySeats(seats, regId);
        } else {
            // If no seat available, add to waiting list
            showModal('No available seats for your registration ID. You have been added to the waiting list.');
            addToWaitingList(regId);
        }
    });

    document.getElementById('backBtn').addEventListener('click', function () {
        window.location.href = 'index.html'; // Redirect to home page
    });

    // Modal functionality
    const modal = document.getElementById('modal');
    const span = document.getElementsByClassName('close')[0];

    span.onclick = function () {
        modal.style.display = 'none';
    }

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
});

// Function to display user information
function displayUserInfo(userId) {
    const userInfoDiv = document.getElementById('user-info');
    userInfoDiv.innerText = `Logged in as Registration ID: ${userId}`;
}

// Function to retrieve seat data from localStorage
function getSeats() {
    return JSON.parse(localStorage.getItem('seats')) || new Array(20).fill(null); // 20 seats
}

// Function to save seat data to localStorage
function saveSeats(seats) {
    localStorage.setItem('seats', JSON.stringify(seats));
}

// Function to display seats
function displaySeats(seats, regId, waitingList) {
    const seatsContainer = document.getElementById('seats');
    seatsContainer.innerHTML = ''; // Clear previous seat display
    seats.forEach((seat, index) => {
        const seatElement = document.createElement('div');
        seatElement.classList.add('seat');
        seatElement.innerText = seat !== null ? seat : index + 1; // Show user ID or serial number
        seatElement.classList.add(seat !== null ? 'booked' : 'available');

        // Add event listener for booked seats to show cancel button
        if (seat !== null) {
            seatElement.addEventListener('click', function () {
                toggleCancelInput(seatElement, index, seat); // Toggle input and button visibility
            });
        }

        seatsContainer.appendChild(seatElement);
    });

    // Automatically assign seats to users in the waiting list
    assignSeatsToWaitingList(seats, waitingList);
}

// Function to assign seats to users in the waiting list when they become available
function assignSeatsToWaitingList(seats, waitingList) {
    let availableSeats = seats.filter(seat => seat === null).length;
    
    if (availableSeats > 0 && waitingList.length > 0) {
        for (let i = 0; i < seats.length; i++) {
            if (seats[i] === null && waitingList.length > 0) {
                seats[i] = waitingList.shift(); // Assign seat to first user in waiting list
            }
        }
        // Update seats and waiting list in localStorage
        saveSeats(seats);
        saveWaitingList(waitingList);
        showModal('Seats assigned to waiting list users');
        displaySeats(seats, null, waitingList); // Refresh seat display
    }
}

// Function to toggle input field and cancel button
function toggleCancelInput(seatElement, index, regId) {
    let existingInput = seatElement.querySelector('input');
    let existingButton = seatElement.querySelector('.cancel-btn');

    if (!existingInput) {
        existingInput = document.createElement('input');
        existingInput.type = 'text';
        existingInput.placeholder = 'Enter Registration ID';
        existingInput.style.marginTop = '10px';
        seatElement.appendChild(existingInput);
    }

    if (!existingButton) {
        existingButton = document.createElement('button');
        existingButton.classList.add('cancel-btn');
        existingButton.innerText = 'Cancel Booking';
        existingButton.style.marginTop = '10px';
        seatElement.appendChild(existingButton);

        existingButton.addEventListener('click', function () {
            const inputIdValue = existingInput.value;
            const seats = getSeats();

            if (inputIdValue === seats[index]) {
                const userId = seats[index];
                seats[index] = null;
                saveSeats(seats);
                showModal(`Booking cancelled for Registration ID: ${userId}`);
                displaySeats(seats); // Refresh seat display
            } else {
                showModal('Invalid Registration ID. Booking not cancelled.');
            }
        });
    }
}

// Function to add user to waiting list
function addToWaitingList(regId) {
    const waitingList = getWaitingList();
    if (!waitingList.includes(regId)) {
        waitingList.push(regId);
        saveWaitingList(waitingList);
    }
}

// Function to show modal with message
function showModal(message) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.innerText = message;
    modal.style.display = 'block';
}

// Function to retrieve waiting list from localStorage
function getWaitingList() {
    return JSON.parse(localStorage.getItem('waitingList')) || [];
}

// Function to save waiting list to localStorage
function saveWaitingList(waitingList) {
    localStorage.setItem('waitingList', JSON.stringify(waitingList));
}
