function Painter(context) {

  var find_image = function(id) {
    return document.getElementById(id);
  };

  this.images = {
    tank: find_image("img_tank"),
    invader: find_image("img_invader"),
    invader2_1: find_image("img_invader2_1"),
    invader2_2: find_image("img_invader2_2"),
    invader2_3: find_image("img_invader2_3"),
    tank_bullet: find_image("img_tank_bullet"),
    invader_bullet: find_image("img_invader_bullet")
  };

  this.draw = function(thing) {
    if(thing.image) {
      context.drawImage(this.images[thing.image], thing.box.x, thing.box.y);
    }
  };

  this.clear = function() {
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  };

  this.drawMessageBar = function(seconds, score, totalscore, highestscore) {
    this.fillText("Time: " + seconds + ", Score: " + score + ", TotalScore: " + totalscore + ", HighestScore: " + highestscore, 5, context.canvas.height - 5);
  };

  this.fillText = function(text, x, y) {
      context.fillStyle="white";
      context.font = "24px Verdana";
      context.fillText(text, x, y);
  }

  return this;
}
