public class Edge {
  
  Node nodeOne, nodeTwo;
  float defaultLength;
  
  Edge(Node nodeOne, Node nodeTwo, float defaultLength) {
    this.nodeOne = nodeOne;
    this.nodeTwo = nodeTwo;
    this.defaultLength = defaultLength;
  }
  
  void applyHookeForces(float springConstant) {
    PVector spring = new PVector(this.nodeTwo.x - this.nodeOne.x, this.nodeTwo.y - this.nodeOne.y);
    float force = springConstant * (spring.mag() - this.defaultLength);
    PVector nodeOneForce = new PVector(this.nodeTwo.x - this.nodeOne.x, this.nodeTwo.y - this.nodeOne.y);
    nodeOneForce.normalize();
    nodeOneForce.mult(force);
    PVector nodeTwoForce = new PVector(this.nodeTwo.x - this.nodeOne.x, this.nodeTwo.y - this.nodeOne.y);
    nodeTwoForce.normalize();
    nodeTwoForce.mult(force);
    nodeTwoForce.rotate(PI);
    
    this.nodeOne.applyForce(nodeOneForce);
    this.nodeTwo.applyForce(nodeTwoForce);
  }
  
  void render(float x, float y, float scale) {
    fill(0);
    line(x + (scale * this.nodeOne.x), y + (scale * this.nodeOne.y), x + (scale * this.nodeTwo.x), y + (scale * this.nodeTwo.y));
  }
}