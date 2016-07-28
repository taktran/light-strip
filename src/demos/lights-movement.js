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
const pixel = require('node-pixel');
const five = require('johnny-five');
const Tweenable = require('shifty');
const _ = require('lodash');

const board = new five.Board();

board.on('ready', function () {
  const options = {
    pin: 6,
    length: 10,
    board: this,
    controller: 'FIRMATA'
  };
  const strip = new pixel.Strip(options);
  const tweenable = new Tweenable();
  function off () {
    strip.off();
    strip.show();
  }
  function play () {
    const fromPosition = 0;
    const toPosition = options.length;
    const easing = 'easeOutBounce';
    const duration = 5000;
    const step = function (state) {
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
  }

  let currentIndex;
  let color = '#f3f3f3';
  function showColor () {
    if (!currentIndex) { return; }
    strip.clear();

    var pixel = strip.pixel(currentIndex);
    if (pixel) {
      pixel.color(color);
      strip.show();
    } else {
      console.log('No pixel found', strip, currentIndex);
    }
  }
  const fps = 20;
  const throttleTime = 1000 / fps;
  const throttledShowColor = _.throttle(showColor, throttleTime);

  board.repl.inject({
    strip: strip,
    showColor: showColor,
    off,
    play
  });

  strip.on('ready', function () {
    console.log('Pixels ready\n');
  });
});
