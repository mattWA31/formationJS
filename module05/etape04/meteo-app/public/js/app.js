window.addEventListener('load', () => {
    const el = $('#app');
    
    // Compiler les templates
    const temperatureTemplate = Handlebars.compile($('#temperature-template').html());
    
    // Déclaration router
    const router = new Router({
        mode: 'history',
    });
    
    // Que doit on faire lorsque on a la route racine ?
    router.add('/', function(){
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
				console.log(resultat);
				
				// Traitement des résultats
			},
			error: function(error){
				console.log(error);
			}
		});
	}
    
    // Naviguer sur l'url courante
    router.navigateTo(window.location.pathname);
    
});