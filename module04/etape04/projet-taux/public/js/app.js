window.addEventListener('load', function() {
	const el = $('#app');

	// Compile Handlebar Templates
	const errorTemplate = Handlebars.compile($('#error-template').html());
	const coursTemplate = Handlebars.compile($('#cours-template').html());
	const conversionTemplate = Handlebars.compile($('#conversion-template').html());
	const historiqueTemplate = Handlebars.compile($('#historique-template').html());

	// Declaration du Router 
	const router = new Router({
		mode: 'history',
		page404: function(chemin){
			const html = errorTemplate({
				color: 'yellow',
				title: 'Error 404 - Page NOT Found!',
				message: `Le chemin '/${path}' n'existe pas sur le site`,
			});
			el.html(html);
		},
	});

	router.add('/', function(){
		let html = coursTemplate();
		el.html(html);
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