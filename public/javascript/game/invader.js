function Invader(initial_x, initial_y, bullet) {
    var width = 66;
    var height = 48;

    this.team = Team.Invaders;
    this.velocity = 50;
    this.box = new BoundingBox(initial_x, initial_y, width, height);
    this.active = true;
    this.image = "invader";
    this.hitpoint = 1;

    this.collideFromEarth = function() {
        this.hitpoint--;

        if (this.hitpoint <= 0) {
            this.active = false;
            this.die();
        } else {
            this.updateImage();
        }
    };

    /**
     *  For diffrent type of invader.
     *
     *
     this.image = "invader2_3";
     this.hitpoint = 3;
     this.number_of_seconds_between_shots = 20;
     */

    this.collide = function (other_thing) {

    };

    this.updateImage = function () {
        if (this.image == "invader") {
            return;
        }

        this.image = "invader2_" + this.hitpoint;
    };

    var number_of_seconds_between_shots = 100;
    var shoot_countdown = Math.random() * number_of_seconds_between_shots;
    var its_time_to_shoot = function () {
        return shoot_countdown <= 0;
    };

    this.update = function (delta_time) {
        if (this.active) {
            shoot_countdown -= delta_time;

            // Shooting
            if (its_time_to_shoot()) {
                bullet.shoot(50, this.box.x + (width / 2), this.box.y + (height / 2));
                shoot_countdown = number_of_seconds_between_shots;
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
