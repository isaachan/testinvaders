function Swarm(invaders, zone_width) {
    var invader_width = invaders[0].box.width;
    var left = -1, right = 1;

    this.name = "Swarm";
    this.direction = right;
    this.box = new BoundingBox(0, 0, 0, 0);
    this.active = true;

    var min = function (array) {
        return Math.min.apply(Math, array);
    };

    var max = function (array) {
        return Math.max.apply(Math, array);
    };

    var collect_invader_x_positions = function () {
        return invaders.filter(function (invader) {
            return invader.active;
        }).map(function (invader) {
                return invader.box.x;
            });
    };

    var collect_invader_y_positions = function () {
        return invaders.filter(function (invader) {
            return invader.active;
        }).map(function (invader) {
                return invader.box.y;
            });
    };

    this.update = function () {
        var max_y = max(collect_invader_y_positions());
        if (max_y + 50 > 500) {
            this.invadeSuccessfully();
            return;
        }

        var min_x = min(collect_invader_x_positions());
        var max_x = max(collect_invader_x_positions()) + invader_width;

        if (((this.direction == right) && (max_x >= zone_width)) ||
            ((this.direction == left) && (min_x <= 0))) {

            for (var i = 0; i < invaders.length; i++) {
                invaders[i].invade();
            }

            this.direction = this.direction == right ? left : right;
        }

    };

    this._updateActive = function() {
        return (invaders.filter(function (invader) {
            return invader.active;
        }).length > 0);
    };

    this.collide = function () {
    };

    this.invadeSuccessfully = function() {
//        window._game.lost();
    };

    return this;
}
