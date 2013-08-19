function TankDriver(tankBox) {
    var shiftDistance = 20;
    var me = this;
    me.tankBox = tankBox;

    me.shiftLeft = function() {
        me.tankBox.x -= shiftDistance;
    };

    me.shiftRight = function() {
        me.tankBox.x += shiftDistance;
    };

    me.shoot = function(bullet) {
        if (!bullet.active) {
            bullet.shoot(-200, tankBox.x + tankBox.width / 2, tankBox.y);
        }
    };
}

function Tank(bullet) {
    var width = 66;
    var height = 42;
    var initial_y = 500;
    var initial_x = 450 - width / 2;

    this.team = Team.Earth;
    this.box = new BoundingBox(initial_x, initial_y, width, height);
    this.active = true;
    this.image = "tank";

    this.collide = function (unknownObject) {
        if (unknownObject == bullet) {
            return;
        }

        this.die();
    };

    this.output = true;

    var driver = new TankDriver(this.box);
    this.update = function (delta_time, input) {
        if (input.pressed("shift_left")) {
            driver.shiftLeft();
        } else if (input.pressed("shift_right")) {
            driver.shiftRight();
        } else if (input.pressed("shoot")) {
            driver.shoot(bullet);
        }
    };

    this.die = function() {
        // You died, and game over
//        window._game.lost();
    };

    return this;
}
