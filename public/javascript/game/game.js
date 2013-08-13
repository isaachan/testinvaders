function Game(painter, things) {
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

  var swarm = things.filter(function(thing) { thing.name = "Swarm"; });
  if (swarm && !swarm[0].active) _this.stop();
 }

  return _this;
}
