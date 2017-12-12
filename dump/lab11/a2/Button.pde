public class Button {
  int w;
  int h;
  int x;
  int y;
  String text;
  color background;
  
  public Button(int x, int y, int w, int h, color c, String text) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.text = text;
    this.background = c;
  }
  
  public void setLabel(String l) {
    text = l;
  }
  
  public void setWidth(int w) {
    this.w = w;
  }
  
  public void setHeight(int h) {
    this.h = h;
  }
  
  boolean mouseOver(){
    if (mouseX > x && mouseX < (x + w) && mouseY > y && mouseY < (y + h)) {
          return true;
        } else {
          return false;
        }
  }
  
  void render() {
    if (this.mouseOver()) {
      fill(150);
    } else {
      fill(this.background);
    }
    rect(x, y, w, h);
    fill(0);
    textSize(14);
    textLeading(12);
    textAlign(CENTER, CENTER);
    text(text, x, y, w, h-5);
  }
}