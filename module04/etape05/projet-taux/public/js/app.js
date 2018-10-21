window.addEventListener('load', function(){
	const el = $('#app');

	// Compile Handlebar Templates
	const errorTemplate = Handlebars.compile($('#error-template').html());
	const coursTemplate = Handlebars.compile($('#cours-template').html());
	const conversionTemplate = Handlebars.compile($('#conversion-template').html());
	const historiqueTemplate = Handlebars.compile($('#historique-template').html());

	// Declaration du Router 
	const router = new Router({
		mode: 'history',
		page404: function(chemin) {
			const html = errorTemplate({
				color: 'yellow',
				title: 'Erreur 404 - Page NON Trouvée !',
				message: `Le chemin '/${chemin}' n'existe pas sur le site`,
			});
			el.html(html);
		},
	});

	// Affichage de la bannière d'erreur
	// Son travail consiste simplement à afficher une bannière d'erreur 
	// au cas où quelque chose tournerait mal du côté du serveur.
	const showError = function(error) {
		const { title, message } = error.response.data;
		const html = errorTemplate({ title, message });
		el.html(html);
	};

	// Afficher les taux de change les plus récents
	router.add('/', function(){
		// Afficher d'abord le loading
		let html = coursTemplate();
		el.html(html);
		// Charger les taux de change
		$.ajax({
			url: 'http://localhost:3000/api/cours',
			success: function(result){
				const base = result.base;
				const date = result.date;
				const cours = result.rates;
				// Afficher le tableau des cours
				html = coursTemplate({ base, date, cours });
				el.html(html);
				// Retirer le chargement
				$('.loading').removeClass('loading');
			},
			error: function(error){
				showError(error);
				// Retirer le chargement
				$('.loading').removeClass('loading');
			}
		});
	});

	router.add('/conversion', function(){
		let html = conversionTemplate();
		el.html(html);
	});

	router.add('/historique', function(){
		let html = historiqueTemplate();
		el.html(html);
	});

	// Naviguer dans l'application jusqu'à l'url courante
	router.navigateTo(window.location.pathname);

	 // Mettre en surbrillance le menu actif lors du rafraîchissement/rechargement de la page
	const link = $(`a[href$='${window.location.pathname}']`);
	link.addClass('active');

	$('a').on('click', function(event){
		// Bloquer le chargement des pages du navigateur
		event.preventDefault();

		// Mettre en surbrillance le menu actif au moment du clic
		const target = $(event.target);
		$('.item').removeClass('active');
		target.addClass('active');

		// Naviguer vers l'url cliquée
		const href = target.attr('href');
		const chemin = href.substr(href.lastIndexOf('/'));
		router.navigateTo(chemin);
	});
});