new p5();

var NUM_CIRCLES = 5;
var HOVER_CUTOFF = 50;

var pickbuffer;
var circles = new Array(NUM_CIRCLES);

var vulfFont;

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
               url: "resumer.html"}];

var colors = ['#3ECCA6', ]


/*
  * page colors
  * who:    #3ECCA6
  * what:   #FFB666
  * where:  #A6FEFF
  * work:   #CC5B51
  * resume: #99917B
  *
  */

var Circle = {
    selected: false,
    c  : 0,
    d  : 0,
    x  : 0,
    y  : 0,
    id : 255,
    render: function() {
        
        fill(this.c);
        if (this.isect()) {
            ellipse(this.x, this.y, 
                    this.d + HOVER_CUTOFF / 2, 
                    this.d + HOVER_CUTOFF / 2);
        } else {
            augment = 0
            distance = dist(this.x, this.y, mouseX, mouseY) - this.d/2;
            if (distance < HOVER_CUTOFF) {
                augment = (HOVER_CUTOFF - distance) / 2;
                
            }
            ellipse(this.x, this.y, this.d + augment, this.d + augment);   
        }
        fill(0);
        textAlign(CENTER, CENTER);
        // textFont(vulfFont);
        text(this.name, this.x, this.y);
    },
    renderSelected: function() {
        fill(0);
        ellipse(this.x, this.y, this.d, this.d);
    },
    renderIsect: function() {
        pickbuffer.fill(this.id.levels);
        pickbuffer.stroke(this.id);
        pickbuffer.strokeWeight(5);
        pickbuffer.ellipse(this.x, this.y, this.d, this.d);  
    },
    isect () {
        mouseColor = color(pickbuffer.get(mouseX, mouseY));
        return (red(mouseColor) == red(this.id) &&
                blue(mouseColor) == blue(this.id) &&
                green(mouseColor) == green(this.id));
    }
}




function preload(){

    // vulfFont = loadFont('vulfface/Vulf_Mono-Light_Italic_web.ttf')

    HEIGHT = windowHeight;
    WIDTH = windowWidth;
    pickbuffer = createGraphics(WIDTH, HEIGHT);

}

function setup () {
    noLoop();
    smooth();
    createCanvas(WIDTH, HEIGHT);

    for (i = 0; i < NUM_CIRCLES; i++) {
        circles[i] = Object.create(Circle);
        circles[i].c = color(random(255), random(255), random(255));
        circles[i].d = random(25) + 100;
        circles[i].x = random(WIDTH);
        circles[i].y = random(HEIGHT);
        circles[i].id= color(random(255) | 0, random(255) | 0, random(255) | 0);
        circles[i].name = links[i].name;
        circles[i].href = links[i].url;
    }
    drawPickBuffer();

}

function draw() {
    clear();
    noStroke();
    for (i = 0; i < NUM_CIRCLES; i++) {
        circles[i].render();
    }

}

// deprecated
// function windowResized() {
//     WIDTH = windowWidth;
//     HEIGHT = windowHeight;
//     resizeCanvas(WIDTH, HEIGHT);
//     redraw();
// }

function mouseMoved() {
    // for (i = 0; i < NUM_CIRCLES; i++) { 
    //     if (circles[i].isect() == true) {
    //         circles[i].selected = true;
    //     } else {
    //         circles[i].selected = false;
    //     }
    // }
    redraw();

}

function drawPickBuffer() {
    for (i = 0; i < NUM_CIRCLES; i++) { 
        if (circles[i].selected == true) {
            circles[i].renderSelected();
        } else {
            circles[i].renderIsect();
        }
    }
}