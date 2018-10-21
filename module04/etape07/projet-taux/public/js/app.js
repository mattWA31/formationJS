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
		page404: function(chemin) {
			const html = errorTemplate({
				color: 'yellow',
				title: 'Error 404 - Page NOT Found!',
				message: `Le chemin '/${path}' n'existe pas sur le site`,
			});
			el.html(html);
		},
	});

	// Affichage de la bannière d'erreur
	// Son travail consiste simplement à afficher une bannière d'erreur 
	// au cas où quelque chose tournerait mal du côté du serveur.
	const showError = function(error) {
		const { title, message } = error.response.data;
		const html = errorTemplate({ color: 'red', title, message });
		el.html(html);
	};

	// Afficher les taux de change les plus récents
	router.add('/', function(){
		// Afficher d'abord le loading
		let html = coursTemplate();
		el.html(html);
		
		$.ajax({
			url: 'http://localhost:3000/api/cours',
			success: function(result){
				const base = result.base;
				const date = result.date;
				const cours = result.rates;
				// Afficher le tableau des cours
				html = coursTemplate({ base, date, cours });
				el.html(html);
				$('.loading').removeClass('loading');
			},
			error: function(error){
				showError(error);
				$('.loading').removeClass('loading');
			}
		});
	});

	// Exécute la requete en POST, calcule et affiche les résultats de conversion
	const recupererConversionResultats = function() {
		// Extraire les données du formulaire
		const depuis = $('#depuis').val();
		const cible = $('#cible').val();
		const montant = $('#quantite').val();
		// Envoyer les données post au serveur Express(proxy)
		
		$.ajax({
			url: 'http://localhost:3000/api/convertir',
			type: 'POST',
			data: {
				depuis: depuis,
				cible: cible
			},
			success: function(result){
				const { cours } = result;
				console.log(montant);
				const resultat = cours * montant;
				$('#resultat').html(`${cible} ${resultat}`);
				$('#result-segment').removeClass('loading');
			},
			error: function(error){
				showError(error);
				$('#result-segment').removeClass('loading');
			}
		});
	};

	// Gérer l'événement clic du bouton de conversion
	const convertirCoursManager = function(){
		if ($('.ui.form').form('is valid')) {
			// masquer le message d'erreur
			$('.ui.error.message').hide();
			// Post au serveur Express
			$('#result-segment').addClass('loading');
			recupererConversionResultats();
			// Empêcher la page d'être envoyée au serveur
			return false;
		}
		return true;
	};

	router.add('/conversion', function(){
		// Afficher d'abord le chargement
		let html = conversionTemplate();
		el.html(html);
		
		$.ajax({
			url: 'http://localhost:3000/api/symbols',
			success: function(result){
				const { symbols } = result;
				html = conversionTemplate({ symbols });
				el.html(html);
				$('.loading').removeClass('loading');
				// Valider les entrées de formulaire
				$('.ui.form').form({
					fields: {
					depuis: 'empty',
					cible: 'empty',
					montant: 'decimal',
					},
				});
				// Spécifie le gestionnaire du Submit
				$('.submit').click(convertirCoursManager);
			},
			error: function(error){
				showError(error);
			}
		});
	});

	const chercherHistoriqueCours = function(){
		const date = $('#date').val();
		
		$.ajax({
			url: 'http://localhost:3000/api/historique',
			type: "POST",
			data: {
				date: date
			},
			success: function(result){
				const base = result.base;
				const cours = result.rates;
				const html = coursTemplate({ base, date, cours });
				$('#historique-table').html(html);
				$('.segment').removeClass('loading');
			},
			error: function(error){
				showError(error);
				$('.segment').removeClass('loading');
			} 
		});
	};

	const historiqueCoursManager = function () {
		if ($('.ui.form').form('is valid')) {
			// cacher le message d'erreur
			$('.ui.error.message').hide();
			// affiche le chargement
			$('.segment').addClass('loading');
			chercherHistoriqueCours();
			// Empeche la page d'envoyer au serveur
			return false;
		}
		return true;
	};

	router.add('/historique', function() {
		// Afficher formulaire
		const html = historiqueTemplate();
		el.html(html);
		// Activer le date picker
		$('#calendar').calendar({
			type: 'date',
			formatter: { //format date to yyyy-mm-dd
				date: date => new Date(date).toISOString().split('T')[0],
			},
		});
		// Valider la date
		$('.ui.form').form({
			fields: {
				date: 'empty',
			},
		});
		$('.submit').click(historiqueCoursManager);
	});

	// Naviguer dans l'application jusqu'à l'url courante
	router.navigateTo(window.location.pathname);

	 // Mettre en surbrillance le menu actif lors du rafraîchissement/rechargement de la page
	const link = $(`a[href$='${window.location.pathname}']`);
	link.addClass('active');

	$('a').on('click', function(event) {
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