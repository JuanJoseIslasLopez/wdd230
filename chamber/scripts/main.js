document.getElementById('last-updated').textContent = document.lastModified;

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById('menu');
    const navLinks = document.querySelector('.nav-links');

    menuButton.addEventListener('click', function () {
        // Toggle the 'open' class for both button and navigation
        menuButton.classList.toggle('open');
        navLinks.classList.toggle('open');
    });
});

window.addEventListener('DOMContentLoaded', () => {
    const sidebarMessage = document.querySelector('#visit-message'); // Assuming you have a placeholder for the message
    const lastVisit = localStorage.getItem('lastVisit'); // Get the last visit time from localStorage
    const currentVisit = Date.now(); // Get the current time in milliseconds

    if (lastVisit === null) {
        // If there is no stored last visit, it's the user's first time visiting
        sidebarMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        // Calculate the time difference between the current visit and the last visit in milliseconds
        const timeDifference = currentVisit - lastVisit;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

        if (daysDifference < 1) {
            sidebarMessage.textContent = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            sidebarMessage.textContent = `You last visited 1 day ago.`;
        } else {
            sidebarMessage.textContent = `You last visited ${daysDifference} days ago.`;
        }
    }

    // Update localStorage with the current visit time
    localStorage.setItem('lastVisit', currentVisit);
});

document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll("img.lazy-image");

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('visible'); // Add the 'visible' class to trigger the fade-in
                observer.unobserve(img); // Stop observing this image
            }
        });
    });

    lazyImages.forEach(image => {
        imageObserver.observe(image); // Start observing each image
    });
});


// Function to display the last updated date
function displayLastUpdatedDate() {
    const lastUpdated = new Date(document.lastModified);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('last-updated').textContent = lastUpdated.toLocaleDateString(undefined, options);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    displayLastUpdatedDate();

    const registrationForm = document.querySelector('#registration-form form');
    if (registrationForm) {
        // No need for a custom submission handler, just allow the default form submission
        registrationForm.addEventListener('submit', () => {
            // This will allow the form to navigate to thankyou.html
        });
    }
});
