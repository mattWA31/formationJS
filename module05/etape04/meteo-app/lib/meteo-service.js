const http = require('http');

const city = 'Toulouse';

const api = {
    baseURL: 'http://api.openweathermap.org/data/2.5'
};

const getMeteoApi = function(url, callback) {
	
	http.get(api.baseURL + url, function(resp){
		let data = '';
		
		resp.on('data', function(chunk){
			data += chunk;
		});
		
		resp.on('end', function(){ 
			let json = JSON.parse(data);
			callback(json);
		});
		
	})
	.on("error", function(err){
		console.log('error');
		throw new Error(err);
	});
};

module.exports = {
    getMeteo: function(ville, callback) { return getMeteoApi(`/weather?q=${ville}&appid=<VOTRE_API_KEY>&lang=fr&units=metric`, callback); },
};