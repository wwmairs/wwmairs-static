class BigImg extends HTMLElement {
	constructor() {
		super();
		this.style = "width: 100vw; display: inline-block; position: relative;"
		this.shadow = this.attachShadow({mode: 'open'});
		this.img = document.createElement('img');
		this.img.style = "max-width: 700px; width: 80vw; position: absolute; left: 50%; transform: translateX(-50%);";
		this.img.src = this.getAttribute('src');
		this.shadow.appendChild(this.img);
		let bigSrc = this.img.src.split('/');
		bigSrc[bigSrc.length - 1] = "big_" + bigSrc[bigSrc.length - 1];
		bigSrc = bigSrc.join('/');

		this.biggerImg = new Image();
		var that = this;
		this.biggerImg.onload = () => {
			this.img.src = bigSrc;
		};
		this.biggerImg.src = bigSrc;
	}
}

customElements.define('big-img', BigImg, {extends: 'img'});
