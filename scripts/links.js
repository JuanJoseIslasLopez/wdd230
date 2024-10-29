const baseURL = "https://juanjoseislaslopez.github.io/wdd230/";
const linksURL = "https://juanjoseislaslopez.github.io/wdd230/data/links.json";

async function getLinks() {
    const response = await fetch(linksURL);
    const data = await response.json();
    displayLinks(data);
}

function displayLinks(weeks) {
    const linksList = document.getElementById('links-list');
    linksList.innerHTML = ''; // Clear existing content

    weeks.forEach(week => {
        const weekItem = document.createElement('li');
        weekItem.textContent = week.week + ': ';
        
        week.links.forEach(link => {
            const anchor = document.createElement('a');
            anchor.href = link.url;
            anchor.textContent = link.title;
            anchor.target = '_blank'; // Optional: Open in new tab
            weekItem.appendChild(anchor);
            weekItem.appendChild(document.createTextNode(' | ')); // Add separator
        });

        weekItem.removeChild(weekItem.lastChild); // Remove last separator
        linksList.appendChild(weekItem);
    });
}

getLinks();
