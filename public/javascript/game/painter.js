function Painter(context) {

  var find_image = function(id) {
    return document.getElementById(id);
  };

  this.images = {
    tank: find_image("img_tank"),
    invader: find_image("img_invader"),
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

  this.drawMessageBar = function(seconds, score) {
    context.fillStyle="white";
    context.font = "30px Verdana";
    context.fillText("Time: " + seconds + ", Score: " + score, 5, context.canvas.height - 5);
  };

  return this;
}
