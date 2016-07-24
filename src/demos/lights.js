/**
 * Demo of the neo pixel lights
 *
 * Set up:
 *
 *    * Upload arduino with [node-pixel firmata](https://github.com/ajfisher/node-pixel/tree/master/firmware/build/node_pixel_firmata)
 *    * Wire up
 *
 *        arduino pin 6 -> LED Din
 *        arduino GND -> LED GND
 *        arduino 5V -> LED 5V
 *
 *    * Run this script on a rasbperry pi
 *
 * Based on https://github.com/ajfisher/node-pixel/blob/master/examples/johnnyfive-i2c.js
 */
var pixel = require('node-pixel');
var five = require('johnny-five');

var board = new five.Board();

board.on('ready', function () {
  var strip = new pixel.Strip({
    pin: 6,
    length: 192, // Maximum on FIRMATA
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

    // showColor('#111111');
    const p = strip.pixel(0);     // get second LED
    p.color('#0000FF');

    const p2 = strip.pixel(191);     // get second LED
    p2.color('#FF00FF');

    strip.show();
  });
});
