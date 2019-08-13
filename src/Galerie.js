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
		this.imgArray = Array.from(this.app.querySelectorAll("#galerie a > img"));
	}
	static ajouterClic() {
		var liens = Array.from(this.app.querySelectorAll("#galerie a"));
		for (let i = 0; i < liens.length; i = i + 1) {
			var leLien = liens[i];
			leLien.addEventListener("click", e => {
				e.preventDefault(); // Enlève la fonction définie dans le HTML; dans ce cas-ci, l'ouverture de l'image dans un nouvel onglet.
				document.body.appendChild(this.retournerBackdrop(e.currentTarget));
				var indexImg = liens.indexOf(e.currentTarget);
				this.clicNextImg(indexImg);
				this.clicPrevImg(indexImg);
			});
		}
	}
	static clicPrevImg(indexImg) {
		if (indexImg === 0) {
			indexImg = 6;
		};
		var prevSpan = document.querySelector("span.precedent");
		prevSpan.addEventListener("click", e => {
			var prevTargetImg = this.imgArray[indexImg - 1];
			var prevImg = prevTargetImg.getAttribute("src");
			var prevAlt = prevTargetImg.getAttribute("alt");
			var currentImg = document.querySelector("#backdrop figure > img");
			var currentAlt = document.querySelector("#backdrop figure > figcaption")
			currentImg.setAttribute("src", prevImg);
			currentAlt.innerHTML = prevAlt;
			if (indexImg === 1) {
				indexImg = 6;
			} else {
				indexImg = indexImg - 1;
			};			
			this.clicNextImg(indexImg);
		});
	}
	
	static clicNextImg(indexImg) {
		if (indexImg === (this.imgArray.length)) {
			indexImg = 0;
		}
		var nextSpan = document.querySelector("span.suivant");
		nextSpan.addEventListener("click", e => {
			var nextTargetImg = this.imgArray[indexImg + 1];
			var nextImg = nextTargetImg.getAttribute("src");
			var nextAlt = nextTargetImg.getAttribute("alt");
			var currentImg = document.querySelector("#backdrop figure > img");
			var currentAlt = document.querySelector("#backdrop figure > figcaption")
			currentImg.setAttribute("src", nextImg);
			currentImg.style.transition = "2s"
			currentAlt.innerHTML = nextAlt;
			if (indexImg === (this.imgArray.length - 2)) {
				indexImg = 0;
			} else {
				indexImg = indexImg + 1;
			};			
			this.clicPrevImg(indexImg);
		});
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
