
# TP1
  
## Une liste de courses dynamique
  
Nous voulons créer une simple liste de courses qui nous permette d'ajouter des items à la liste dynamiquement en utilisant un champ de formulaire et un bouton. Quand vous ajoutez une valeur au champ et appuyez sur le bouton:  

  - La valeur du champ doit être ajoutée à la liste.  
  - Chaque élément de la liste doit avoir un bouton qui, quand il est pressé, supprime cet élément de la liste.  
  - Le champ doit être vidé et prendre le focus pour que vous puissez entrer un autre élément directement.  

Le projet terminé doit ressembler à ça: (voir exemple)  

Pour compléter l'exercice, suivez les étapes ci-dessous, et assurez-vous que votre exemple se comporte comme décrit ci-dessus.  

  1. Tout d'abord, téléchargez une copie du fichier liste-course.html. Vous verrez qu'il contient un peu de CSS, un label, champ et bouton, une liste vide et un élément <script>. Vous devrez apporter toutes vos modifications à l'intérieur du script.  
  2. Créez trois variables, contenant des références à la liste <ul>, champ <input>, et bouton <button>.  
  3. Créez une fonction qui est déclenchée lorsqu'on clique sur le bouton.  
  4. À l'intérieur du corps de la fonction, commencez par stocker la valeur (propriété value) du champ dans une variable: element.value  
  5. Ensuite, videz le champ en définissant sa valeur à une chaîne vide — ''.  
  6. Créez trois nouveaux éléments — un élément de liste <li>, un <span> et <button>, et stockez-les dans des variables.  
  7. Ajoutez le <span> et <button> comme enfant du <li>.  
  8. Définissez le contenu du <span> à la valeur du champ que vous avez récupéré précédemment, et définissez le contenu du bouton à "Supprimer".  
  9. Ajoutez le <li> comme enfant de la liste.  
  10. Ajoutez un gestionnaire d'événéments pour le bouton "Supprimer", pour que, lors du clic, le <li> dans lequel il se situe est supprimé.  
  11. Finalement, utilisez la méthode HTMLElement.focus pour donner le focus au champ, qu'il soit prêt à recevoir la valeur du prochain élément.  

  
Pour aller plus loin
  1. Transformez l'exercice précédent en y incluant JQuery.