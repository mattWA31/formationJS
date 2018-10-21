// Le javascript vient ici
function creerParagraphe(){
	let paragraphe = document.createElement('p');
	paragraphe.textContent = 'Vous avez cliquer sur le bouton!';
	document.body.appendChild(paragraphe);
}

let buttons = document.querySelectorAll('button');

for(let i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener('click', creerParagraphe);
}