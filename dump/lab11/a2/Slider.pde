public class Slider {
  private int buttonDiameter = 23;
  private float percentage, x1, y1, x2, y2, buttonX, buttonY;
  private float lower, upper;
  private boolean dragging;
  private String title = null;
  
  Slider() {
   this(0); 
  }
  
  Slider(float percentage) {
    this(percentage, 0, 1);
  }
  
  Slider(float value, float lower, float upper) {
    this(value, lower, upper, null);
  }
  
  Slider(float value, float lower, float upper, String title) {
    this.dragging = false;
    this.x1 = 0;
    this.x2 = 0;
    this.y1 = 0;
    this.y2 = 0;
    this.lower = lower;
    this.upper = upper;
    this.setValue(value);
    this.title = title;
    this.calculateButtonPosition();
  }
  
  public void setTitle(String title) {
     this.title = title;
  }
  
  public float getPercentage() {
    return this.percentage; 
  }
  
  public void setPercentage(float percentage) {
    this.percentage = percentage;
  }
  
  public float getInversePercentage() {
    return 1-this.percentage;
  }
  
  public float getValue() {
    return this.lower + ((this.upper -  this.lower) * this.percentage);
  }
  
  public void setValue(float value) {
    if (value > this.upper) {
      value = this.upper; 
    }
    
    if (value < this.lower) {
      value = this.lower;
    }
    
    this.percentage = (value - this.lower) / (this.upper - this.lower);
  }
  
  
  public boolean startDrag() {
    if(this.mouseOver()) {
      this.dragging = true;
    }
    return this.dragging;
  }
  
  public boolean drag() {
    if(this.dragging) {
       this.percentage = (mouseX - this.x1) / (this.x2 - this.x1);
       if (this.percentage > 1) {
         this.percentage = 1;
       }
       if (this.percentage < 0) {
         this.percentage = 0; 
       }
       
       this.calculateButtonPosition();
    }
    
    return this.dragging;
  }
  
  public boolean stopDrag() {
    if (this.dragging) {
      this.dragging = false; 
      return true;
    }
    
    return false;
  }
  
  boolean mouseOver(){
    float radius = sqrt(pow((mouseX - this.buttonX), 2) + pow((mouseY - this.buttonY), 2));
    return radius <= (this.buttonDiameter/2);
  }
  
  private void calculateButtonPosition() {
    this.buttonX = x1 + ((x2-x1) * percentage);
    this.buttonY = y1 + ((y2-y1) * percentage);
  }
  
  public void render(float x1, float y1, float x2, float y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.calculateButtonPosition();
    
    fill(0);
    strokeWeight(3);
    line(x1, y1, x2, y2);
    
    fill(200);
    ellipse(this.buttonX, this.buttonY, this.buttonDiameter, this.buttonDiameter);
    strokeWeight(1);
    
    if (this.title != null) {
      fill(0);
      textSize(14);
      textAlign(LEFT, BOTTOM);
      rectMode(CORNERS);
      text(this.title + ": " + nfc(this.getValue(), 2), this.x1, this.y1 - (this.buttonDiameter/2) - 30, this.x2, this.y2 - (this.buttonDiameter/2) - 5);
      rectMode(CORNER);
    }

    /*
    fill(0);
    textSize(9);
    text(nf(round(this.percentage*100), 0, 0) + "%", buttonX, buttonY); 
    
    strokeWeight(1);
    */

  }
  
}