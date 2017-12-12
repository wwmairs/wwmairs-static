FDDParser parser;
ForceDiagram diagram;
int lastFrame;
float x, y, w, h;

float springInitial = 30;
float dampingInitial = 0.1;
float coulombInitial = 100000;

Slider scaleSlider = new Slider(1, 0, 10, "Scale");
Slider springSlider = new Slider(springInitial, 0, 200, "Spring");
Slider dampingSlider = new Slider(dampingInitial, 0.05, 0.4, "Damping");
Slider coulombSlider = new Slider(coulombInitial, 0, 200000, "Coulomb");

Button upButton = new Button(65, 120, 70, 40, color(240), "Up");
Button downButton = new Button(65, 220, 70, 40, color(240), "Down");
Button leftButton = new Button(25, 170, 70, 40, color(240), "Left");
Button rightButton = new Button(105, 170, 70, 40, color(240), "Right");
Button resetNodesButton = new Button(20, 420, 75, 40, color(240), "Reset Nodes");
Button resetConstantsButton = new Button(105, 420, 75, 40, color(240), "Reset Constants");

int movementSpeed = 5;

// import processing.awt.PSurfaceAWT.SmoothCanvas;
// import javax.swing.JFrame;
// import java.awt.Dimension;

void setup() {
  size(800, 500);
  // pixelDensity(displayDensity());
  // SmoothCanvas sc = (SmoothCanvas) getSurface().getNative();
  // JFrame jf = (JFrame) sc.getFrame();
  // Dimension d = new Dimension(400, 520);
  // jf.setMinimumSize(d);
  // println(jf.getMinimumSize());
  // surface.setResizable(true);
    
  parser = new FDDParser("a2/data0.dd");
  diagram = new ForceDiagram(parser.getNodes(), parser.getEdges());
  
  layoutDiagram();
  
  diagram.setSpringConstant(springSlider.getValue());
  diagram.setCoulombConstant(coulombSlider.getValue());
  diagram.setDampingConstant(dampingSlider.getValue());
  
  lastFrame = frameCount;
}

void layoutDiagram() {
  // SET INITIAL X AND Y OF DRAWING
  x = 200;
  y = 0;
  
  // CALCULATE WIDTH AND HEIGHT
  w = width - x;
  h = height;
  
  diagram.performInitialLayout(0, 0, w, h);
}

void mouseClicked() {
  if (resetNodesButton.mouseOver()) {
    scaleSlider.setValue(1);
    diagram.setScale(1);
    diagram.resetOffset();


    layoutDiagram();
  }
  
  if (resetConstantsButton.mouseOver()) {
    coulombSlider.setValue(coulombInitial);
    springSlider.setValue(springInitial);
    dampingSlider.setValue(dampingInitial);
    diagram.setSpringConstant(springSlider.getValue());
    diagram.setCoulombConstant(coulombSlider.getValue());
    diagram.setDampingConstant(dampingSlider.getValue());
  }
}

void mousePressed() {
  scaleSlider.startDrag();
  springSlider.startDrag();
  dampingSlider.startDrag();
  coulombSlider.startDrag();
  if (mouseButton == 37) {
    diagram.startDrag();
      if (mouseX > 200) { 
        diagram.makeNode();
      }
  } else if (mouseButton == 39) {
    diagram.makeNewEdge();
  }

  println(mouseButton);
}

void mouseDragged() 
{
  if (scaleSlider.drag()) {
    diagram.setScale(scaleSlider.getValue());
  }
  if (springSlider.drag()) {
    diagram.setSpringConstant(springSlider.getValue());
  }
  if (dampingSlider.drag()) {
    diagram.setDampingConstant(dampingSlider.getValue()) ;
  }
  if (coulombSlider.drag()) {
    diagram.setCoulombConstant(coulombSlider.getValue());
  }
}


void mouseReleased() {
  if (scaleSlider.stopDrag()) {
    
  }
  springSlider.stopDrag();
  coulombSlider.stopDrag();
  dampingSlider.stopDrag();
  diagram.stopDrag();
}


void draw() {
  background(255);
    
  // Calculate the delta time using the frame difference between the last two draw periods and the frame rate
  int currFrame = frameCount;
  float time = (float)(currFrame - lastFrame) / (float)frameRate;
  lastFrame = currFrame;
  
  // Render the diagram!
  diagram.render(x, y, w, h, time);

  
  // Render the sidebar
  fill(240);
  rect(0, 0, x, height);
  
  fill(230);
  rect(0,0, x, 60);
  
  fill(0);
  textSize(18);
  textAlign(CENTER, BOTTOM);
  text("Force-Directed", 0, 0, x, 30);
  textAlign(CENTER, TOP);
  text("Node-Link Diagram", 0, 30, x, 30);
  

  

  
  scaleSlider.render(20, 100, 180, 100);
  upButton.render();
  downButton.render();
  leftButton.render();
  rightButton.render();
  resetNodesButton.render();
  resetConstantsButton.render();
  springSlider.render(20, 300, 180, 300);
  dampingSlider.render(20,350, 180, 350);
  coulombSlider.render(20, 400, 180, 400);
  
  if (mousePressed) {
    diagram.drag();
    if (upButton.mouseOver()) {
      diagram.incementOffset(0, -1 * movementSpeed); 
    }
    if (downButton.mouseOver()) {
      diagram.incementOffset(0, movementSpeed); 
    }
    if (leftButton.mouseOver()) {
      diagram.incementOffset(-1 * movementSpeed, 0); 
    }
    if (rightButton.mouseOver()) {
      diagram.incementOffset(movementSpeed, 0); 
    }
  }
  
   fill(230);
  rect(0, height-20, x, 20);
  fill(70, 90, 200);
  textSize(10);
  textAlign(CENTER, CENTER);
  text("by William Mairs and Max Greenwald", 0, height-20, x, 20);

  
}