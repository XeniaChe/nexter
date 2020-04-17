const gulp = require('gulp');
const {series, parallel } = require('gulp');
const sass = require('gulp-sass');
// const clean = require('gulp-clean-css');
// const imagemin = require('gulp-imagemin');
const minifycss = require('gulp-minify-css');
// const newer = require('gulp-newer');
// const notify = require('gulp-notify');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');

//development mode
devBuild = (process.env.NODE_ENV !=='production'),

//folders 
src = 'src/',
build = 'build/'
;
const browser = ["google chrome", "firefox"];

// compile sass to css Gulp_4
function style() {
   
    return gulp.src('src/scss/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(src + 'css/'))
    .pipe(browserSync.stream(browser))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(autoprefixer())
    .pipe(gulp.dest(src + 'css/'))
    // .pipe(notify({message: 'Style task complete'}))
    ;
}
// .pipe(postcss([ autoprefixer(), cssnano() ]))
exports.style = style;

//watch task
function watchTask() {
    browserSync.init({
        server: {
            baseDir: '.'
        }
    });
    // gulp.watch('src/scss/**/*.scss', style);
    gulp.watch('src/scss/**/*.scss', style).on('change',browserSync.reload);
    gulp.watch('*.html'). on('change',browserSync.reload);
    gulp.watch('src/js/**/*.js'). on('change',browserSync.reload);
}
exports.watch = watchTask;


// function images(){
//     // const out = build + 'images/';
//     return gulp.src(src + 'images/**/*')
//     .pipe(newer(build))
//     // .pipe(newer(out))
//     .pipe(imagemin({optimizationlevel: 5 }))
//     .pipe(gulp.dest(build + 'imagesMIN'));
//     // .pipe(gulp.dest(out));
// };
// exports.images = images;


// exports.autoprefixer = () => (
//     gulp.src('src/app.css')
//         .pipe(autoprefixer({
//             cascade: false
//         }))
//         .pipe(gulp.dest('dist'))
// );




exports.default = series( parallel( exports.watch, exports.style ));