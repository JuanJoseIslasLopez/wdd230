
const firstParagraph = document.getElementById('currentyear');
const secondParagraph = document.querySelector('footer p:nth-of-type(2)');

const currentYear = new Date().getFullYear();

firstParagraph.textContent = `© ${currentYear} `;

const lastModifiedDate = document.lastModified;

secondParagraph.textContent = `Document last modified: ${lastModifiedDate}`;