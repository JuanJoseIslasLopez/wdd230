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


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("timestamp").value = new Date().toISOString();
});
document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '79dbab3e43d026674e2f87b0efd7e711';
    const lat = -34.9011; // Latitude for Montevideo
    const lon = -56.1645; // Longitude for Montevideo

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    const currentTemp = document.querySelector('#current-temp');
    const weatherIcon = document.querySelector('#weather-icon');
    const captionDesc = document.querySelector('#weather-desc');

    // Fetch current weather
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            currentTemp.innerHTML = `${data.main.temp}°C`;
            const iconCode = data.weather[0].icon;
            const iconsrc = `https://openweathermap.org/img/w/${iconCode}.png`;
            const desc = data.weather[0].description;

            weatherIcon.setAttribute('src', iconsrc);
            weatherIcon.setAttribute('alt', desc);
            captionDesc.textContent = `${desc}`;
        })
        .catch(error => console.error('Error fetching current weather:', error));

    // Fetch 3-day forecast
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            const forecastContainer = document.querySelector('#forecast');
            forecastContainer.innerHTML = ''; // Clear any existing forecast data

            // Get the forecast for the next 3 days (assuming 8 intervals per day)
            for (let i = 0; i < 3; i++) {
                const day = data.list[i * 8]; // 8 intervals per day
                const temp = day.main.temp;
                const desc = day.weather[0].description;
                const iconCode = day.weather[0].icon;
                const iconsrc = `https://openweathermap.org/img/w/${iconCode}.png`;

                // Create a new Date object from the forecast timestamp
                const date = new Date(day.dt * 1000); // Convert seconds to milliseconds

                // Format the date as 'Day, Month Date'
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                const formattedDate = date.toLocaleDateString('en-US', options);

                const forecastElement = document.createElement('div');
                forecastElement.classList.add('forecast-day');
                forecastElement.innerHTML = `
                    <p>${formattedDate}: ${temp}°C - ${desc}</p>
                    <img src="${iconsrc}" alt="${desc}" />
                `;
                
                forecastContainer.appendChild(forecastElement);
            }
        })
        .catch(error => console.error('Error fetching forecast:', error));
});

document.addEventListener('DOMContentLoaded', () => {
    const membersUrl = 'https://juanjoseislaslopez.github.io/wdd230/chamber/data/members.json'; // Adjust the path to your JSON data
    const spotlightContainer = document.querySelector('#member-spotlights');

    // Function to load and display member spotlights
    function loadMemberSpotlights() {
        fetch(membersUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Check if data is an object and has a members array
                if (!data || !Array.isArray(data.members)) {
                    throw new TypeError('Expected members array in data');
                }

                // Filter members with silver or gold membership levels
                const qualifiedMembers = data.members.filter(member => 
                    member.membershipLevel.toLowerCase() === 'silver' || 
                    member.membershipLevel.toLowerCase() === 'gold'
                );

                // Randomly select 2 to 3 members
                const selectedMembers = getRandomMembers(qualifiedMembers, 2, 3);

                // Clear existing spotlights
                spotlightContainer.innerHTML = '';

                // Display selected members
                selectedMembers.forEach(member => {
                    const memberElement = document.createElement('div');
                    memberElement.classList.add('spotlight-member');
                    memberElement.innerHTML = `
                        <h4>${member.name}</h4>
                        <img src="${member.image}" alt="${member.name}" />
                        <p>Membership Level: ${member.membershipLevel}</p>
                        <p>${member.otherInfo}</p>
                        <p>Address: ${member.address}</p>
                        <p>Phone: ${member.phone}</p>
                        <p><a href="${member.website}" target="_blank">Visit Website</a></p>
                    `;
                    spotlightContainer.appendChild(memberElement);
                });
            })
            .catch(error => console.error('Error fetching member data:', error));
    }

    // Function to get random members from an array
    function getRandomMembers(members, min, max) {
        const numberOfMembers = Math.floor(Math.random() * (max - min + 1)) + min;
        const shuffled = members.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, numberOfMembers);
    }

    // Load member spotlights on page load
    loadMemberSpotlights();
});

document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('meet-greet-banner');
    const closeButton = document.getElementById('close-banner');

    // Function to check the day and display the banner if it's Monday, Tuesday, or Wednesday
    function checkBannerVisibility() {
        const today = new Date();
        const day = today.getDay(); // 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, etc.
        
        console.log("Today's day number:", day); // Log the day number for debugging

        // Show the banner if today is Monday (1), Tuesday (2), or Wednesday (3)
        if (day === 1 || day === 2 || day === 3) {
            banner.classList.remove('hidden');
        } else {
            banner.classList.add('hidden');
        }
    }

    // Close the banner when the close button is clicked
    closeButton.addEventListener('click', () => {
        console.log("Close button clicked"); // Log when the button is clicked
        banner.classList.add('hidden');
    });

    // Run the check on page load
    checkBannerVisibility();
});
