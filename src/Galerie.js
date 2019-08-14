/* 
*	NICHOLAS GRATTON - 0270256
*/
/*jslint esnext:true, browser:true*/
/**
 * @module Galerie
 */
export default class Galerie {
	/**
	 * Méthode principale. Sera typiquement appelée après le chargement de la page.
	 */
	static main() {
		this.app = document.getElementById("app");
		this.ajouterClicBackdrop(); // 
		this.imgArray = Array.from(this.app.querySelectorAll("#galerie a > img")); // Cération d'un Array dès le départ pour alimenter les fonctions 
	}
	/**
	 * Méthode qui recuillera les infos du liens cliquer et les utilisera en arguments pour afficher le backdrop et éxecuter la navigation précédent-suivant
	 */
	static ajouterClicBackdrop() {
		// Création d'un Array avec les liens sur index.hmtl
		var liens = Array.from(this.app.querySelectorAll("#galerie a"));
		for (let i = 0; i < liens.length; i = i + 1) {
			var leLien = liens[i];
			leLien.addEventListener("click", e => {
				e.preventDefault(); // Enlève la fonction définie dans le HTML; dans ce cas-ci, l'ouverture de l'image dans un nouvel onglet.
				document.body.appendChild(this.retournerBackdrop(e.currentTarget)); // Fait apparaitre le backdrop avec l'image cliquée (voir détails plus bas)
				// Création de la variable indexImg utilisée pour d'autres fonctions ainsi qu'appels des fonctions permettant de naviguer (Prev ou Next) dans la liste de photos.
				var indexImg = liens.indexOf(e.currentTarget); 
				this.clicNextImg(indexImg);
				this.clicPrevImg(indexImg);
			});
		}
	}
	/**
	 * Méthode qui lira dans un Array qu'elle est l'image PRÉCÉDENTE à afficher lorsque la flèche Prédédent est cliquée
	 */
	static clicPrevImg(indexImg) {
		var prevTargetImg; // Déclaration une variable pour être utilisé dans le click.event

		// Sélection et attribution d'un click.event sur span.precedent
		var prevSpan = document.querySelector("span.precedent"); 
		prevSpan.addEventListener("click", e => {
			// Établir si l'image cliquée est la première de imgArray[]; si oui, alors injecter l'index final pour obtenir la dernière image au prochain click, sinon le diminuer de 1
			if (indexImg === 0) {
				indexImg = this.imgArray.length - 1;						
				prevTargetImg = this.imgArray[indexImg];
			} else {			
				prevTargetImg = this.imgArray[indexImg - 1];
			}
			// Trouver les src et alt de l'image ainsi que le figcaption et remplacer avec l'info de l'image précédente.
			var prevImg = prevTargetImg.getAttribute("src");
			var prevAlt = prevTargetImg.getAttribute("alt");
			var currentImg = document.querySelector("#backdrop figure > img");
			var currentAlt = document.querySelector("#backdrop figure > figcaption")
			currentImg.setAttribute("src", prevImg);
			currentAlt.innerHTML = prevAlt;
			// Mettre à jour l'index de imgArray[]¸pour le prochain click, qu'il soit Suivant ou Précédent
			if (indexImg === 0) {
				indexImg = this.imgArray.length - 1;
			} else {
				indexImg = indexImg - 1;
			};
			// Pousser l'index d'imgArray[]	si un clic Suivant est possible.		
			this.clicNextImg(indexImg);
		});
	}
	/**
	 * Méthode qui lira dans un Array qu'elle est la PROCHAINE image à afficher lorsque la flèche Suivant est cliquée
	 */
	static clicNextImg(indexImg) {
		var nextTargetImg; // Déclaration une variable pour être utilisé dans le click.event

		// Sélection et attribution d'un click.event sur span.precedent
		var nextSpan = document.querySelector("span.suivant");
		nextSpan.addEventListener("click", e => {
			// Établir si l'image cliquée est la dernière de imgArray[]; si oui, alors injecter l'index 0 pour obtenir la première au prochain click, sinon l'incrémenter de 1
			if (indexImg === this.imgArray.length - 1) {
				indexImg = 0;
				nextTargetImg = this.imgArray[indexImg];
			} else {
				nextTargetImg = this.imgArray[indexImg + 1];
			}
			// Trouver les src et alt de l'image ainsi que le figcaption et remplacer avec l'info de l'image suivante.
			var nextImg = nextTargetImg.getAttribute("src");
			var nextAlt = nextTargetImg.getAttribute("alt");
			var currentImg = document.querySelector("#backdrop figure > img");
			var currentAlt = document.querySelector("#backdrop figure > figcaption")
			currentImg.setAttribute("src", nextImg);
			currentImg.style.transition = "2s"
			currentAlt.innerHTML = nextAlt;
			// Mettre à jour l'index de imgArray[]¸pour le prochain click, qu'il soit Suivant ou Précédent
			if (indexImg === this.imgArray.length - 1) {
				indexImg = 0;
			} else {
				indexImg = indexImg + 1;
			};
			// Pousser l'index d'imgArray[]	si un clic Précédent est possible.			
			this.clicPrevImg(indexImg);
		});
	}
	/**
	 * Méthode qui affichera le backdrop avec les informations recueillies par la méthode ajouterClicBackdrop()
	 */
	static retournerBackdrop(target) {
		var contenu = target.querySelector("img");
		var imgAnimal = contenu.getAttribute("src");
		var imgFigure = contenu.getAttribute("alt");
		// Créer le div#backdrop.
		var backdrop = document.createElement("div");
		backdrop.setAttribute("id", "backdrop");
		// Ajouter le span.close au backdrop.
		var close = document.createElement("span");
		close.classList.add("close");
		close.innerHTML = "&#x2716;";
		backdrop.appendChild(close);
		// Ajouter le span.precedent au backdrop.
		var precedent = document.createElement("span");
		precedent.classList.add("precedent");
		precedent.innerHTML = "&#x276e;";
		backdrop.appendChild(precedent);
		// Ajouter le figure.diapo au backdrop.
		var figure = document.createElement("figure");
		figure.classList.add("diapo");
		backdrop.appendChild(figure);
		// Ajouter img et alt au figure.
		var imgtag = document.createElement("img");
		imgtag.src = imgAnimal;
		imgtag.setAttribute("alt", imgFigure);
		figure.appendChild(imgtag);
		// Ajouter légende dans figcaption au figure.
		var figcaption = document.createElement("figcaption");
		figcaption.innerHTML = imgFigure;
		figure.appendChild(figcaption);
		// Ajouter le span.precedent au backdrop.
		var suivant = document.createElement("span");
		suivant.classList.add("suivant");
		suivant.innerHTML = "&#x276f;";
		backdrop.appendChild(suivant);;
		// Ajouter le Listener pour fermer le backdrop.
		this.fermerBackdrop();
		// Retourner tout le backdrop avec ses éléments à la fonction main().
		return backdrop;
	}
	/**
	 * Méthode qui permet de "tuer" le DIV#backdrop avec la touche "ESC" -- devrait utiliser le click.
	 */
	static fermerBackdrop() {
		addEventListener("click", e => {
			// Écoute des clics dans les éléments div#backdrop et span.close
			if(e.target === document.querySelector("div#backdrop") || e.target === document.querySelector("span.close")) {
				var killBackdrop = document.body.querySelector("div#backdrop");
				killBackdrop.parentNode.removeChild(killBackdrop);
			}
		});
	}
	/**
	 * Méthode qui permet d'attendre le chargement de la page avant d'éxécuter le script principal
	 * @returns {Promise} La promesse qui sera résolue après chargement
	 */
	static load() {
		return new Promise(resolve => {
			window.addEventListener("load", () => {
				resolve();
			});
		});
	}
}
