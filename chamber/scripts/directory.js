const baseURL = "https://juanjoseislaslopez.github.io/wdd230/";
const membersURL = "https://juanjoseislaslopez.github.io/wdd230/chamber/data/members.json"; // Define membersURL

const membersContainer = document.getElementById('members-container');
const toggleViewButton = document.getElementById('toggleView');

// Function to fetch member data
async function fetchMembers() {
    try {
        const response = await fetch(membersURL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Error loading member data:", error);
        membersContainer.innerHTML = "<p>Error loading member data.</p>";
    }
}

// Call fetchMembers when the page loads
fetchMembers();

// Function to display members
function displayMembers(members) {
    // Your logic to display members goes here
}

// View toggle functionality
toggleViewButton.addEventListener('click', () => {
    // Logic to toggle between views
});
