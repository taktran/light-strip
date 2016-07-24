/**
 * Demo of the neo pixel lights on a raspberry pi
 *
 * Set up:
 *
 *    * Upload arduino with [node-pixel backpack](https://github.com/ajfisher/node-pixel/tree/master/firmware/build/backpack)
 *    * Wire up
 *
 *        arduino A4 -> rpi SDA
 *        arduino A5 -> rpi SCL
 *        arduino RX1 -> LED Din
 *        arduino GND -> rpi GND -> LED GND -> 5V mains -ve
 *        rpi 5V -> arduino VCC -> LED 5V-> 5V mains +ve
 *
 *    * Run this script on a rasbperry pi
 *
 * Based on https://github.com/ajfisher/node-pixel/blob/master/examples/johnnyfive-i2c.js
 */
var five = require('johnny-five');
var pixel = require('node-pixel');
var raspi = require("raspi-io");

var opts = {};
opts.port = process.argv[2] || '';
opts.io = new raspi();

var board = new five.Board(opts);
var strip = null;

var fps = 20; // how many frames per second do you want to try?

board.on('ready', function () {
  console.log('Board ready, lets add light');

  strip = new pixel.Strip({
    color_order: pixel.COLOR_ORDER.GRB,
    board: this,
    controller: 'I2CBACKPACK',
    strips: [8]
  });

  strip.on('ready', function () {
    console.log('Strip ready, let\'s go');

    var colors = ['red', 'green', 'blue', 'yellow', 'cyan', 'magenta', 'white'];
    var current_colors = [0, 1, 2, 3, 4];
    var current_pos = [0, 1, 2, 3, 4];
    setInterval(function () {
      strip.color('#000'); // blanks it out

      for (var i = 0; i < current_pos.length; i++) {
        if (++current_pos[i] >= strip.stripLength()) {
          current_pos[i] = 0;
          if (++current_colors[i] >= colors.length) current_colors[i] = 0;
        }
        strip.pixel(current_pos[i]).color(colors[current_colors[i]]);
      }

      strip.show();
    }, 1000 / fps);
  });
});
