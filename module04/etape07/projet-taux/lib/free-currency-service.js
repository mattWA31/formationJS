const https = require('https');

const getConversion = function(url, callback) {
	
	https.get(url, function(resp){
		let data = '';
		
		resp.on('data', function(chunk) {
			data += chunk;
		});
		
		resp.on('end', function() { 
			let json = JSON.parse(data);
			const key = Object.keys(json)[0];
			console.log(key);
			console.log(json[key]);
			const { val } = json[key];
			callback({ cours: val });
		});
		
	})
	.on("error", function(err) {
		console.log('error');
		throw new Error(err);
	});
};

module.exports = {
  convertirDevise: function(depuis, cible, callback) { return getConversion(`https://free.currencyconverterapi.com/api/v5/convert?q=${depuis}_${cible}&compact=y`, callback); },
};