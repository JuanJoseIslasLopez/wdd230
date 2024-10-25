
document.addEventListener("DOMContentLoaded", function() {
    const kp1 = document.getElementById("password");
    const kp2 = document.getElementById("confirm-password");
    const message = document.getElementById("formmessage");

    kp2.addEventListener("focusout", checkSame);

    function checkSame() {
        if (kp1.value !== kp2.value) {
            message.textContent = "❗Key Phrases DO NOT MATCH!";
            message.style.display = "block"; // Change visibility to block
            kp2.style.backgroundColor = "#fff0f3"; // Highlight the field
            kp2.value = ""; // Clear the confirm password field
            kp2.focus(); // Focus back to the confirm password field
        } else {
            message.style.display = "none"; // Hide the message
            kp2.style.backgroundColor = "#fff"; // Reset the background
        }
    }
});

