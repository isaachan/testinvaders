describe("Invader", function() {
  var x, y;
  var velocity = 50;
  var invader;

  beforeEach(function() {
    x = Math.random();
    y = Math.random();

    invader = new Invader(x, y);
  });

  describe("when it is involved in a collision", function() {
    var bullet_velocity;
    beforeEach(function() {
      bullet_velocity = 100;
    });

    it("should die if the collision is with a bullet from the tank", function() {
      var tank_bullet = new Bullet();
      tank_bullet.shoot(bullet_velocity, x, y);

      invader.collide(tank_bullet);

      expect(invader.active).toBeFalsy();
    });

    it("should not die if the collision is with a with bullet from an invader", function() {
      var invader_bullet = new InvaderBullet();
      invader_bullet.shoot(bullet_velocity, x, y);

      invader.collide(invader_bullet);

      expect(invader.active).toBeTruthy();
    });
  });

});
