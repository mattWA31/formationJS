## Manipulations basiques du DOM  

Pour commencer l'apprentissage de la manipulation du DOM, commençons par la pratique.  

1. Faites une copie locale de la page dom-example.html et de l'image qui l'accompagne.  
2. Ajoutez un élément <script></script> juste avant la balise fermante </body>.  
3. Pour manipuler un élément dans le DOM, vous allez d'abord sélectionner cet élément et stocker une référence vers cet élément dans une variable. À l'intérieur de votre élément <script>, ajoutez la ligne suivante:  

    var link = document.querySelector('a');  

4. Maintenant que nous avons une référence vers l'élément, nous pouvous commencer à le manipuler en utilisant les propriétés et les méthodes disponibles dessus (celles-ci sont définies sur les interfaces telles que HTMLAnchorElement dans le cas d'un élément <a>, et sur les interfaces plus génériques HTMLElement, et Node — qui représente tout noeud dans le DOM). Tout d'abord, nous allons changer le texte du lien en mettant à jour la valeur de la propriété Node.textContent. Ajoutez la ligne suivante à la suite de la précédente:  

	link.textContent = 'Cliquer ici';  

5. Nous allons également changer l'URL où dirige le lien, pour qu'il ne dirige pas au mauvais endroit quand on clique dessus. Ajoutez la ligne suivante au bas de votre JavaScript:  

	link.href = 'https://google.fr';

Notez que, comme beaucoup de choses en JavaScript, il y a plusieurs façons de sélectionner et récupérer une référence vers un élément dans une variable. Document.querySelector() est l'approche moderne recommandée — elle est pratique puisqu'elle permet de sélectionner des éléments en utilisant les sélecteurs CSS. L'appel à querySelector() que nous avons utilisé plus tôt récupère le premier élément <a> qui apparaît dans le document. Si vous vouliez récupérer plusieurs éléments, vous auriez pu utiliser Document.querySelectorAll(), qui récupère tous les éléments du document qui correspondent au sélecteur, et retourne des références vers ces éléments dans un objet similaire à un tableau appelé un NodeList.  

Il existe des méthodes plus anciennes pour récupérer des références aux éléments, telles que:  

  - Document.getElementById(), qui sélectionne un élément avec un attribut id donné, par exemple <p id="myId">My paragraph</p>. L'ID est passé par paramètre, par exemple
  
		var elementRef = document.getElementById('myId').
		
  - Document.getElementsByTagName(), qui retourne un tableau contenant tous les éléments de la page ayant un type donné, par exemple tous les <p>, <a>, etc. Le type de l'élément est passé par paramètre, par exemple 
  
		var elementRefArray = document.getElementsByTagName('p').

		
Ces deux dernières méthodes fonctionnent même dans les anciens navigateurs, contrairement à querySelector(), mais sont beaucoup moins pratiques. Jetez un coup d'oeil aux docs et essayez d'en trouver d'autres!  


## Créer et placer de nouveaux noeuds

1. Ce qui précède vous a donné un petit avant-goût de ce que vous pouvez faire, mais allons plus loin et regardons comment créer de nouveaux éléments.  

    De retour à notre exemple, commençons par récupérer une référence vers notre élément <article> — ajoutez le code suivant au bas de votre script existant (faites de même avec les lignes qui suivront):

    var article = document.querySelector('article');

2. Nous allons créer un nouveau paragraphe avec Document.createElement() et lui donner un texte de la même manière que précédemment:

	var para = document.createElement('p');
	para.textContent = 'Ceci est un texte ajouté.';

3. Nous pouvons maintenant ajouter ce paragraphe en bas de la section en utilisant Node.appendChild():

	article.appendChild(para);

4. Finallement, ajoutons un noeud texte au premier paragraphe, pour finir la phrase joliment. D'abord, créons un noeud texte avec Document.createTextNode():

	var text = document.createTextNode(' — Encore une ligne de plus.');

5. Puis, après avoir récupéré un référence vers le premier paragraphe, ajoutons-y le noeud texte:

	var linkPara = document.querySelector('p');
	linkPara.appendChild(text);

C'est le plus gros de ce dont vous aurez besoin pour ajouter des noeuds au DOM — vous utiliserez beaucoup ces méthodes lorsque vous construirez des interfaces dynamiques (nous verrons quelques exemples plus tard).


## Déplacer des éléments

Il peut y avoir des moments où vous allez vouloir déplacer des noeuds. Si on voulait déplacer le premier paragraphe au bas de la section, on pourrait faire ça:

	article.appendChild(linkPara);

Cela déplace le paragraphe tout au bas de la section. On pourrait penser que cela ajouterait une copie, mais ce n'est pas le cas — linkPara est une référence vers un et un seul élément. Si on voulait ajouter une copie, on devrait utiliser Node.cloneNode() à la place.


## Supprimer des éléments  

Supprimer des éléments est également plutôt simple, du moins quand on a une référence de l'élément et de son parent. Dans notre cas, on peut utiliser Node.removeChild(), comme ceci:

	sect.removeChild(linkPara);

Vous pourriez aussi vouloir supprimer un élément en n'ayant qu'une référence vers cet élément, et c'est souvent le cas. Il n'existe pas de méthode pour dire à un noeud de se supprimer, vous auriez donc à faire comme suit:

	linkPara.parentNode.removeChild(linkPara);

Testez les lignes ci-dessus dans votre code.






## Manipuler le style

À titre d'exemple, essayez d'ajouter les lignes suivantes au bas de votre JavaScript:

para.style.color = 'white';
para.style.backgroundColor = 'black';
para.style.padding = '10px';
para.style.width = '250px';
para.style.textAlign = 'center';

Rafraichissez la page et vous verrez que les styles ont été appliqués au paragraphe. Si vous regardez le paragraphe dans l'Inspecteur du navigateur, vous verrez que que ces lignes sont en effet ajoutées comme style en ligne au document


### Attribut classe

Il y a un autre moyen de manipuler dynamiquement des styles sur votre document, que nous allons voir maintenant.

1. Supprimez l'exemple précédent de votre JavaScript (5 lignes).  
2. Ajoutez ce qui suit de le <head> de votre HTML:  

    <style>  
    .highlight {
      color: white;
      background-color: black;
      padding: 10px;
      width: 250px;
      text-align: center;
    }
    </style>

3. Nous allons maintenant utiliser une méthode très utile pour la manipulation HTML de manière générale — Element.setAttribute(). Cette fonction prend deux paramètres, le nom de l'attribut que vous voulez définir sur l'élémént et la valeur que vous voulez lui attribuer. En l'occurence, nous allons définir la classe de l'élément à highlight:

para.setAttribute('class', 'highlight');

4. Rafraichissez votre page, et vous pourrez constater qu'il n'y a aucun changement par rapport au dernier exemple. La seule différence est qu'on a utilisé une classe et non des styles en ligne.