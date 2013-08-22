function Game(painter) {
	var _this = new atom.Game();

	var totalscore = 0;
	var highestscore = 0;
	var currentlevel = 0;
	var things = [];
	var swarm;

	var level = [
		[
			[0, 0, 1, 1, 2, 2, 1, 1, 0, 0],
			[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 0, 0, 0, 0, 1, 1, 1]
		],
		[
			[0, 1, 1, 2, 0, 0, 2, 1, 1, 0],
			[1, 1, 1, 1, 2, 2, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 0, 0, 1, 1, 1, 1]
		],
		[
			[1, 2, 0, 2, 2, 2, 2, 0, 2, 1],
			[1, 1, 2, 1, 2, 2, 1, 2, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		],
		[
			[1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
			[1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
			[1, 1, 1, 2, 1, 1, 2, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		],
		[
			[2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
			[1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
			[1, 1, 1, 2, 2, 2, 2, 1, 1, 1],
			[1, 1, 1, 1, 2, 2, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		]
	];

	_this.initLevel = function() {
		things = [];
		seconds = 0;

		var lm = level[currentlevel];

		var bullet = new Bullet();
		var tank = new Tank(bullet);
		things.push(bullet);
		things.push(tank);

		var invaders = [];
		var column_offset = 70;
		var row_offset = 60;
		for (var row = 0; row < 5; row++) {
			for (var col = 0; col < 10; col++) {
				var type = lm[row][col];
				if (type == 0) {
					continue;
				}

				var x = col * column_offset;
				var y = row * row_offset;

				var invader_bullet = new InvaderBullet();
				var invader = new Invader(x, y, invader_bullet);

				invaders.push(invader);
				things.push(invader_bullet);
				things.push(invader);
			}
		}

		swarm = new Swarm(invaders, atom.canvas.width);
		things.push(swarm);
	}

	_this.draw = function() {
		painter.clear();

		things.forEach(function(thing) {
			if (thing.active) {
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

	_this.win = function() {
		_this.stop();
		confirm("You Win!")
	};

	_this.lost = function() {
		_this.stop();
		var answer = confirm("Game Over!\nClick OK to replay.")
		if (answer) {
			currentlevel = 0;
			_this.initLevel();
			totalscore = 0;
			_this.run();
		}
	}

	_this.addScore = function(number) {
		totalscore += number;
		if (totalscore > highestscore) {
			highestscore = totalscore;
		}
	};

	_this.highScores = function(top) {
		var key = "HIGH_SCORES";
		var highScores = localStorage.getItem(key);
		if (!highScores) {
			highScores = "0";
		}
		highScores = highScores.split(",");

		var sortedHighScores = highScores.concat(totalscore)
			.sort(function(a, b) {
			return b - a;
		})
			.slice(0, top);
		localStorage.setItem(key, sortedHighScores);
		return sortedHighScores;
	};

	_this.highestScore = function() {
		var highest = _this.highScores(1);
		console.log(highest);
		return highest[0];
	}

	_this.check_for_collisions = function() {
		things.forEach(function(thing) {
			things.forEach(function(other_thing) {
				if (thing.active && other_thing.active) {
					if (thing.box.is_colliding_with(other_thing.box)) {
						thing.collide(other_thing);
						other_thing.collide(thing);
					}
				}
			});
		});
	};

	var seconds = 0;
	var timer;
	startTimer = function() {
		seconds += 1;
		timer = setTimeout("startTimer()", 1000);
	};

	highestscore = _this.highestScore();

	return _this;
}
