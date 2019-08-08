# Ma galerie
Fichiers de départ pour débuter le projet de galerie

Voir le [devis](./devis.md)

***ATTENTION!! Cette description est incomplète pour l'instant.***


## Introduction
L'utilisation de ces fichiers de départ est optionnelle. Dans la mesure où tous les buts sont atteints la structure est sans importance.

## Étapes
1. Faire en sorte de faire afficher __par programmation__ le code html qui se trouve en commentaires (et reproduit ci-dessous) dans le fichier `index.html`. [1](./etape1.md)
1. Faire __seulement__ afficher le _backdrop_ lorsque l'on clique sur une image. Donc, ajouter un événement `click` aux images du tableau.
1. Faire en sorte que ce soit la bonne image et le bon texte qui s'affiche.
1. Faire en sorte que le _backdrop_ disparaisse lorsque l'on clique à côté de l'image.
1. Garder en mémoire l'image courante originale.
1. Faire en sorte que l'image change (sans animation) lorsque l'on clique sur les boutons _Suivant_ ou _Précédent_.
1. ...
1. Nettoyer le code : enlever les commentaires inutiles, refaire l'indentation, enlever les espaces superflus.
1. Remettre.

## Gros défis
Faire en sorte de savoir quelle image doit être affichée lorsque l'on clique sur _Suivant_ ou _Précédent_. Il y plusieurs stratégies, mais aucune n'est parfaite. La page en soit ne connaît pas l'ordre ou la disposition des images. 
Voici quelques pistes :
- Garder en mémoire dans un `array` la liste des images à afficher. Lorsque l'on clique sur _Suivant_, trouver la position de l'image courant dans le `array` et appliquer l'image suivante à la page.
- Lors du chargement, donner à chaque image (élément DOM `img`) la propriété "precedent" et "suivant" qui contient l'image précédente ou suivante. Il est alors facile de l'appliquer à la page lors du clic.
- Lors du clic d'un bouton, chercher toutes les images cliquables dans la page; trouver l'image courante dans cette liste; choisir l'image suivante ou précédente; l'appliquer à la page.

## Rappel des mots-clés pour l'étape 1
- `document.body`
- `document.getElementById()`
- `document.createElement()`
- _element_`.appendChild()`
- _element_`.classList.add()`
- _element_`.setAttribute()`
- _element_`.innerHTML`

## Le code du _backdrop_
```html
<div id="backdrop">
   <span class="close">&#x2716;</span>
   <span class="precedent">&#x276e;</span>
   <figure class="diapo">
      <img src="images/niche.jpg" alt="Chien dans sa niche" />
      <figcaption>Chien dans sa niche</figcaption>
   </figure>
   <span class="suivant">&#x276f;</span>
</div>
```
