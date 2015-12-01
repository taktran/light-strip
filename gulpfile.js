const argv = require('minimist')(process.argv.slice(2));

const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const streamify = require('gulp-streamify');
const source = require('vinyl-source-stream');
const semistandard = require('gulp-semistandard');

const budo = require('budo');
const browserify = require('browserify');
const resetCSS = require('node-reset-scss').includePath;
const babelify = require('babelify').configure({
  'presets': ['es2015'],
  'plugins': [
    [
      'transform-react-jsx', {
        'pragma': 'Yolk.h'
      }
    ]
  ]
});

const entry = './src/index.js';
const outfile = 'bundle.js';

const lintFiles = [
  'gulpfile.js',
  './src/**/*.js'
];

gulp.task('lint', function () {
  return gulp.src(lintFiles)
    .pipe(semistandard())
    .pipe(semistandard.reporter('default', {
      breakOnError: false,
      breakOnWarning: false
    }));
});

// our CSS pre-processor
gulp.task('sass', function () {
  gulp.src('./src/sass/main.scss')
    .pipe(sass({
      outputStyle: argv.production ? 'compressed' : undefined,
      includePaths: [ resetCSS ]
    }).on('error', sass.logError))
    .pipe(gulp.dest('./app'));
});

// the development task
gulp.task('watch', ['sass', 'lint'], function (cb) {
  gulp.watch('src/sass/*.scss', [ 'sass' ]);
  gulp.watch(lintFiles, [ 'lint' ]);

  // dev server
  budo(entry, {
    serve: 'bundle.js', // end point for our <script> tag
    stream: process.stdout, // pretty-print requests
    live: true, // live reload & CSS injection
    dir: 'app', // directory to serve
    open: argv.open, // whether to open the browser
    browserify: {
      transform: babelify // browserify transforms
    }
  }).on('exit', cb);
});

// the distribution bundle task
gulp.task('bundle', ['sass'], function () {
  var bundler = browserify(entry, { transform: babelify })
    .bundle();
  return bundler
    .pipe(source('index.js'))
    .pipe(streamify(uglify()))
    .pipe(rename(outfile))
    .pipe(gulp.dest('./app'));
});
