const express = require('express');
const { getMeteo } = require('./lib/meteo-service');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Défini le dossier public comme la racine du site
app.use(express.static('public'));

// Autoriser les acces front aux dossier de node
app.use('/scripts', express.static(`${__dirname}/node_modules/`));


/* Etape 2: à décommenter */
// Parse les donnée POST en donnée encodé de l'url
app.use(bodyParser.urlencoded({
    extended: true,
}));

// Parser les donnée POST en JSON
app.use(bodyParser.json());

app.post('/api/meteo', function (req, res) {
	const ville = { ville: 'toulouse' };
	getMeteo(ville.ville, function(data){
			res.setHeader('Content-Type', 'application/json');
			res.send(data);
	});
});

app.use(function(req, res) { return res.sendFile(`${__dirname}/public/index.html`) });

// Ecouter les requetes HTTP sur le port 3000
app.listen(port, function() {
    console.log('listening on %d', port);
});



/* Etape 1, a commenter par la suite
const test = function(){
	getMeteo('Toulouse', function(data){
		console.log(data);
	});
}

test();
*/



