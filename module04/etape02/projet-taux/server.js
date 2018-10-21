const express = require('express');

const app = express();
const port = 3000;

// Définir le dossier public comme racine
app.use(express.static('public'));

// Autorise les clients a accéder aux fichier statiques
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// Ecouter sur le port 3000
app.listen(port, function() {
  console.log('Ecoute sur %d', port);
});