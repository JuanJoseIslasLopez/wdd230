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

