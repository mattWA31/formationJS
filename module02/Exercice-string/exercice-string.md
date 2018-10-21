
# Exercice : Les chaines de caractères

## Exercice 1 : Filtrer des messages de voeux

Dans ce premier exercice, nous commencerons simplement — nous avons un tableau de carte de voeux, mais nous voulons les trier pour ne lister que les messages concernant Noël. Nous attendons de vous que vous utilisiez un test conditionnel à l'intérieur d'une structure if( ... ), pour tester chaque chaîne et ne l'afficher dans la liste que si elle contient un message concernant Noël.  

1. Réfléchissez d'abord à comment vérifier que le message concerne Noël. Quelle chaîne est présente dans tous ces messages, et quelle méthode pourriez-vous utiliser pour en tester la présence ?  

2. Il vous faudra alors écrire un test conditionnel sous la forme opérande1 opérateur opérande2. La chose à gauche est-elle égale à la chose à droite ? Ou dans notre cas, l'appel de méthode de gauche renvoie-t-il le résultat de droite ?  

3. Conseil : dans notre cas, il est probablement plus utile de tester si le résultat de l'appel de notre méthode n'est pas égal à un certain résultat.  

utiliser le fichier exercice1.html

## Exercice 2 :  Remettre les majuscules

Dans cet exercice, nous avons des noms des villes du Royaume-Uni, mais les majuscules ne sont pas au bon endroit. Nous souhaitons modifier les noms pour qu'ils soient en minuscules à l'exception de la première lettre qui doit être une majuscule. Une bonne manière de faire ceci :  

1. Convertissez la totalité de la chaîne contenue dans la variable input en minuscules et stockez-la dans une nouvelle variable.  
2. Récupérez la première lettre de la chaîne dans cette nouvelle variable et stockez-la dans une autre variable.  
3. En utilisant la dernière variable comme une sous-chaîne, remplacez la première lettre de la chaîne en minuscules par la première lettre de la chaîne en minuscules transformé en majuscules. Stockez le résultat de cette procédure de remplacement dans une autre nouvelle variable.  utiliser la methode string.slice(position1, position2) qui retourne la valeur de la chaine coupé entre la position1 et la position2.
4. Changez la valeur de la variable result afin qu'elle soit égale au résultat final plutôt qu'à input.  

utiliser le fichier exercice2.html
 