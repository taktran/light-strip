pixel = require("node-pixel");
five = require("johnny-five");

var board = new five.Board();

board.on("ready", function () {
  var strip = new pixel.Strip({
    data: 6,
    length: 10,
    board: this,
    controller: "FIRMATA",
  });

  strip.on("ready", function () {
    
  });
});