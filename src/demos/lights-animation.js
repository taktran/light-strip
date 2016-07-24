/**
 * Demo of the neo pixel lights animation
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
var Tweenable = require('shifty');
var _ = require('lodash');

var board = new five.Board();

board.on('ready', function () {
  var options = {
    pin: 6,
    length: 50,
    board: this,
    controller: 'FIRMATA'
  };
  var strip = new pixel.Strip(options);
  var tweenable = new Tweenable();

  var currentColor;
  function showColor () {
    if (!currentColor) { return; }

    _.each(_.range(options.length), function (index) {
      strip.pixel(index).color(currentColor);
    });
    strip.show();
  }
  var fps = 20;
  var throttleTime = 1000 / fps;
  var throttledShowColor = _.throttle(showColor, throttleTime);

  board.repl.inject({
    strip: strip,
    showColor: showColor
  });

  strip.on('ready', function () {
    console.log('Pixels ready\n');
    var fromColor = '#41ff88';
    var toColor = '#f0f';
    var easing = 'easeOutQuart';
    var duration = 5000;
    var step = function (state) {
      currentColor = state.color;
      throttledShowColor();
    };

    tweenable.tween({
      from: { color: fromColor },
      to: { color: toColor },
      duration,
      easing,
      step
    });

    strip.show();
  });
});
