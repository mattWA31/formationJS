const express = require('express');

const app = express();
const port = 3000;

// Défini le dossier public comme la racine du site
app.use(express.static('public'));

// Autoriser les acces front aux dossier de node
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// Redirection sur le fichier index.html
app.use(function(req, res) { return res.sendFile(`${__dirname}/public/index.html`); });

// Ecouter les requetes HTTP sur le port 3000
app.listen(port, function() {
    console.log('listening on %d', port);
});




