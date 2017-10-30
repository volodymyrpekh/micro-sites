/* ------ Gulp ------ */
var 
  gulp         = require('gulp'),
  rename       = require('gulp-rename'),
  clean        = require('gulp-clean'),
  sourcemaps   = require('gulp-sourcemaps'),
  plumber      = require('gulp-plumber'),
/* ------ Server ------ */
  browserSync  = require('browser-sync').create(),
/* ------ PostCSS ------ */
  postcss      = require('gulp-postcss'),
  precss       = require('precss'),
  autoprefixer = require('autoprefixer'),
  cssnano      = require('cssnano'),
  placehold    = require('postcss-placehold'),
  easysprite   = require('postcss-easysprites'),
  getColor     = require('postcss-get-color'),
  assets       = require('postcss-assets'),
  textStroke   = require('postcss-text-stroke'),
/* ------ Pug ------ */
  pug          = require('gulp-pug'),
/* ------ Image ------ */
  imagemin     = require('gulp-imagemin'),
  smushit      = require('gulp-smushit'),
  webp         = require('gulp-webp');

gulp.task('css', function () {
    var postcss_processors = [
      precss(),
      textStroke(),
      getColor(),
      assets(),
      placehold(),
    	autoprefixer({browsers: [
    		'Android 2.3',
        'Android >= 4',
        'Chrome >= 20',
        'Firefox >= 24',
        'Explorer >= 8',
        'iOS >= 6',
        'Opera >= 12',
        'Safari >= 6']}),
      easysprite({
        imagePath:'./src/img/sprites', 
        spritePath: './src/img'
      })
    ];
	return gulp.src('./src/pcss/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(postcss(postcss_processors))
    .pipe(rename(function (path) {path.extname = ".css"}))
    .pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./css'));
});

gulp.task('pug', function() {
  gulp.src('./src/pug/index.pug')
    .pipe(plumber())
    .pipe(pug({
      pretty: '\t',
    }))
    .pipe(gulp.dest('./'));
  gulp.src('./src/pug/event.pug')
    .pipe(plumber())
    .pipe(pug({
      pretty: '\t',
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('smushit', function () {
  gulp.src('./img/*', {read: false})
      .pipe(clean());

  gulp.src(['./src/img/**/*.{png,jpg,jpeg,gif}'])
      .pipe(imagemin())
      .pipe(smushit({
          verbose: true
      }))
      .pipe(gulp.dest('./img'));

  gulp.src('./src/img/*.{jpg,jpeg}')
      .pipe(webp({quality: 85}))
      .pipe(gulp.dest('./img'));
  setTimeout(function () {
    gulp.src(['./src/img/**/*.{ico,svg}'])
      .pipe(gulp.dest('./img'));
    }, 1000);
});


gulp.task('sync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch(['./*.html', './css/*.css', './js/*.js']).on('change', browserSync.reload);
});
 
gulp.task('watch', function () {  
  gulp.watch('./src/pcss/**/*.scss', ['css']);
  gulp.watch('./src/pug/**/*.pug', ['pug']);  
});