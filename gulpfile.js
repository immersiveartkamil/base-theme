var gulp = require("gulp");
var log = require("fancy-log");
var c = require("ansi-colors");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const cleanCss = require("gulp-clean-css");
var browserSync = require("browser-sync").create();

log(c.green("Starting Gulp! Please wait..."));

gulp.task("browser:sync", () => {
  browserSync.init({
    proxy: "http://webcraft-design-nowa-strona.local/",
    injectChanges: true,
  });
});

gulp.task("compile-scss", () => {
  return gulp
    .src("src/scss/**/main.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

gulp.task("build-css", () => {
  return gulp
    .src("dist/css/**/*main.css")
    .pipe(concat("main.min.css"))
    .pipe(cleanCss())
    .pipe(gulp.dest("dist/build"));
});

gulp.task("watch", () => {
  gulp.watch("src/scss/**/*.scss", gulp.series("compile-scss"));
  gulp.watch("dist/css/**/*.css", gulp.series("build-css"));
  gulp.watch("./**/*.php").on("change", browserSync.reload);
  gulp.watch("dist/build/main.min.css").on("change", browserSync.reload);
});

gulp.task(
  "default",
  gulp.parallel("compile-scss", "build-css", "browser:sync", "watch")
);
