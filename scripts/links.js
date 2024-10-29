const baseURL = "https://juanjoseislaslopez.github.io/wdd230/";
const linksURL = "https://juanjoseislaslopez.github.io/wdd230/data/links.json";

async function getLinks() {
  console.log("Fetching JSON data from:", linksURL); // Log URL to check accuracy
  const response = await fetch(linksURL);
  console.log("Response Status:", response.status); // Log response status
  
  if (response.ok) {
      const data = await response.json();
      console.log("Fetched Data:", data); // Log data structure
      displayLinks(data.weeks);
  } else {
      console.error("Failed to fetch JSON:", response.statusText);
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

