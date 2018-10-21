// Fonction: créer un nouveau paragraphe et l'ajouter en bas du HTML
function creerParagraphe(){
	let paragraphe = document.createElement('p');
	paragraphe.textContent = 'Vous avez cliquer sur le bouton!';
	document.body.appendChild(paragraphe);
}

/*
  1. Regrouper les coordonnées de tous les boutons de la page et les organiser en tableau
  2. Faire une boucle dans ce tableau et ajouter un "click event listener" à chaque bouton:
		Quand un bouton est cliqué, la fonction "createParagraph()" sera exécutée
*/
let buttons = document.querySelectorAll('button');

for(let i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener('click', creerParagraphe);
}