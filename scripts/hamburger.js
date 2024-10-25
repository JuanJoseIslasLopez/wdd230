const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open'); 
});

const darkModeToggle = document.querySelector('#darkModeToggle');
const mainArea = document.querySelector('body'); 

darkModeToggle.addEventListener('click', () => {
    mainArea.classList.toggle('dark-mode'); 
});

let visitCount = localStorage.getItem('visitCount') || 0;
visitCount++;
localStorage.setItem('visitCount', visitCount);
document.getElementById('visit-counter').innerText = `Page Visits: ${visitCount}`;

