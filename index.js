if (screen.width <= 756) {
    document.location = "mindex.html";
}


var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var NUM_CIRCLES = 6;

var circles = [];

const svgns = "http://www.w3.org/2000/svg";


/*
  * page colors
  * who:    #0F935A
  * what:   #16588A
  * where:  #6ABEFE
  * work:   #D78416
  * resume: #D74D16
  * contact:#FF8D60 
  *
  */

var container = document.getElementById("svg-container");
console.log(container);
var svg = document.createElementNS(svgns, "svg");
svg.setAttribute("width", WIDTH);
svg.setAttribute("height", HEIGHT);
container.appendChild(svg);

var p1 = {"x" : WIDTH / 3,     "y" : HEIGHT};
var p2 = {"x" : 2 * WIDTH / 3, "y" : 0};
var p3 = {"x" : WIDTH,         "y" : 0};
var p4 = {"x" : WIDTH,         "y" : HEIGHT};
function pointString(p) {
  return p.x + "," + p.y + " ";
}
var points = pointString(p1) + pointString(p2) + 
             pointString(p3) + pointString(p4) + pointString(p1);


var poly = document.createElementNS(svgns, "polygon");
poly.setAttribute("points", points);
poly.setAttribute("fill", "#0F935A");
svg.appendChild(poly);


function resize() {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  svg.setAttribute("width", WIDTH);
  svg.setAttribute("height", HEIGHT);

  p1 = {"x" : WIDTH / 3,     "y" : HEIGHT};
  p2 = {"x" : 2 * WIDTH / 3, "y" : 0};
  p3 = {"x" : WIDTH,         "y" : 0};
  p4 = {"x" : WIDTH,         "y" : HEIGHT};
  points = pointString(p1) + pointString(p2) + 
             pointString(p3) + pointString(p4) + pointString(p1);
  poly.setAttribute("points", points);
  poly.setAttribute("fill", "#0F935A");
}

window.onresize = resize;
