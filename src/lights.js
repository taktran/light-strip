var pixel = require('node-pixel');
var five = require('johnny-five');

var board = new five.Board();

board.on('ready', function () {
  var strip = new pixel.Strip({
    data: 6,
    length: 30, // Doesn't seem to do anything
    board: this,
    controller: 'FIRMATA'
  });

  function showColor (color) {
    strip.color(color);
    strip.show();
  }

  board.repl.inject({
    strip: strip,
    showColor: showColor
  });

  strip.on('ready', function () {
    console.log('Pixels ready\n');

    showColor('#111111');
  });
});
