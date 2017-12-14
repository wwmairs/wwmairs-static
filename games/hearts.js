const statistics = {"header": ["Program Description" , "Number"],
                    "values": [{"program": "College of Liberal Arts", "number": 22},
                               {"program": "Graduate Engineering", "number": 7},
                               {"program": "School of Engineering", "number": 8}]};


//ToDo (2): Learn how you access each value.



//ToDo (3): Draw on a sheet of paper what your resulting DOM tree looks like.
let container = document.getElementById("container");

const svgns = "http://www.w3.org/2000/svg";

let svg = document.createElementNS(svgns, "svg");
svg.setAttribute("width", window.innerWidth);
svg.setAttribute("height", 500);
container.appendChild(svg);

let chart = document.createElementNS(svgns, "g");
chart.setAttribute("id", "pie-chart");
svg.appendChild(chart);


//ToDo (4): Construct the pie chart.
//          If needed, introduce other data structures,
//          variables, etc. for your convenience.


//The below is an example which creates a pie chart consisting of 4 pie slices, but it does not use the given dataset.
let pathDescriptions = ["M250,250 L250,50 A200,200 0 0,1 450,250 z",
                        "M250,250 L450,250 A200,200 0 0,1 250,450 z",
                        "M250,250 L250,450 A200,200 0 0,1 50,250 z",
                        "M250,250 L50,250 A200,200 0 0,1 250,50 z"];
var colors = ["#f44165", "#6a41f4", "#f4be41"]
var sum = 0;
for (const value of statistics.values) {
  sum += value.number;
}
var startX = 250;
var startY = 50;
var endX = 0;
var endY = 0;
var startA = 0;
var cx = 250;
var cy = 250;
var r = 200
var hr = 210;
var largestFlag = 0;
var defaultMessage = "there are " + sum + " students in comp 177."
var text = document.createElementNS(svgns, "text");
text.setAttribute("y", 250);
text.setAttribute("x", window.innerWidth * 3 / 4);
text.setAttribute("text-anchor", "middle");
text.setAttribute("fill", "black");
text.setAttribute("font-size", 22);
text.innerHTML = defaultMessage;
chart.appendChild(text);



for (var i = 0; i < statistics.values.length; i++) {

  let value = statistics.values[i];
  let path = document.createElementNS(svgns, "path");
  // let's do some radians
  var a = ((value.number / sum) * 360) * Math.PI / 180;
  startX = cx + r * Math.cos(startA);
  startY = cy - r * Math.sin(startA);
  endX = cx + r * Math.cos(startA + a);
  endY = cy - r * Math.sin(startA + a);
  highlightStartX = cx + hr * Math.cos(startA);
  highlightStartY = cy - hr * Math.sin(startA);
  highlightEndX = cx + hr * Math.cos(startA + a);
  highlightEndY = cy - hr * Math.sin(startA + a);
  startA += a;
  if (a > Math.PI) {
    largestFlag = 1;
  } else {
    largestFlag = 0;
  }
  // figure out path description
  let description = "M" + cx + "," + cy + " L" + startX + "," + startY + " A" + r + "," + r + " 0 " + largestFlag + ",0 " + endX + "," + endY + " z";
  let highlightDescription = "M" + cx + "," + cy + " L" + highlightStartX + "," + highlightStartY + " A" + hr + "," + hr + " 0 " + largestFlag + ",0 " + highlightEndX + "," + highlightEndY + " z";
  let c = colors[i];
  path.setAttribute("d", description);
  path.setAttribute("stroke-width", 0);
  path.setAttribute("stroke", c);
  path.setAttribute("fill", c);

  path.addEventListener("mouseover", function(event){
    path.setAttribute("d", highlightDescription);
    text.setAttribute("fill", c);
    text.innerHTML = value.number + " are from " + value.program + ".";
  });

  path.addEventListener("mouseleave", function(event){
    path.setAttribute("d", description);
    text.setAttribute("fill", "black");
    text.innerHTML = defaultMessage;
  });

  chart.appendChild(path);
  startX = endX;
  startY = endY;
}

