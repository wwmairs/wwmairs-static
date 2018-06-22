// set up svg
const svgns = "http://www.w3.org/2000/svg";
let container = document.getElementById("squiggle-container");
let svg = document.createElementNS(svgns, "svg");
container.appendChild(svg);

let canvasWidth  = 1000;
let canvasHeight = 625;

svg.setAttribute("width", canvasWidth + "px");
svg.setAttribute("height", canvasHeight + "px");

let r = document.createElementNS(svgns, "rect");
r.setAttribute("width", canvasWidth + "px");
r.setAttribute("height", canvasHeight + "px");
r.setAttribute("fill", "#098834");
//svg.appendChild(r);

cs = ["#0caa41", "#3cbb66", "#6dcc8d", "#9dddb3", "#ceeed9"];
let s = new StackedSquiggle(0, 0, 1000, 300, 10, 1, true, cs, 33, svg);
