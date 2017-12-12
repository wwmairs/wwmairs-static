public class Node {
  
  private float mass, x, y;
  private PVector velocity, acceleration, force;
  private boolean dragging = false;
  PVector coulombForce = new PVector();
  
  Node(float mass) {
    this.mass = mass; 
    this.force = new PVector();
    this.velocity = new PVector();
  }
  void incrementMass() {
    this.mass += .1;
  }
  void applyForce(PVector appliedForce) {
    this.force.add(appliedForce);
  }
  
  float radius() {
    return sqrt((this.mass * 500 / PI));
  }
  
  public void applyCoulombForce(Node otherNode, float coulombConstant) {
    PVector r = new PVector(otherNode.x - this.x, otherNode.y - this.y);
    
    if (r.mag() != 0) {
      float force = coulombConstant * ((this.mass * otherNode.mass) / r.magSq());
      fill(0);
      otherNode.applyForce(r.copy().normalize().mult(force));
      this.applyForce(r.copy().normalize().rotate(PI).mult(force));
      this.coulombForce.add(r.copy().normalize().rotate(PI).mult(force));
      otherNode.coulombForce.add(r.copy().normalize().mult(force));
    }
  }
  
  float scaleCoord(float coord, float start, float scale) {
    return start + (scale * coord);
  }
  
  float unscaleCoord(float coord, float start, float scale) {
    return (coord - start) / scale;
  }
  
  void render(float x, float y, float scale) {
    fill(0);
    float renderX = this.scaleCoord(this.x, x, scale);
    float renderY = this.scaleCoord(this.y, y, scale);
    fill(30, 99, 144);
    if (this.hover(x, y, scale)) {
      fill(255, 204, 0);
    }
    ellipse(renderX, renderY, (scale * this.radius() * 2), (scale * this.radius() * 2));
    fill(0);
    strokeWeight(2);
    stroke(80, 44, 230);
    //line(renderX, renderY, renderX + (scale * this.coulombForce.x), renderY + (scale * this.coulombForce.y));
    strokeWeight(1);
    stroke(0);
    
    this.coulombForce = new PVector();
  }

  // t is the time step
  void updatePosition(float time, float dampingConstant) {
    PVector acceleration = this.force.div(this.mass);
    
    
    this.velocity.add(acceleration.mult(time));
    //println("Velocity: ", this.velocity.mag());
    this.velocity.sub(this.velocity.copy().mult(dampingConstant));
    this.x += this.velocity.x * time;
    this.y += this.velocity.y * time;
    this.force.setMag(0);
  }
  
  void resetVelocity() {
    this.velocity = new PVector(); 
  }
  
  void setPosition(float x, float y) {
    this.x = x;
    this.y = y;
  }
  
  void startDrag(float x, float y, float scale) {
    if (this.hover(x, y, scale)) {
      this.dragging = true;
    }
  }
  
  void drag(float x, float y, float scale) {
    if (this.dragging) {
      this.setPosition(this.unscaleCoord(mouseX, x, scale), this.unscaleCoord(mouseY, y, scale));
    }
  }
  
  void stopDrag() {
    this.dragging = false; 
  }
  
  boolean hover(float x, float y, float scale){
    
    return (dist(this.unscaleCoord(mouseX, x, scale), this.unscaleCoord(mouseY, y, scale), this.x, this.y) <= this.radius());
  } 
  
  float kineticEnergy() {
    return 0.5 * this.mass * (this.velocity.magSq());
  }
  
}