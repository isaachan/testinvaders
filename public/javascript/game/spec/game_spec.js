// Test helper for the Atom microframework
var atom = {};

atom.Game = function() {
  return {};
};

atom.input = {
  mouse: {
    x: Math.random(),
    y: Math.random()
  }
};

// Our spec!
describe("Given a Game", function() {
  var game, painter, thing, collision;

  beforeEach(function() {
    painter = {
      clear: jasmine.createSpy('painter.clear'),
      draw: jasmine.createSpy('painter.draw'),
      drawTimer: jasmine.createSpy('painter.drawTimer')
    };

    thing = {
      update: jasmine.createSpy('update'),
      collide: jasmine.createSpy('collide'),
      box: {is_colliding_with: jasmine.createSpy('box_is_colliding_with') },
      active: true
    };

    other_thing = {
      update: jasmine.createSpy('update'),
      collide: jasmine.createSpy('collide'),
      box: {is_colliding_with: jasmine.createSpy('box_is_colliding_with') },
      active: true
    };

      game = new Game(painter, [thing, other_thing], {active: true});
  });

  describe("when checking for collisions", function() {
    it("should check that everything that is active is colliding with everything else that is active", function () {
      game = new Game(painter, [thing, other_thing]);
      game.check_for_collisions();

      expect(thing.box.is_colliding_with).toHaveBeenCalledWith(other_thing.box);
      expect(other_thing.box.is_colliding_with).toHaveBeenCalledWith(thing.box);
    });

    it("should not check inactive things to see if they are colliding with anything", function() {
      inactive_thing = {active: false, box: {is_colliding_with: jasmine.createSpy('inactive_thing_is_colliding_with')}};
      game = new Game(painter, [thing, other_thing, inactive_thing]);
      game.check_for_collisions();

      expect(inactive_thing.box.is_colliding_with).not.toHaveBeenCalled();

      expect(thing.box.is_colliding_with).not.toHaveBeenCalledWith(inactive_thing.box);
      expect(other_thing.box.is_colliding_with).not.toHaveBeenCalledWith(inactive_thing.box);
    });

    it("should call collide on both things if they collide", function() {
      thing.box.is_colliding_with.andReturn(true);

      game.check_for_collisions();

      expect(thing.collide).toHaveBeenCalledWith(other_thing);
      expect(other_thing.collide).toHaveBeenCalledWith(thing);
    });

    it("shouldn't call collide if things aren't colliding", function() {
      game.check_for_collisions();

      expect(thing.collide).not.toHaveBeenCalledWith(other_thing);
      expect(other_thing.collide).not.toHaveBeenCalledWith(thing);
    });
  });

  describe("when it is drawing", function() {
    it("then it should clear the canvas", function() {
      game.draw();
      expect(painter.clear).toHaveBeenCalled();
    });

    it("then ALL THE THINGS should be drawn", function() {
      game.draw();
      expect(painter.draw).toHaveBeenCalledWith(thing);
      expect(painter.draw).toHaveBeenCalledWith(other_thing);
    });
    describe("when a thing is not active", function() {

      it("then the thing should not be drawn", function() {
        var inactive_thing = { active: false };
        game = new Game(painter, [inactive_thing]);
        game.draw();

        expect(painter.draw).not.toHaveBeenCalledWith(thing);
      });
    });
  });

  describe("when it is updating", function() {
    it("then ALL THE THINGS should be updated", function() {
      var dt = Math.random();
      game.update(dt);

      expect(thing.update).toHaveBeenCalledWith(dt, atom.input);
      expect(other_thing.update).toHaveBeenCalledWith(dt, atom.input);
    });

    it("then ALL THE THINGS should check for collisions", function() {
      spyOn(game, 'check_for_collisions');
      game.update();

      expect(game.check_for_collisions).toHaveBeenCalled();
    });
  });
});
