async function loadMembers() {
    try {
        const response = await fetch('https://juanjoseislaslopez.github.io/wdd230/chamber/data/members.json'); // adjust path if needed
        const data = await response.json();
        renderMembers(data.members);
    } catch (error) {
        console.error("Error loading members:", error);
    }
}

// Render members in grid or list view
function renderMembers(members) {
    const container = document.getElementById('members-container');
    container.innerHTML = ''; // Clear existing content

    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('member-card');

        memberCard.innerHTML = `
            <img src="${member.image}" alt="Photo of ${member.name}">
            <h2>${member.name}</h2>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p><strong>Membership Level:</strong> ${member.membershipLevel}</p>
            <p>${member.otherInfo}</p>
        `;

        container.appendChild(memberCard);
    });
}

// Toggle between grid and list views
document.getElementById('toggleView').addEventListener('click', function() {
    const container = document.getElementById('members-container');
    container.classList.toggle('list-view');

    this.textContent = container.classList.contains('list-view') 
        ? 'Switch to Grid View' 
        : 'Switch to List View';
});

// Load members on page load
document.addEventListener('DOMContentLoaded', loadMembers);
