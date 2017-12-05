if (screen.width <= 756) {
    document.location = "mindex.html";
}


var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var NUM_CIRCLES = 6;

var circles = [];

const svgns = "http://www.w3.org/2000/svg";

var links = [{ name: "who",
               url: "who.html"
             },
             { name: "what",
               url: "what.html"
             },
             { name: "where",
               url: "where.html"
             },
             { name: "work", 
               url: "work/"
             },
             { name: "resume",
               url: "resume.html"
             },
             { name: "contact",
               url: "contact.html"}];

var colors = ['#0F935A', '#16588A', '#6ABEFE', 
              '#D78416', '#D74D16', '#FF8D60'];

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



class Circle {
    constructor(i){
        this.c  = colors[i];
        this.r  = Math.random() * 25 + 50;
        this.x  = Math.random() * (WIDTH - 200) + 100;
        this.y  = Math.random() * (HEIGHT - 200) + 100;
        for (var j = (i - 1); j >= 0; j--) {
            if (Math.abs(this.x - circles[j].x) < 100) {
                this.x = Math.random() * (WIDTH - 200) + 100;
                console.log("finding new x");
            }
            if (Math.abs(this.y - circles[j].y) < 100) {
                this.y = Math.random() * (HEIGHT - 200) + 100;
                console.log("finding new y");
            }
        }
        let name = links[i].name;
        let href = links[i].url;

        this.circle = document.createElementNS(svgns, "circle");
        this.circle.setAttribute("class", "circle");
        this.circle.setAttribute("cx", this.x);
        this.circle.setAttribute("cy", this.y);
        this.circle.setAttribute("r", this.r);
        this.circle.setAttribute("fill", this.c);
        this.circle.addEventListener("click", function (event) {
          window.location.href = href;
        });
        this.circle.addEventListener("mouseover", function(event) {
          console.log("mouseover");
        });
        svg.appendChild(this.circle);

        var text = document.createElementNS(svgns, "text");
        text.innerHTML = name;
        text.setAttribute("x", this.x)
        text.setAttribute("y", this.y)
        text.setAttribute("fill", "white");
        text.setAttribute("text-anchor", "middle");
        svg.appendChild(text);
    }
    updatePosition() {
      this.circle.setAttribute("cx", this.x);
      this.circle.setAttribute("cy", this.y);
    }
}


for (var i = 0; i < NUM_CIRCLES; i++) {
  circles[i] = new Circle(i);
}



