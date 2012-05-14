function Game(painter, things) {
  var _this = new atom.Game();

  _this.draw = function() {
    things.forEach(function(thing) {
      thing.draw(painter);
    });
  };

  _this.update = function(dt) {
    things.forEach(function(thing) {
      thing.update(dt);
    });
  };

  return _this;
}