// set up svg
const svgns = "http://www.w3.org/2000/svg";
let container = document.getElementById("squiggle-container");
let svg = document.createElementNS(svgns, "svg");
svg.setAttribute("width", 1000);
svg.setAttribute("height", 490);
container.appendChild(svg);




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
			firstLine = new Line(this.x, this.x + this.w - this.t, 
							     this.y, this.t, this.c, this.p);
		} else {
			firstLine = new Line(this.x + this.t, this.x + this.w, 
							     this.y, this.t, this.c, this.p);
		}
		this.ls.push(firstLine);
		for (var i = 0; i < numTurns; i++) {
			if (i == numTurns - 1) {
				if (direction) {
					let newLine = new Line(this.x, this.x + this.w - this.t, 
								   	   this.y + (this.t + this.s) * (i + 1),
								       this.t, this.c, this.p);
				} else {
					let newLine = new Line(this.x + this.t, this.x + this.w, 
								   	   this.y + (this.t + this.s) * (i + 1),
								       this.t, this.c, this.p);
				}
			}
			let newLine = new Line(this.x + this.t, this.x + this.w - this.t, 
								   this.y + (this.t + this.s) * (i + 1),
								   this.t, this.c, this.p)
			this.ls.push(newLine);
			let newC;
			if (direction) {
				// right side
				newC = new Connecter(this.x + this.w - this.t, 
								     this.y + (this.s + this.t) * (i) + (this.t / 2),
									 this.y + (this.s + this.t) * (i + 1) + (this.t / 2), 
									 this.t, this.c, direction, this.p);
			} else {
				// left side
				newC = new Connecter(this.x + this.t, 
								     this.y + (this.s + this.t) * (i) + (this.t / 2),
									 this.y + (this.s + this.t) * (i + 1) + (this.t / 2), 
									 this.t, this.c, direction, this.p);
			}
			direction = !direction;
			this.cs.push(newC);
			
		}



	}
}

// rectangles with circles on left, right sides
class Line {
	constructor(startX, endX, y, w, c, parent) {
		this.x1 = startX;
		this.x2 = endX;
		this.y  = y;
		this.w  = w;
		this.c  = c;
		this.p  = parent;
		this.rect    = document.createElementNS(svgns, "rect");
		this.rect.setAttribute("x", this.x1);
		this.rect.setAttribute("y", this.y);
		this.rect.setAttribute("width", this.x2 - this.x1);
		this.rect.setAttribute("height", this.w);
		this.rect.setAttribute("fill", this.c);
		this.p.appendChild(this.rect);
		// x, y, width, height, (rx)
		// make rect from x1 to x2 with y in middle
		// make two circles with centers at x1,y and x2,y with r
	}
}

class Connecter {
	constructor(x, startY, endY, w, c, right, parent) {
		this.x  = x;
		this.y1 = startY;
		this.y2 = endY;
		this.w  = w;
		this.c  = c;
		this.s  = right;
		this.p  = parent;
		this.path1 = document.createElementNS(svgns, "path");
		this.path2 = document.createElementNS(svgns, "path");
		this.l = document.createElementNS(svgns, "rect");
		this.l.setAttribute("y", this.y1 + this.w / 2);
		this.l.setAttribute("width", this.w);
		this.l.setAttribute("height", this.y2 - this.y1 - this.w);
		this.l.setAttribute("fill", this.c);
		this.p.appendChild(this.l);
		// need to make two paths
		// let d = Mx,y LstartX,startY Ar,r 0 1,0 endX,endy z
		if (this.s) {
			this.l.setAttribute("x", this.x);
			// make top and bottom right quadrants
			let d1 = "M" + this.x + "," + (this.y1 + this.w / 2) + " L" + this.x + "," + (this.y1 - this.w / 2) + " A" + this.w + "," + this.w + " 0 0,1 " + (this.x + this.w) + "," + (this.y1 + this.w/2) + " z";
			this.path1.setAttribute("d", d1);
			this.path1.setAttribute("fill", this.c);
			this.p.appendChild(this.path1);
			let d2 = "M" + this.x + "," + (this.y2 - this.w / 2) + " L" + (this.x + this.w) + "," + (this.y2 - this.w / 2) + " A" + this.w + "," + this.w + " 0 0,1 " + this.x + "," + (this.y2 + this.w/2) + " z";
			this.path2.setAttribute("d", d2);
			this.path2.setAttribute("fill", this.c);
			this.p.appendChild(this.path2);
		} else {
			this.l.setAttribute("x", this.x - this.w);
			// make top and bottom left quadrants
			let d1 = "M" + this.x + "," + (this.y1 + this.w / 2) + " L" + this.x + "," + (this.y1 - this.w / 2) + " A" + this.w + "," + this.w + " 0 0,0 " + (this.x - this.w) + "," + (this.y1 + this.w/2) + " z";
			this.path1.setAttribute("d", d1);
			this.path1.setAttribute("fill", this.c);
			this.p.appendChild(this.path1);
			let d2 = "M" + this.x + "," + (this.y2 - this.w / 2) + " L" + (this.x - this.w) + "," + (this.y2 - this.w / 2) + " A" + this.w + "," + this.w + " 0 0,0 " + this.x + "," + (this.y2 + this.w/2) + " z";
			this.path2.setAttribute("d", d2);
			this.path2.setAttribute("fill", this.c);
			this.p.appendChild(this.path2);
		}

	}
}
// params x, y, width, thickness, spacing, numTurns, right, color, parent
let s1 = new Squiggle(0, 0, 1000, 40, 5, 2, true, "#35C58E", svg);
let s2 = new Squiggle(0, 135, 300, 40, 5, 7, true, "#f4b042", svg);
let s3 = new Squiggle(305, 135, 695, 70, 8, 2, false, "#f45742", svg);
let s4 = new Squiggle(305, 365, 695, 10, 2.5, 9, false, "#4286f4", svg);
