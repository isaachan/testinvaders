function Game(painter) {
  var _this = new atom.Game();

  var score = 0;
  var totalscore = 0;
  var highestscore = 0;
  var things = [];
  var swarm;
  
  _this.initLevel = function() {
	  things = [];
	  seconds = 0;
	  score = 0;
	  
	  var bullet = new Bullet();
	  var tank = new Tank(bullet);
	  things.push(bullet);
	  things.push(tank);

	  var invaders = [];
	  var column_offset = 70;
	  var row_offset = 60;
	  for(var row = 0; row < 5; row++) {
	    for(var col = 0; col < 10; col++) {
	      var x = col * column_offset;
	      var y = row * row_offset;
      
	      var invader_bullet = new InvaderBullet();
	      var invader = new Invader(x, y, invader_bullet);
		  if (row == 0) {
			  invader.heteromorphosis();
		  }
      
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
    painter.drawMessageBar(seconds, score, totalscore, highestscore);

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
    if (!swarm.active) _this.win();
  };
 
  _this.win = function() {
    _this.stop();
	var answer = confirm ("You Win!\n" + _this.highScores(5) + "\nClick OK to continue.")
	if (answer) {
		_this.initLevel();
		_this.run();
	}
  };
  
  _this.lost = function() {
    _this.stop();
  	var answer = confirm ("Game Over!\n" + _this.highScores(5) + "\nClick OK to replay.")
  	if (answer) {
  		_this.initLevel();
		totalscore = 0;
  		_this.run();
  	}
  }

  _this.getScore = function(number) {
      score = score + number;  
	  totalscore += number;
	  if (totalscore > highestscore) {
		  highestscore = totalscore;
	  }
  };

  _this.highScores = function(top) {
    var key = "HIGH_SCORES";
    var highScores = localStorage.getItem(key);
    if (!highScores) { highScores = "0"; } 
    highScores = highScores.split(","); 
    
    var sortedHighScores = highScores
                            .concat(totalscore)
                            .sort(function(a,b) {return b - a;})
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

  var seconds = 0;
  var timer;
  startTimer = function() {
    seconds += 1;
    timer = setTimeout("startTimer()", 1000);
  };

  highestscore = _this.highestScore();
  startTimer();
  return _this;
}
