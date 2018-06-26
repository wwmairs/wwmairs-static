// set up svg
const svgns = "http://www.w3.org/2000/svg";
let container = document.getElementById("squiggle-container");
let svg = document.createElementNS(svgns, "svg");
container.appendChild(svg);

let canvasWidth  = 1000;
let canvasHeight = 625;

svg.setAttribute("height", canvasWidth + "px");
svg.setAttribute("width", canvasHeight + "px");

cs = ["#0caa41", "#3cbb66", "#6dcc8d", "#9dddb3", "#ceeed9"];
let s = new StackedSquiggle(0, 0, 625, 100, 10, 3, true, cs, 33, svg);

svg.setAttribute("transform", "translate(0 " + canvasHeight + ") rotate(90)");
