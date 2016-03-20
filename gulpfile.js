var gulp       = require("gulp"),
    minifyHTML = require("gulp-minify-html"),
    concat     = require("gulp-concat"),
    uglify     = require("gulp-uglify"),
    cssmin     = require("gulp-cssmin"),
    sourcemaps = require("gulp-sourcemaps"),
    mainBowerFiles = require("main-bower-files"),
    inject     = require("gulp-inject"),
    livereload = require ("gulp-livereload"),
    browserSync = require ("browser-sync");


var config = {
    paths: {
        html: {
            src:  ["src/**/*.html"],
            dest: "dist"
        },
        javascript: {
            src: ["src/js/**/*.js"],
            dest: "dist/js"
        },
        css: {
            src: ["src/css/**/*.css"],
            dest: "dist/css"
        }
    }
}

// minifyHTML
gulp.task("html", function(){
    return gulp.src(config.paths.html.src)
        .pipe(minifyHTML())
        .pipe(gulp.dest(config.paths.html.dest));
});

// minifyJS
gulp.task("scripts", function(){
    return gulp.src(config.paths.javascript.src)
        .pipe(sourcemaps.init())
        .pipe(concat("app.min.js"))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.paths.javascript.dest));
});

// minifyCSS
gulp.task("css", function(){
    return gulp.src(config.paths.css.src)
        .pipe(sourcemaps.init())
        .pipe(concat("main.min.css"))
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.paths.css.dest));
});

// browserSync
gulp.task("browser-sync", function() {
    browserSync({
        server: {
            baseDir: "./dist"
        }
    });
});


gulp.task("default", ["html", "scripts", "css", "browser-sync"], function(){
    gulp.watch(config.paths.html.src, ["html", browserSync.reload]);
    gulp.watch(config.paths.javascript.src, ["scripts", browserSync.reload]);
    gulp.watch(config.paths.css.src, ["css"]);
});
