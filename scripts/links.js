const baseURL = "https://juanjoseislaslopez.github.io/wdd230/";
const linksURL = "https://juanjoseislaslopez.github.io/wdd230/data/links.json";

async function getLinks() {
    try {
        const response = await fetch(linksURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data); // Check what the response looks like
        displayLinks(data); // Pass the entire data object
    } catch (error) {
        console.error('Error fetching links:', error);
    }
}

function displayLinks(data) {
    // Access the weeks array from the data object
    const weeks = data.weeks; // Correctly access the weeks property

    console.log(weeks); // Check if this is indeed an array
    
    if (Array.isArray(weeks)) {
        weeks.forEach(week => {
            const weekElement = document.createElement('li');
            weekElement.textContent = week.week + ': ';
            week.links.forEach(link => {
                const linkElement = document.createElement('a');
                linkElement.href = link.url;
                linkElement.textContent = link.title;
                weekElement.appendChild(linkElement);
                weekElement.appendChild(document.createTextNode(' | ')); // Add separator
            });
            document.getElementById('linksList').appendChild(weekElement);
        });
    } else {
        console.error('Expected weeks to be an array:', weeks);
    }
}

// Call the function to get links when the page loads or as needed
getLinks();

