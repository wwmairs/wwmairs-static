// set up svg
const svgns = "http://www.w3.org/2000/svg";
let container = document.getElementById("squiggle-container");
let svg = document.createElementNS(svgns, "svg");
container.appendChild(svg);

cs = ["#3d9662", "#F7C450", "#DF6151", "#3680E8"];

if (screen.width <= 756) {
  // mobile
  let c = cs[randomInt(4)];
  svg.setAttribute("width", "325px");
  svg.setAttribute("height", "290px");

  let s0 = new StackedSquiggle(0, 0, 300, 50, 10, 4, true, cs, 7, svg);

} else {
  // desktop
  svg.setAttribute("width", 1000);
  svg.setAttribute("height", 490);
  // params x, y, width, thickness, spacing, numTurns, right, color, parent
  let s0 = new Squiggle(0, 0, 1000, 40, 5, 2, true, cs[0], svg);
  let s1 = new Squiggle(0, 135, 300, 40, 5, 7, true, cs[1], svg);
  let s2 = new Squiggle(305, 135, 695, 70, 8, 2, false, cs[2], svg);
  let s3 = new Squiggle(305, 365, 695, 10, 2.5, 9, false, cs[3], svg);
}

function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
