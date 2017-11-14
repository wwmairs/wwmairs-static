new p5();

var NUM_CIRCLES = 6;
var HOVER_CUTOFF = 50;
var BACKGROUND_INDEX = parseInt(random(100)%5);

var pickbuffer;
var circles = new Array(NUM_CIRCLES);

var vFont;

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
        fill(255);
        textAlign(CENTER);
        textFont(vFont);
        textSize(16);
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
    },
    gotoLink: function() {
        window.location.href = this.href;
    }
}




function preload(){

    vFont = loadFont('vulfface/Vulf_Mono-Light_Italic_web.ttf')

    HEIGHT = windowHeight;
    WIDTH = windowWidth;
    pickbuffer = createGraphics(WIDTH, HEIGHT);

}

function setup () {
    background(150);
    noLoop();
    // smooth();
    createCanvas(WIDTH, HEIGHT);

    for (i = 0; i < NUM_CIRCLES; i++) {
        circles[i] = Object.create(Circle);
        circles[i].c = colors[i];
        circles[i].d = random(25) + 100;
        circles[i].x = random(WIDTH - 200) + 100;
        circles[i].y = random(HEIGHT - 200) + 100;
        circles[i].id= color(random(255) | 0, random(255) | 0, random(255) | 0);
        circles[i].name = links[i].name;
        circles[i].href = links[i].url;
        for (j = (i - 1); j >= 0; j--) {
            while (abs(circles[i].x - circles[j].x) < 75) {
                circles[i].x = random(WIDTH - 200) + 100;
            }
            while (abs(circles[i].y - circles[j].y) < 75) {
                circles[i].y = random(HEIGHT - 200) + 100;
            }
        }
    }
    drawPickBuffer();

}

function draw() {
    clear();
    noStroke();
    for (i = 0; i < NUM_CIRCLES; i++) {
        circles[i].render();
    }
    textAlign(CENTER);
    textFont(vFont);
    textSize(36);
    text("William Mairs", WIDTH / 2, HEIGHT / 2);

}

function mouseClicked() {
    for (i = 0; i < NUM_CIRCLES; i++) {
        if (circles[i].isect()) {
            circles[i].gotoLink();
        }
    }

}


function windowResized() {
    WIDTH = windowWidth;
    HEIGHT = windowHeight;
    resizeCanvas(WIDTH, HEIGHT);
    redraw();
}

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