# Light strip

[![Circle CI](https://circleci.com/gh/taktran/light-strip.svg?style=svg)](https://circleci.com/gh/taktran/light-strip)

Light playground

## Usage

Install [nvm](https://github.com/creationix/nvm), and in the root directory run:

    nvm use

Install dependencies

    npm install

### Light demos

To run the light demos

Set up lights

1. Upload [relevant firmata firmware using arduino software](https://github.com/ajfisher/node-pixel/tree/master/firmware#using-arduino-ide). See `src/demo/*.js` file for which one is required.
2. Run lights demos

        ```sh
        node src/demos/[demo-file]
        ```

Run interface

    npm start
    # Go to url from output

## Resources

* [Progress/Backlog](https://waffle.io/taktran/light-strip)

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/budo-gulp-starter/blob/master/LICENSE.md) for details.
