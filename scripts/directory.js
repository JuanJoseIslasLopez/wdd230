// Fetch members data
fetch("https://juanjoseislaslopez.github.io/wdd230/data/members.json")
  .then(response => response.json())
  .then(data => displayMembers(data.members));

function displayMembers(members) {
  const container = document.getElementById("member-container");
  container.innerHTML = ""; // Clear previous content

  members.forEach(member => {
    const memberCard = document.createElement("div");
    memberCard.className = "member-card";
    memberCard.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">${member.website}</a>
      <p>Membership Level: ${member.membershipLevel}</p>
      <p>${member.otherInfo}</p>
    `;
    container.appendChild(memberCard);
  });
}

// Toggle view
document.getElementById("toggle-view").addEventListener("click", () => {
  const container = document.getElementById("member-container");
  container.classList.toggle("grid-view");
  container.classList.toggle("list-view");
});
