function Tank(bullet) {
    var width = 66;
    var height = 42;
    var initial_y = 500;
    var initial_x = 450 - width / 2;

    this.team = Team.Earth;
    this.box = new BoundingBox(initial_x, initial_y, width, height);
    this.active = true;
    this.image = "tank";

    this.collide = function () {
        // TODO: Implement tank collisions or else
        // the tank is invincible... that might be fun.
    };

    this.update = function (delta_time, input) {
        if (input.pressed("shoot")) {
            if (!bullet.active) {
                bullet.shoot(-200, input.mouse.x, this.box.y);
            }
        }
    };

    return this;
}
