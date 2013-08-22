function Invader(initial_x, initial_y, bullet, type) {
    var width = 66;
    var height = 48;

    this.team = Team.Invaders;
    this.velocity = 50;
    this.box = new BoundingBox(initial_x, initial_y, width, height);
    this.active = true;
    this.image = "invader";
    this.hitpoint = 1;
    this.number_of_seconds_between_shots = 100;

    this.collideFromEarth = function() {
        this.hitpoint--;

        if (this.hitpoint <= 0) {
            this.active = false;
            this.die();
        } else {
            this.updateImage();
        }
    };

    this.isAlien = function() {return type == 2;};

    this.enhanceAlien = function() {
        /*
        For enhance alien, there are 3 configuration available:
         this.hitpoint
            Life of the alien. The value is one of 1,2,3. (Alien would not be shown if over 3)
         this.number_of_seconds_between_shots
            Interval (in second) of every shoot. Default value is 100.
         */

        this.image = "invader2_" + this.hitpoint;
    };

    if (this.isAlien()) {
        this.enhanceAlien();
    }

    this.collide = function (other_thing) {

    };

    this.updateImage = function () {
        if (this.image == "invader") {
            return;
        }

        this.image = "invader2_" + this.hitpoint;
    };

    var shoot_countdown = Math.random() * this.number_of_seconds_between_shots;
    var its_time_to_shoot = function () {
        return shoot_countdown <= 0;
    };

    this.update = function (delta_time) {
        if (this.active) {
            shoot_countdown -= delta_time;

            // Shooting
            if (its_time_to_shoot()) {
                bullet.shoot(50, this.box.x + (width / 2), this.box.y + (height / 2));
                shoot_countdown = this.number_of_seconds_between_shots;
            }

            // Movement
            this.box.x += delta_time * this.velocity;
        }
    };

    this.invade = function () {
        this.box.y += 10;
        this.velocity = this.velocity * -1;
    };

    this.die = function() {
        window._game.addScore(5);
    };

    return this;
}
