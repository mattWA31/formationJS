
# TP1  

## Résumé du projet  

On fournit du code HTML/CSS brut ainsi que quelques chaînes de caractères et fonctions JavaScript :  
vous devez écrire le code JavaScript nécessaire pour transformer ces éléments en un programme fonctionnel, qui fera les choses suivantes :  
  - Générer une histoire absurde quand on appuie sur le bouton "Générer histoire aléatoire".  
  - Remplacer dans l'histoire le nom par défaut "Bob" par un nom personnalisé, dans le cas où le champ "Entrer un nom" a été complété avant que le bouton "Générer" soit déclenché.  
  - Convertir les unités de poids et de température par défaut vers leurs équivalents britanniques si le boutton "radio EN" a été coché avant que le bouton "Générer" soit déclenché.  
  - Générer une nouvelle histoire absurde au hasard quand on appuie à nouveau sur le bouton (et encore une, et encore une...).  

## Les étapes  

Les sections suivantes décrivent ce que vous devez faire :  

### Installation basique :  

  - Créez un nouveau fichier nommé main.js, dans le même dossier que index.html file.  
  - Appliquez le fichier JavaScript externe à votre code HTML en insérant une balise <script> dans votre code HTML en référençant main.js. Mettez-la juste avant de refermer la balise </body>.  

### Variables initiales et fonctions :  

  - Dans le fichier de texte brut, copiez tout le code présent sous le titre "1. DÉFINITIONS COMPLÈTES DES VARIABLES ET DES FONCTIONS" et collez-le en haut du fichier main. Cela vous donne trois variables qui stockent les références respectivement vers le champ "Entrer un nom", vers le bouton "Générer histoire aléatoire" (générer), et vers la balise <p> en bas du corps HTML dans lequel l'histoire sera copiée. Par ailleurs, vous avez une fonction appelée valeurAleatoire() qui prend une table, et qui renvoie au hasard l'un des éléments qu'elle contient.  
  - Maintenant regardons la deuxième section du fichier de texte brut : "2. CHAINE DE TEXTE BRUT". Cette section contient des chaînes de caractères qui vont se comporter comme des entrées (input) dans notre programme. L'idée est que vous intégriez ces variables internes dans main.js:  
      - Stockez la première longue chaîne de caractères (string) dans une variable nommée texteHistoire.  
      - Stockez le premier groupe de trois strings dans un tableau nommé insererX.  
      - Stockez le deuxième groupe de trois strings dans un tableau nommé insererY.  
      - Stockez le troisième groupe de trois strings dans un tableau nommé insererZ.  

### Mettre en place le gestionnaire d'événements (event handler) et le squelette de la fonction :

  - Retournez au fichier de texte brut.
  - Copiez le code qui se trouve sous le titre "3. ECOUTEUR D'EVENEMENTS ET DEFINITION DE FONCTION PARTIELLE" et collez-le en bas de votre fichier main.js principal. Cela :
        - Ajoute un gestionnaire d'événements pour les clics à la variable générer de telle sorte que quand on clique sur le bouton associé, la fonction genererHistoire() se lance.
        - Ajoute une définition partiellement complète de la fonction genererHistoire() à votre code. Pour le reste de l'évaluation, vous compléterez des lignes au sein de cette fonction pour la compléter et la faire fonctionner correctement.

### Compléter la fonction genererHistoire() :

  - Créer une nouvelle variable nommée nouvelleHistoire, et fixer sa valeur pour qu'elle soit égale à texteHistoire. C'est nécessaire pour que soit créée une nouvelle histoire au hasard à chaque fois qu'on appuiera sur le bouton "Générer" et que la fonction sera lancée. Si on apportait des modifications directement à texteHistoire, on ne pourrait générer une nouvelle histoire qu'une seule fois.
  - Créer trois nouvelles variables nommées xItem, yItem, et zItem, et faites en sorte qu'elles soient égales au résultat de l'appel de valeurAleatoire() sur vos trois tables (le résultat dans chaque cas fera apparaître un élément au hasard en provenance de chacune des tables appelées). Par exemple, vous pouvez appeler la fonction et lui faire retourner une chaîne de caractères au hasard depuis insertX en écrivant valeurAleatoire(insererX).
  - Ensuite nous allons remplacer les trois chaînes temporaires dans la chaîne nouvelleHistoire — :insererx:, :inserery:, et :insererz: — par les chaînes stockées dans xItem, yItem, and zItem. Ici, une méthode particulière de chaînes pourra vous aider : dans chaque cas, faites que l'appel à la méthode soit égal à nouvelleHistoire, de sorte qu'à chaque appel, nouvelleHistoire est égal à lui-même, mais avec les substitutions effectuées. Ainsi, à chaque fois qu'on appuiera sur le bouton, ces chaînes temporaires seront chacune remplacées par une chaîne de caractères absurdes au hasard. Pour information, la méthode en question remplace seulement la première séquence de sous-chaîne qu'elle trouve, donc vous devrez peut-être refaire l'un des appels deux fois.
  - Dans le premier block if, ajoutez une autre méthode de remplacement de chaîne pour remplacer le nom 'Bob' que vous trouverez dans la chaîne nouvelleHistoire en tant que variable name. Dans ce block, on établit que "Si une valeur a été entrée dans le champ nom de l'input, on remplacera dans l'histoire le mot Bob par ce nom personnalisé".
  - Dans le deuxième block if, on vérifie que le bouton radio fr a été coché. Si c'est le cas, nous voulons convertir les valeurs de poids et de température de l'histoire. Les kilos et les centigrades deviennent des pounds et des fahrenheit. Procédez comme suit :
      - Cherchez la formule pour convertir les kilos en pounds et les centigrades en farhenheit.
      - Dans la ligne qui définit la variable poids, remplacez 120 par un calcul qui convertit 120 kilos en pounds. Le tout englobé dans un Math.round() à la fin duquel vous concatenez 'pounds'.
      - Dans la ligne qui définit la variable temperature, remplacez 27 par un calcul qui convertit 27 centigrades en fahrenheit. Le tout englobé dans un Math.round() à la fin duquel vous concatenez 'fahrenheit'.
      - Juste sous la définition des deux variables, ajoutez deux lignes de remplacement de chaînes supplémentaires qui remplacent '27 degrés' par les contenus de la variable temperature, et '120 kilos' par les contenus de la variable weight.
  - Enfin, dans l'antépénultième ligne de la fonction, faites en sorte que la propriété textContent de la variable histoire (qui référence le paragraphe) soit égale à nouvelleHistoire.
