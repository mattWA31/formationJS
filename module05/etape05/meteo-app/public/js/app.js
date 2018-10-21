window.addEventListener('load', function(){
    const el = $('#app');
    
    // Compiler les templates
    const temperatureTemplate = Handlebars.compile($('#temperature-template').html());
    
    // Déclaration router
    const router = new Router({
        mode: 'history',
    });
    
    // Que doit on faire lorsque on a la route racine ?
    router.add('/', function (){
        let html = temperatureTemplate();
        el.html(html);
		let ville = $('#ville').text();
        try {
			afficherMeteo(ville);		
        } catch (error) {
            showError(error);
        }		
    });
    
    
	const afficherMeteo = function(ville){
		// Appel a l'api Meteo
		$.ajax({
			url: 'http://localhost:3000/api/meteo',
			type: 'POST',
			data: {
				ville: ville,
			},
			success: function(resultat){
				// Traitement des résultats
				const nomVille = resultat.name;
				const valeurTemperature = resultat.main.temp;
				const conditions = resultat.weather[0].main;
				const description = resultat.weather[0].description;
				
				// Définition des styles css
				const cssMeteo = {
					"Rain": "wi wi-day-rain",
					"Clouds": "wi wi-day-cloudy",
					"Clear": "wi wi-day-sunny",
					"Snow": "wi wi-day-snow",
					"mist": "wi wi-day-fog",
					"Drizzle": "wi wi-day-sleet",
				};
				
				// Définition de l'icone meteo
				const iconMeteo = cssMeteo[conditions];
				
				// Changement de la classe du body
				$('body').removeClass();
				$('body').addClass(conditions.toLowerCase());
				
				// rendu du template
				html = temperatureTemplate({ iconMeteo, nomVille, valeurTemperature, description });
				el.html(html);
				
				// Gestion de la modification de la ville
				const villeElement = $('#ville');
				
				villeElement.on('keydown', function(event){
					if(event.keyCode === 13) {
						event.preventDefault();
						afficherMeteo(villeElement.text());
					}
				});
			},
			error: function(error){
				showError(error);
				// Retirer le chargement
				$('.loading').removeClass('loading');
			}
		});
	}  
    
    // Naviguer sur l'url courante
    router.navigateTo(window.location.pathname);
    
});