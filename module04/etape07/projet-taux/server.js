const express = require('express');
const { chercherCours, chercherSymbols, chercherHistoriqueCours, } = require('./lib/fixer-service');
const { convertirDevise } = require('./lib/free-currency-service');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Définir le dossier public comme racine
app.use(express.static('public'));

// Autorise les clients a accéder aux fichier statiques
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());

// Express gestion erreur
const errorHandler = function(err, req, res){
  if (err.response) {
    // La demande a été faite et le serveur a répondu avec un code d'état qui tombe hors de la plage de 2xx
    res.status(403).send({ title: 'Le serveur a répondu par une erreur', message: err.message });
  } else if (err.request) {
    // La demande a été faite mais aucune réponse n'a été reçue
    res.status(503).send({ title: 'Impossible de communiquer avec le serveur', message: err.message });
  } else {
    // Quelque chose s'est produit lors de la configuration de la demande qui a déclenché une erreur
    res.status(500).send({ title: 'Une erreur inattendue s\'est produite', message: err.message });
  }
};

// Récupérer les taux de change les plus récents
app.get('/api/cours', function(req, res){
  
    chercherCours(function(data){
		if(data.success){
			res.setHeader('Content-Type', 'application/json');
			res.send(data);
		} else {
			errorHandler(data, req, res);
		}
	});
    
  
});

// Récupérer les symboles
app.get('/api/symbols', async function(req, res){
	
	try {
		chercherSymbols(function(data){
			res.setHeader('Content-Type', 'application/json');
			res.send(data);
		});
    
    } catch (error) {
		errorHandler(error, req, res);
    }
});

// Convertir Devise
app.post('/api/convertir', function(req, res){
	try {
		const { depuis, cible } = req.body;
		convertirDevise(depuis, cible, function(data){
			res.setHeader('Content-Type', 'application/json');
			res.send(data);
		});
	} catch (error) {
		errorHandler(error, req, res);
	}
});

// Récupérer les taux de change par date
app.post('/api/historique', function(req, res){
	try {
		const { date } = req.body;
		chercherHistoriqueCours(date, function(data){
			res.setHeader('Content-Type', 'application/json');
			res.send(data);
		});
    
	} catch (error) {
		errorHandler(error, req, res);
	}
});

// Rediriger tout le trafic vers index.html
app.use(function(req, res) { return res.sendFile(`${__dirname}/public/index.html`); });


// Ecouter sur le port 3000
app.listen(port, function() {
  console.log('Ecoute sur %d', port);
});