const http = require('http');

const symbols = 'EUR,USD,GBP,AUD,BTC,KES,JPY,CNY';

const api = {
	baseURL: 'http://data.fixer.io/api',
	access_key: "<VOTRE_API_KEY>",
}

// Fonction de requête générique GET
const get = function(url, callback) {
	
	http.get(api.baseURL + url + '&access_key=' + api.access_key, function(resp){
		let data = '';
		
		resp.on('data', function(morceau) {
			data += morceau;
		});
		
		resp.on('end', function() => { 
			callback(JSON.parse(data));
		});
	})
	.on("error", function(err) {
		throw new Error(err);
	});
};

module.exports = {
  chercherCours: function(callback) { return get(`/latest&symbols=${symbols}&base=EUR`, callback) },
};