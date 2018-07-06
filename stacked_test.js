// set up svg
const svgns = "http://www.w3.org/2000/svg";
let container = document.getElementById("squiggle-container");

let canvasWidth  = 625;
let canvasHeight = 625;


cs = ["#0caa41", "#3cbb66", "#6dcc8d", "#9dddb3", "#ceeed9"];
c = "#0caa41";

let s = new SpaceFiller(canvasWidth, canvasHeight, c);
s.connect(container);


// let svg = document.createElementNS(svgns, "svg");
// container.appendChild(svg);
// svg.setAttribute("height", canvasHeight + "px");
// svg.setAttribute("width", canvasWidth + "px");
// let s = new StackedSquiggle(0, 0, 625, 100, 10, 2, true, cs, 11, svg);

