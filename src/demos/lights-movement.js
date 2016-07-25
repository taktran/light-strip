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
    length: 10,
    board: this,
    controller: 'FIRMATA'
  };
  var strip = new pixel.Strip(options);
  var tweenable = new Tweenable();
  function off () {
    strip.off();
    strip.show();
  }

  var currentIndex;
  var color = '#f3f3f3';
  function showColor () {
    if (!currentIndex) { return; }
    strip.clear();

    var pixel = strip.pixel(currentIndex);
    if (pixel) {
      pixel.color(color);
    } else {
      console.log('No pixel found', strip, currentIndex);
    }

    strip.show();
  }
  var fps = 20;
  var throttleTime = 1000 / fps;
  var throttledShowColor = _.throttle(showColor, throttleTime);

  board.repl.inject({
    strip: strip,
    showColor: showColor,
    off: off
  });

  strip.on('ready', function () {
    console.log('Pixels ready\n');
    var fromPosition = 0;
    var toPosition = 10;
    var easing = 'easeOutQuart';
    var duration = 5000;
    var step = function (state) {
      currentIndex = Math.round(state.x);
      console.log('currentIndex', currentIndex);
      throttledShowColor();
    };

    tweenable.tween({
      from: { x: fromPosition },
      to: { x: toPosition },
      duration,
      easing,
      step
    });

    strip.show();
  });
});
