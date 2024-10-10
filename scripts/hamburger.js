const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open'); 
});

const darkModeToggle = document.querySelector('#darkModeToggle');
const mainArea = document.querySelector('main'); 

darkModeToggle.addEventListener('click', () => {
    mainArea.classList.toggle('dark-mode'); 
});