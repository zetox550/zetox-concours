function validateForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Simple validation for demonstration
    if (email === "" || password === "") {
        errorMessage.textContent = "Veuillez remplir tous les champs.";
        return false;
    }

    // You can add more complex validation here (e.g., regex for email format)

    // If all is good, allow the form to submit
    errorMessage.textContent = ""; // Clear error message
    return true;
}
