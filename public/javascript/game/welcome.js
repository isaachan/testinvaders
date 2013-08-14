/*
 *
 * As for over here,
 * it's much harder to say.
 *
 */

function Init() {
  atom.input.bind(atom.key.LEFT_ARROW, "shift_left");
  atom.input.bind(atom.key.RIGHT_ARROW, "shift_right");
  atom.input.bind(atom.key.SPACE, "shoot");

  var painter = new Painter(atom.context);

  var game = new Game(painter);
  game.initLevel();

  window._game = game;

  game.run();
}
