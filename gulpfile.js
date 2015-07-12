var path = {
    src: 'app/',
    dest: 'dist/',
    styles: {
        src: 'app/assets/scss',
        files: 'app/assets/scss/**/*.scss',
        dest: 'dist/assets/css',
        entryPointFilename: 'main.scss',
        outputFilename: 'styles.min.css',
        includes: [
            'app/assets/scss',
            'node_modules/bootstrap-sass/assets/stylesheets'
        ]
    },
    scripts: {
        src: 'app/assets/js',
        files: 'app/assets/js/**/*.js',
        dest: 'dist/assets/js',
        entryPointFilename: 'index.js',
        outputFilename: 'scripts.min.js',
    },
    fonts: {
        src: 'app/assets/font',
        files: 'app/assets/font/**/*',
        dest: 'dist/assets/font'
    },
    images: {
        src: 'app/assets/img',
        files: 'app/assets/img/**/*',
        dest: 'dist/assets/img'
    }
};

// vendor prefixes
var autoPrefixBrowserList = ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'];

// load all of our dependencies
var gulp            = require('gulp');
var concat          = require('gulp-concat');
var sass            = require('gulp-sass');
var sourcemaps      = require('gulp-sourcemaps');
var minifyCSS       = require('gulp-minify-css');
var browserSync     = require('browser-sync');
var autoprefixer    = require('gulp-autoprefixer');
var gulpSequence    = require('gulp-sequence').use(gulp);
var shell           = require('gulp-shell');
var del             = require('del');

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: "dist/"
        },
        options: {
            reloadDelay: 250
        },
        notify: false
    });
});

gulp.task('html', function() {
    return gulp.src(path.src + '*') // watch all HTML files and refresh when something changes
        .pipe(gulp.dest(path.dest)) // copy to destination folder
        .pipe(browserSync.reload({stream: true})); // notify browserSync to refresh
});

gulp.task('fonts', function() {
    gulp.src(path.fonts.files) // grab fonts
        .pipe(gulp.dest(path.fonts.dest)) // copy to destination folder
        .pipe(browserSync.reload({stream: true})); // notify browserSync to refresh
});

gulp.task('images', function() {
    gulp.src(path.images.files) // grab images
        .pipe(gulp.dest(path.images.dest)) // copy to destination folder
        .pipe(browserSync.reload({stream: true})); // notify browserSync to refresh
});

gulp.task('css', function() {
    return gulp.src(path.styles.src + '/' + path.styles.entryPointFilename) // the main SCSS file, which will just be a file that imports everything
        .pipe(sourcemaps.init())
        .pipe(sass({ // convert SCSS to CSS
            errLogToConsole: true,
            sourceComments: 'map', // create sourcemap for better dev tools workflow
            outputStyle: 'compressed', // minify
            includePaths: path.styles.includes // for @import-ing within SCSS files
        }))
        .pipe(autoprefixer({ // add vendor prefixes
            browsers: autoPrefixBrowserList,
            cascade: true
        }))
        .pipe(sourcemaps.write())
        .pipe(concat(path.styles.outputFilename)) // the final filename of our combined css file
        .pipe(gulp.dest(path.styles.dest)) // copy compressed and concatenated css file to destination folder
        .pipe(browserSync.reload({stream: true})); // notify browserSync to refresh
});

gulp.task('clean', function(callback) {
    del([path.dest], callback);
});

gulp.task('deploy', gulpSequence(
    'clean',
    [
        'html',
        'fonts',
        'images',
        'css'
    ]
));

gulp.task('default', ['deploy', 'browserSync'], function() { // run the 'deploy' task, then start browserSync
    gulp.watch('app/*.html', ['html']); // watch all html files in the app/ folder and run the 'html' task when any of them changes
    gulp.watch(path.fonts.files, ['fonts']); // watch all font files and run the 'fonts' task when any of them changes
    gulp.watch(path.images.files, ['images']); // watch all image files and run the 'images' task when any of them changes
    gulp.watch(path.styles.files, ['css']); // watch all Sass files and run the 'css' task when any of them changes
});
