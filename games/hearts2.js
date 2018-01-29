// set up svg
const svgns = "http://www.w3.org/2000/svg";
let container = document.getElementById("container");
let svg = document.createElementNS(svgns, "svg");
svg.setAttribute("width", window.innerWidth);
svg.setAttribute("height", window.innerHeight);
container.appendChild(svg);
let startMessage = document.createElementNS(svgns, "text");
startMessage.setAttribute("y", window.innerHeight - 20);
startMessage.setAttribute("x", window.innerWidth - 20);
startMessage.setAttribute("text-anchor", "end");
startMessage.setAttribute("fill", "black");
startMessage.setAttribute("font-size", 22);
startMessage.innerHTML = "use arrows and mouse to explore data";
svg.appendChild(startMessage);
let initState = true;



var colors = {"avery": "#f44165",
			  "phil" : "#6a41f4",
			  "adam" : "#f4be41",
			  "will" : "#42f47d"}

var lineChart;
var pieChart;

var displayRound = 0;

let chartPadding = 10;

// get data for line chart
$.get('csv/hearts2_sum.csv', data => {
	let lines = data.split('\n');
	let headers = lines[0].split(',');
	let numPlayers = headers.length
	var playerSums = [];
	for (var i = 0; i < numPlayers; i++) {
		playerSums.push({'name': headers[i], 'sums' : []});
	}
	for (var i = 1; i < lines.length; i++) {
		let scores = lines[i].split(',');
		for (var j = 0; j < numPlayers; j++) {
			playerSums[j].sums.push(parseInt(scores[j]));
		}
	}
	// make chart
	lineChart = new LineChart(chartPadding, chartPadding, window.innerWidth - chartPadding * 2, window.innerHeight - chartPadding * 2, playerSums);
});

$.get('csv/hearts2_scores.csv', data => {
	let lines = data.split('\n');
	let headers = lines[0].split(',');
	let numPlayers = headers.length
	var playerScores = [];
	for (var i = 0; i < numPlayers; i++) {
		playerScores.push({'name': headers[i], 'scores' : []});
	}
	for (var i = 1; i < lines.length; i++) {
		let scores = lines[i].split(',');
		for (var j = 0; j < numPlayers; j++) {
			playerScores[j].scores.push(parseInt(scores[j]));
		}
	}
	// make chart
	pieChart = new PieChart(155 + chartPadding, 155 + chartPadding, 125, playerScores, lineChart);
});


// handle keypresses
$(window).on('keydown', (evt) => {
	let currRound = pieChart.currentRound;
	// right
	if (evt.keyCode == 39) {
		lineChart.highlightRound(currRound + 1);
		pieChart.changeRound(currRound + 1);
		pieChart.displayName(pieChart.currentName);
		console.log(pieChart);
	} else if (evt.keyCode == 37) {
		lineChart.highlightRound(currRound - 1);
		pieChart.changeRound(currRound - 1);
		pieChart.displayName(pieChart.currentName);
	}
	if (initState && (evt.keyCode == 37 || evt.keyCode == 39)) {
		initState = false;
		startMessage.setAttribute("fill", "none");
	}
})


class PieChart {
	constructor(_x, _y, _r, data, lc) {
		this.x = _x;
		this.y = _y;
		this.r = _r;
		this.data = data;
		this.lineChart = lc;
		this.paths = [];
		this.label = document.createElementNS(svgns, "text");

		this.label.setAttribute("y", this.y - this.r - 15);
		this.label.setAttribute("x", this.x);
		this.label.setAttribute("text-anchor", "middle");
		this.label.setAttribute("fill", "black");
		this.label.setAttribute("font-size", 22);
		this.lineChart.g.appendChild(this.label);

		this.desc = document.createElementNS(svgns, "text");

		this.desc.setAttribute("y", this.y);
		this.desc.setAttribute("x", this.x + this.r + 15 );
		this.desc.setAttribute("text-anchor", "left");
		this.desc.setAttribute("fill", "black");
		this.desc.setAttribute("font-size", 22);
		this.lineChart.g.appendChild(this.desc);
		this.currentName = "will";

		for (var i = 0; i < data.length; i++) {
			let newPath = document.createElementNS(svgns, "path")
			this.paths.push(newPath);
			this.lineChart.g.appendChild(newPath);
		}

		this.changeRound(0);
	}

	displayName(name) {
		console.log(name);
		this.currentName = name;
		let roundNumber = this.currentRound;
		this.label.innerHTML = "round " + roundNumber;
		let player = this.data.find( o => o.name === name);
		this.desc.innerHTML = name + " took " + player.scores[roundNumber] + (player.scores[roundNumber] == 1 ? " point" : " points" )+ " this round.";
		this.desc.setAttribute("fill", colors[name]);
	}

	highlightName(name) {
		this.currentName = name;
		let roundNumber = this.currentRound;
		this.displayName(name);
// let line = this.ls.find( o => o.name === name);

		let startA = 0;
		let hr = this.r + 5;
		let largestFlag = 0;
		let values = [];
		for (var i = 0; i < this.data.length; i++) {
			values.push({"name" : this.data[i].name,
						 "score" : this.data[i].scores[roundNumber]});
		}

		let sum = 0;
		for (const value of values) {
		  sum += value.score;
		}

		for (let i = 0; i < values.length; i++) {

			let value = values[i].score;
			let path = this.paths[i];
			// let's do some radians
			var a = ((value / sum) * 360) * Math.PI / 180;
			let startX = this.x + this.r * Math.cos(startA);
			let startY = this.y - this.r * Math.sin(startA);
			let endX = this.x + this.r * Math.cos(startA + a);
			let endY = this.y - this.r * Math.sin(startA + a);
			let highlightStartX = this.x + hr * Math.cos(startA);
			let highlightStartY = this.y - hr * Math.sin(startA);
			let highlightEndX = this.x + hr * Math.cos(startA + a);
			let highlightEndY = this.y - hr * Math.sin(startA + a);
			startA += a;
			if (a > Math.PI) {
				largestFlag = 1;
			} else {
				largestFlag = 0;
			}
			// figure out path description
			let description = "M" + this.x + "," + this.y + " L" + startX + "," + startY + " A" + this.r + "," + this.r + " 0 " + largestFlag + ",0 " + endX + "," + endY + " z";
			let highlightDescription = "M" + this.x + "," + this.y + " L" + highlightStartX + "," + highlightStartY + " A" + hr + "," + hr + " 0 " + largestFlag + ",0 " + highlightEndX + "," + highlightEndY + " z";
			let c = colors[values[i].name];
			if (values[i].name == name) {
				path.setAttribute("d", highlightDescription);
			} else {
				path.setAttribute("d", description);
			}
			path.setAttribute("stroke-width", 0);
			path.setAttribute("stroke", c);
			path.setAttribute("fill", c);
			let parent = this;
			path.addEventListener("mouseover", function(event){
				path.setAttribute("d", highlightDescription);
				parent.lineChart.highlightLine(values[i].name);
			});

			path.addEventListener("mouseleave", function(event){
				path.setAttribute("d", description);
				parent.lineChart.dehighlightLines();
			});

			
			startX = endX;
			startY = endY;
			}
	}
	dehighlightName() {
		let roundNumber = this.currentRound;
		this.label.innerHTML = "round " + roundNumber;
		let startA = 0;
		let hr = this.r + 5;
		let largestFlag = 0;
		let values = [];
		for (var i = 0; i < this.data.length; i++) {
			values.push({"name" : this.data[i].name,
						 "score" : this.data[i].scores[roundNumber]});
		}

		let sum = 0;
		for (const value of values) {
		  sum += value.score;
		}

		for (let i = 0; i < values.length; i++) {

			let value = values[i].score;
			let path = this.paths[i];
			// let's do some radians
			var a = ((value / sum) * 360) * Math.PI / 180;
			let startX = this.x + this.r * Math.cos(startA);
			let startY = this.y - this.r * Math.sin(startA);
			let endX = this.x + this.r * Math.cos(startA + a);
			let endY = this.y - this.r * Math.sin(startA + a);
			let highlightStartX = this.x + hr * Math.cos(startA);
			let highlightStartY = this.y - hr * Math.sin(startA);
			let highlightEndX = this.x + hr * Math.cos(startA + a);
			let highlightEndY = this.y - hr * Math.sin(startA + a);
			startA += a;
			if (a > Math.PI) {
				largestFlag = 1;
			} else {
				largestFlag = 0;
			}
			// figure out path description
			let description = "M" + this.x + "," + this.y + " L" + startX + "," + startY + " A" + this.r + "," + this.r + " 0 " + largestFlag + ",0 " + endX + "," + endY + " z";
			let highlightDescription = "M" + this.x + "," + this.y + " L" + highlightStartX + "," + highlightStartY + " A" + hr + "," + hr + " 0 " + largestFlag + ",0 " + highlightEndX + "," + highlightEndY + " z";
			let c = colors[values[i].name];
			path.setAttribute("d", description);
			path.setAttribute("stroke-width", 0);
			path.setAttribute("stroke", c);
			path.setAttribute("fill", c);
			let parent = this;
			path.addEventListener("mouseover", function(event){
				path.setAttribute("d", highlightDescription);
				parent.lineChart.highlightLine(values[i].name);
			});

			path.addEventListener("mouseleave", function(event){
				path.setAttribute("d", description);
				parent.lineChart.dehighlightLines();
			});

			
			startX = endX;
			startY = endY;
			}
	}

	changeRound(roundNumber) {
		this.currentRound = roundNumber;
		this.label.innerHTML = "round " + roundNumber;
		let startA = 0;
		let hr = this.r + 5;
		let largestFlag = 0;
		let values = [];
		for (var i = 0; i < this.data.length; i++) {
			values.push({"name" : this.data[i].name,
						 "score" : this.data[i].scores[roundNumber]});
		}

		let sum = 0;
		for (const value of values) {
		  sum += value.score;
		}

		for (let i = 0; i < values.length; i++) {

			let value = values[i].score;
			let path = this.paths[i];
			// let's do some radians
			var a = ((value / sum) * 360) * Math.PI / 180;
			let startX = this.x + this.r * Math.cos(startA);
			let startY = this.y - this.r * Math.sin(startA);
			let endX = this.x + this.r * Math.cos(startA + a);
			let endY = this.y - this.r * Math.sin(startA + a);
			let highlightStartX = this.x + hr * Math.cos(startA);
			let highlightStartY = this.y - hr * Math.sin(startA);
			let highlightEndX = this.x + hr * Math.cos(startA + a);
			let highlightEndY = this.y - hr * Math.sin(startA + a);
			startA += a;
			if (a > Math.PI) {
				largestFlag = 1;
			} else {
				largestFlag = 0;
			}
			// figure out path description
			let description = "M" + this.x + "," + this.y + " L" + startX + "," + startY + " A" + this.r + "," + this.r + " 0 " + largestFlag + ",0 " + endX + "," + endY + " z";
			let highlightDescription = "M" + this.x + "," + this.y + " L" + highlightStartX + "," + highlightStartY + " A" + hr + "," + hr + " 0 " + largestFlag + ",0 " + highlightEndX + "," + highlightEndY + " z";
			let c = colors[values[i].name];
			path.setAttribute("d", description);
			path.setAttribute("stroke-width", 0);
			path.setAttribute("stroke", c);
			path.setAttribute("fill", c);
			let parent = this;
			path.addEventListener("mouseover", function(event){
				// path.setAttribute("d", highlightDescription);
				parent.highlightName(values[i].name);
				parent.lineChart.highlightLine(values[i].name);
			});

			path.addEventListener("mouseleave", function(event){
				path.setAttribute("d", description);
				parent.lineChart.dehighlightLines();
			});

			
			startX = endX;
			startY = endY;
			}
	}
}


// what shape data does this expect?
// list of 'players' e.g.
// [ { name : 'avery', sums : [Int] }, { name : 'will', sums : [Int] } ]
class LineChart {
	constructor(_x, _y, _w, _h, data) {
		this.x  = _x;
		this.y  = _y;
		this.w  = _w;
		this.h  = _h;
		this.ls = [];
		this.data = data;
		this.g  = document.createElementNS(svgns, "g");
		this.g.setAttribute("class", "lineChart");
		svg.appendChild(this.g);

		this.cursor = document.createElementNS(svgns, "line");
		this.cursor.setAttribute("stroke", "none");
		this.cursor.setAttribute("stroke-width", "2");
		this.g.appendChild(this.cursor);


		
		// find max value, figure out step size, scale, blah blah blah

		this.maxValue = 0;
		for (var i = 0; i < this.data.length; i++) {
			this.maxValue = Math.max(this.maxValue, Math.max.apply(Math, this.data[i].sums));
		}

		// maybe assert that all this.data[i].sums are the same length
		this.xStep = this.w / this.data[0].sums.length + 2;
		this.yRatio = this.h / this.maxValue;
		for (var i = 0; i < this.data.length; i++) {
			this.ls.push(new Line(this, this.x, this.y, this.w, this.h, this.data[i], this.xStep, this.yRatio));
		}
		// make lines
	}

	highlightRound(roundNumber) {

		// highlight other points
		for (var i = 0; i < this.ls.length; i++) {
			this.ls[i].highlightRound(roundNumber);
		}
		// make labels?
	}

	highlightNone() {
		for (var i = 0; i < this.ls.length; i++) {
			this.ls[i].highlightNone();
		}
	}

	highlightLine(name) {
		for (var i = 0; i < this.ls.length; i++) {
			this.ls[i].dehighlightLine();
		}
		let line = this.ls.find( o => o.name === name);
		line.highlightLine();
	}

	dehighlightLines() {
		for (var i = 0; i < this.ls.length; i++) {
			this.ls[i].dehighlightLine();
		}
	}

	xCoord(roundNumber) {
		return roundNumber * this.xStep;
	}

	yCoord(value) {
		return this.h - (value * this.yRatio);
	}

	maxY(roundNumber) {
		let currMax = 0;
		for (var i = 0; i < this.data.length; i++) {
			console.log(this.data[i].sums[roundNumber])
			currMax = Math.max(currMax, this.data[i].sums[roundNumber]);
		}
		return currMax;
	}

	minY(roundNumber) {
		let currMin = this.maxValue;
		for (var i = 0; i < this.data.length; i++) {
			currMin = Math.min(currMin, this.data[i].sums[roundNumber]);
		}
		return currMin;
	}
}

// what shape data does this expect?
// a 'player' e.g.
// { name : 'avery', sums : [Int] }
class Line{
	constructor(chart, _x, _y, _w, _h, data, xStep, yRatio) {
		this.x = _x;
		this.y = _y;
		this.w = _w;
		this.h = _h;
		this.c = colors[data.name];
		this.step  = xStep;
		this.ratio = yRatio;
		this.poly  = document.createElementNS(svgns, "polyline");
		this.points = [];
		this.chart = chart;
		this.name = data.name;
		// create path for polyline like this "0,40 40,40 40,80, 80,80"
		let path = "";
		for (let i = 0; i < data.sums.length; i++) {
			let x = this.x + i * this.step;
			let y = this.y + this.h - (data.sums[i] * this.ratio);
			path += x + "," + y + " ";
			// make point too
			let newPoint = document.createElementNS(svgns, "circle");
			newPoint.setAttribute("cx", x);
			newPoint.setAttribute("cy", y);
			newPoint.setAttribute("r", 3);
			newPoint.setAttribute("fill", this.c);
			let p = newPoint;
			newPoint.addEventListener("mouseover", event => {
				// p.setAttribute("r", 7);
				pieChart.changeRound(i);
				pieChart.highlightName(this.name);
				this.chart.highlightNone();
				this.chart.highlightRound(i);
				this.highlightLine();
			});
			newPoint.addEventListener("mouseleave", event => {
				// p.setAttribute("r", 4);
				pieChart.dehighlightName();
				this.dehighlightLine();
			});
			this.points.push(newPoint);
		}
		this.poly.setAttribute("points", path);
		this.poly.setAttribute("fill", "none");
		this.poly.setAttribute("stroke", this.c);
		this.poly.setAttribute("stroke-width", "6");
		this.chart.g.appendChild(this.poly);
		let p = this.poly;
		let parent = this;
		this.poly.addEventListener("mouseover", event => {
			p.setAttribute("stroke-width", "8");
			pieChart.highlightName(parent.name);
			 // set some kinda text
		});
		this.poly.addEventListener("mouseleave", event => { 
			p.setAttribute("stroke-width", "6");
			pieChart.dehighlightName();
		});
		for (var i = 0; i < this.points.length; i++) {
			this.chart.g.appendChild(this.points[i]);
		}


	}

	highlightLine() {
		this.poly.setAttribute("stroke-width", 8);
	}

	dehighlightLine() {
		this.poly.setAttribute("stroke-width", 6);
	}

	highlightRound(roundNumber) {
		this.highlightNone();
		this.points[roundNumber].setAttribute("r", 7);
	}
	highlightNone() {
		for (var i = 0; i < this.points.length; i++) {
			this.points[i].setAttribute("r", 3);
		}
	}
}

// need PieChart class, and coordination