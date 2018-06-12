// set up svg
const svgns = "http://www.w3.org/2000/svg";
let container = document.getElementById("squiggle-container");
let svg = document.createElementNS(svgns, "svg");
container.appendChild(svg);

svg.setAttribute("width", "1000px");
svg.setAttribute("height", "550px");

cs = ["#35C58E", "#f4b042", "#f45742", "#4286f4"];

let s = new StackedSquiggle(0, 0, 1000, 100, 10, 4, false, cs, 15, svg);

function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
