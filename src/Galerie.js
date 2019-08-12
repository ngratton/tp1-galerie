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
		this.ajouterClic();
	}
	static ajouterClic() {
		this.liens = Array.from(this.app.querySelectorAll("#galerie a"));
		for (let i = 0; i < this.liens.length; i = i + 1) {
			var leLien = this.liens[i];
			leLien.addEventListener("click", e => {
				e.preventDefault(); // Enlève la fonction définie dans le HTML; dans ce cas-ci, l'ouverture de l'image dans un nouvel onglet.
				document.body.appendChild(this.retournerBackdrop(e.currentTarget));
				this.clicPrevImg();
				this.position = this.liens.indexOf(e.currentTarget);
			});
		}
	}
	static clicPrevImg() {
		this.liens = Array.from(this.app.querySelectorAll("#galerie a"));
		for (let i = 0; i < this.liens.length; i = i + 1) {
			var leLien = this.liens[i];
			leLien.addEventListener("click", e => {
				e.preventDefault(); // Enlève la fonction définie dans le HTML; dans ce cas-ci, l'ouverture de l'image dans un nouvel onglet.
				document.body.appendChild(this.retournerBackdrop(e.currentTarget));
				this.clicPrevImg();
				this.position = this.liens.indexOf(e.currentTarget);;
				console.log(this.liens[this.position]);
			});
		}
		var currentImg = this.liens[this.position - 1];
		console.log(currentImg);
		// var liens = Array.from(this.app.querySelectorAll("#galerie a"));
		// for (let i = 0; i < liens.length; i = i + 1) {
		// 	var leLien = liens[i];
		// 	leLien.addEventListener("click", e => {
		// 		e.preventDefault(); // Enlève la fonction définie dans le HTML; dans ce cas-ci, l'ouverture de l'image dans un nouvel onglet.
		// 		var position = liens.indexOf(e.currentTarget);;
		// 		var nextImg = liens[position-1];
		// 		var prevImg = liens[position+1];
		// 	});
		// }
	}
	static retournerBackdrop(target) {
		var contenu = target.querySelector("img");
		var imgAnimal = contenu.getAttribute("src");
		var imgFigure = contenu.getAttribute("alt");

		var backdrop = document.createElement("div");
		backdrop.setAttribute("id", "backdrop");

		var close = document.createElement("span");
		close.classList.add("close");
		close.innerHTML = "&#x2716;";
		backdrop.appendChild(close);

		var precedent = document.createElement("span");
		precedent.classList.add("precedent");
		precedent.innerHTML = "&#x276e;";
		backdrop.appendChild(precedent);

		var figure = document.createElement("figure");
		figure.classList.add("diapo");
		figure.style.transition = "all 0.5s ease 0s";
		figure.style.transform = "scale(1)"
		backdrop.appendChild(figure);

		var imgtag = document.createElement("img");
		imgtag.src = imgAnimal;
		imgtag.setAttribute("alt", imgFigure);
		figure.appendChild(imgtag);

		var figcaption = document.createElement("figcaption");
		figcaption.innerHTML = imgFigure;
		figure.appendChild(figcaption);

		var suivant = document.createElement("span");
		suivant.classList.add("suivant");
		suivant.innerHTML = "&#x276f;";
		backdrop.appendChild(suivant);;

		this.fermerBackdrop();

		return backdrop;
	}
	// Fonction qui permet de "tuer" le DIV#backdrop avec la touche "ESC" -- devrait utiliser le click.
	static fermerBackdrop() {
		addEventListener("click", e => {
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
