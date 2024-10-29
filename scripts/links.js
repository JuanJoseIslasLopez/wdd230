const baseURL = "https://juanjoseislaslopez.github.io/wdd230/";
const linksURL = "https://juanjoseislaslopez.github.io/wdd230/data/links.json";

async function getLinks() {
    console.log("Fetching JSON data from:", linksURL);
    try {
        const response = await fetch(linksURL);
        console.log("Response Status:", response.status); // Check response status
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Data:", data); // Log the data object

        // Check if weeks array is present and pass it to displayLinks
        if (data && data.weeks && Array.isArray(data.weeks)) {
            displayLinks(data.weeks);
        } else {
            console.error("Expected 'weeks' to be an array but got:", data.weeks);
        }
    } catch (error) {
        console.error("Error in getLinks:", error);
    }
}

function displayLinks(weeks) {
  const linksList = document.getElementById("links-list");
  
  weeks.forEach(week => {
      // Create a new list item for each week
      const weekItem = document.createElement("li");

      // Add the week title
      const weekTitle = document.createElement("strong");
      weekTitle.textContent = `${week.week}: `;
      weekItem.appendChild(weekTitle);

      // Append each link inline, separated by a comma
      week.links.forEach((link, index) => {
          const anchor = document.createElement("a");
          anchor.href = link.url;
          anchor.textContent = link.title;
          anchor.style.marginRight = "5px"; // Optional spacing between links
          weekItem.appendChild(anchor);

          // Add a comma between links except after the last one
          if (index < week.links.length - 1) {
              weekItem.appendChild(document.createTextNode("| "));
          }
      });

      // Append the formatted week item to the main list
      linksList.appendChild(weekItem);
  });
}


// Call the function to load links
getLinks();
