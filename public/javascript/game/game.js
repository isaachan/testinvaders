function Game(painter, things, swarm) {
  var _this = new atom.Game();

  _this.draw = function() {
    painter.clear();
    things.forEach(function(thing) {
      if(thing.active) {
        painter.draw(thing);
      }
    });
  };

  _this.update = function(dt) {
    things.forEach(function(thing) {
      thing.update(dt, atom.input);
    });

    this.check_for_collisions();
    if (!swarm.active) _this.stop();
  };

  _this.check_for_collisions = function() {
    things.forEach(function(thing) {
      things.forEach(function(other_thing) {
        if(thing.active && other_thing.active) {
          if(thing.box.is_colliding_with(other_thing.box)) {
            thing.collide(other_thing);
            other_thing.collide(thing);
          }
        }
      });
    });
  };

  _this.stopTimer = function() {
      clearTimeout(timer);    
  };

  _this.seconds = 0;
  var timer;
  startTimer = function() {
    _this.seconds += 1;
    painter.drawTimer(_this.seconds);
    timer = setTimeout("startTimer()", 1000);
  };

  startTimer();
  return _this;
}
