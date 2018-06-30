// let's write some DOCUMENTATION, HUH???

const NS = "http://www.w3.org/2000/svg";
// creates an svg child with a squiggle in it
// takes a list of colors, or if null, comes up with its own
class SpaceFiller {
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
	getRandomInt(max) {
	  return Math.floor(Math.random() * Math.floor(max));
	}

	getRandomBool() {
		return Math.random() >= 0.5;
	}

	constructor(width, height, colors = null) {
		this.w		 = width;
		this.h 		 = height;
		// height = thickness * (turns + 1) + spacing * turns
		// 0 turns breaks it, unclear why exactly, for now, bump it
		this.turns = this.getRandomInt(height / 32) + 1;
		// spacing and turns will surely need tweaking
		this.space = this.getRandomInt(height / this.turns) + 1;
		this.thick = (height - (this.space * this.turns)) / (this.turns + 1);
		this.right = this.getRandomBool(); 
		this.stacked = this.getRandomBool();
		if (colors != null) {
			let len = colors.length;
			if (this.stacked) {
				// if stacked, use colors length to determine stackSpacing
				// this is worth testing, maybe try assert within stackedSquiggle when drawing?
				// who knows
				// thickness = ((#layers * 2) - 1 ) * stackspacing
				this.stackSpacing = this.thick / ((len * 2) - 1);
				this.colors = colors;
				// maybe it should be possible to get a gradient here?
			} else {
				// if not stacked, pick color from colors
				this.color = colors[this.getRandomInt(len)]
			}
		} else {
			// come up with a random color
			// if stacked, turn into a gradient?
		}
		console.log("space:", this.space, "turns:", this.turns, "thick:", this.thick, "right:", this.right, "stacked:", this.stacked, "stackSpacing:", this.stackSpacing);
	}

	
	// append as child to parent node, set as background
	connect(parentNode) {
		this.svg = document.createElementNS(NS, "svg");
		this.svg.setAttribute("height", this.h + "px");
		this.svg.setAttribute("width",  this.w + "px");
		parentNode.appendChild(this.svg);
		if (this.stacked) {
			// make a stacked
			this.squiggle = new StackedSquiggle(0, 0, this.w, this.thick, this.space, this.turns,
																					this.right, this.colors, this.stackSpacing, this.svg);
		} else {
			// make a normal one
			this.squiggle = new Squiggle(0, 0, this.w, this.thick, this.space, this.turns, this.right,
																	 this.color, this.svg);
		}

		// might have to deal with making a background

	}
}

class StackedSquiggle {
	constructor(x, y, width, thickness, spacing, numTurns, right, colors, stackSpacing, parent) {
		this.x  = x;
		this.y  = y;
		this.w  = width;
		this.s  = spacing;
		this.t  = thickness;
		this.r  = right;
		this.cs = colors;
		this.p  = parent;
		this.ss = [];

		// number of stacks determined by length of colors list
		for (var i = 0; i < this.cs.length; i++) {
			let squig = new Squiggle(x + (stackSpacing) * i, y + (stackSpacing * i), width - (stackSpacing * 2 * i), 
															 thickness - ((stackSpacing * 2) * i),
															 spacing + ((stackSpacing * 2) * i), numTurns, right,
															 colors[i], parent);
			this.ss.push(squig);
		}
	}
}

class Squiggle {
	constructor(x, y, width, thickness, spacing, numTurns, right, color, parent) {
		this.x  = x;
		this.y  = y;
		this.w  = width;
		this.s  = spacing;
		this.t  = thickness;
		this.r  = right;
		this.c  = color;
		this.p  = parent;
		this.ls = [];
		this.cs = [];

		// make numTurns + 1 lines
		// make numTurns Connectors, starting
		let direction = right;
		let firstLine
		if (direction) {
			firstLine = new Line(this.x, this.x + this.w - (this.t + this.s / 2), 
							     this.y, this.t, this.c, this.p);
		} else {
			firstLine = new Line(this.x + this.t + this.s / 2, this.x + this.w, 
							     this.y, this.t, this.c, this.p);
		}
		this.ls.push(firstLine);
		for (var i = 0; i < numTurns; i++) {
			if (i == numTurns - 1) {
				if (direction) {
					let newLine = new Line(this.x, this.x + this.w - (this.t + this.s / 2),
								   	   this.y + (this.t + this.s) * (i + 1),
								       this.t, this.c, this.p);
				} else {
					let newLine = new Line(this.x + this.t + this.s / 2, this.x + this.w, 
								   	   this.y + (this.t + this.s) * (i + 1),
								       this.t, this.c, this.p);
				}
			}
			let newLine = new Line(this.x + this.t + this.s / 2, 
														 this.x + this.w - (this.t + this.s / 2), 
								   					 this.y + (this.t + this.s) * (i + 1),
								   					 this.t, this.c, this.p)
			this.ls.push(newLine);
			let newC;
			if (direction) {
				// right side
				newC = new Connecter(this.x + this.w - (this.t + this.s/2), 
														 this.y + this.t + (this.s / 2) + (this.t + this.s) * i,
									 this.t + this.s / 2, this.c, this.s, direction, this.p);
			} else {
				// left side
				newC = new Connecter(this.x + this.t + this.s/2,
														 this.y + this.t + (this.s / 2) + (this.t + this.s) * i,
									 this.t + this.s / 2, this.c, this.s, direction, this.p);
			}
			direction = !direction;
			this.cs.push(newC);
			
		}



	}
}

class Line {
	constructor(startX, endX, y, w, c, parent) {
		this.x1 = startX;
		this.x2 = endX;
		this.y  = y;
		this.w  = w;
		this.c  = c;
		this.p  = parent;
		this.rect    = document.createElementNS(NS, "rect");
		this.rect.setAttribute("x", this.x1);
		this.rect.setAttribute("y", this.y);
		this.rect.setAttribute("width", this.x2 - this.x1);
		this.rect.setAttribute("height", this.w);
		this.rect.setAttribute("fill", this.c);
		this.rect.setAttribute("stroke", this.c);
		this.p.appendChild(this.rect);
		// x, y, width, height, (rx)
		// make rect from x1 to x2 with y in middle
		// make two circles with centers at x1,y and x2,y with r
	}
}

class Connecter {
	constructor(x, y, r, c, s, right, parent) {
		this.x  = x;
		this.y  = y
		this.r  = r;
		this.c  = c;
		this.s  = s;
		this.d  = right;
		this.p  = parent;
		this.m  = document.createElementNS(NS, "mask");
		this.maskID = "mask" + x + "-" + y + "-" + r;
		this.m.setAttribute("id", this.maskID);
		// the outer, white circle
		this.c1 = document.createElementNS(NS, "circle");
		this.c1.setAttribute("fill", "white");
		this.c1.setAttribute("stroke", "white");
		this.c1.setAttribute("cy", y);
		this.c1.setAttribute("cx", x);
		this.c1.setAttribute("r", r);
		this.m.appendChild(this.c1);

		// the inner, black circle
		this.c2 = document.createElementNS(NS, "circle");
		this.c2.setAttribute("fill", "black");
		this.c2.setAttribute("stroke", "white");
		this.c2.setAttribute("cy", y);
		this.c2.setAttribute("cx", x);
		this.c2.setAttribute("r", s / 2);
		this.m.appendChild(this.c2);
		this.c3 = document.createElementNS(NS, "path");

		this.p.appendChild(this.m);
		this.c3.setAttribute("fill", this.c);
		this.c3.setAttribute("stroke", this.c);
		this.c3.setAttribute("mask", "url(#" + this.maskID + ")");
		if (this.d) {
			let d = "M " + x + "," + (y - r) + " A " + r + "," + r + " 0 0,1 " + x + "," + (y + r);
			this.c3.setAttribute("d", d);
			// apply mask!
			this.p.appendChild(this.c3);
		} else {
			let d = "M " + x + "," + (y + r) + " A " + r + "," + r + " 0 0,1 " + x + "," + (y - r);
			this.c3.setAttribute("d", d);
			this.p.appendChild(this.c3);
		}

	}
}
