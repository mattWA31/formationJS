// charger le module HTTP
let http = require("http");

// Créer le server HTTP et ecouter le port 3000
http.createServer(function (request, response){
	
	// Définir les entêtes de la réponse
	// avec le statut HTTP et le type de contenu (Content-Type)
	response.writeHead(200, {'Content-Type': 'text/plain'});
	
	// envoyer la réponse avec son contenu
	response.end('Hello world');
	
}).listen(3000);

// Affiche l'url d'accès au serveur dans la console.
console.log('Le serveur est disponible à l\'adresse http://localhost:3000/');