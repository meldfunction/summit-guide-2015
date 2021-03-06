var bourbon = require("node-bourbon"),
    bower = require("bower"),
    coffee = require("gulp-coffee"),
    concat = require("gulp-concat"),
    gulp = require("gulp"),
    gutil = require("gulp-util"),
    haml = require("gulp-haml"),
    neat = require("node-neat"),
    rename = require("gulp-rename"),
    sass = require("gulp-sass"),
    sh = require("shelljs");

var paths = {
  assets: "www/assets/",
  build: "www/",
  coffee: ["./source/assets/javascripts/**/*.coffee"],
  fonts: ["./source/assets/fonts/*"],
  haml: ["./source/**/*.haml"],
  images: ["./source/assets/images/**/*"],
  lib: ["./lib/**/*"],
  sass: ["./source/assets/stylesheets/**/*.scss"]
};

gulp.task("sass", function(done) {
  gulp.src(paths.sass)
    .pipe(sass({
      includePaths: bourbon.includePaths,
      includePaths: neat.includePaths
    }))
    .pipe(gulp.dest(paths.assets))
    .on("end", done);
});

gulp.task("coffeescript", function() {
  return gulp.src(paths.coffee)
    .pipe(coffee())
    .pipe(concat("application.js"))
    .pipe(gulp.dest(paths.assets));
});

coffeeStream = coffee({bare: true});
coffeeStream.on('error', function(err) {});

gulp.task("haml", function() {
  return gulp.src(paths.haml, ["./source/index.haml"])
    .pipe(haml())
    .pipe(gulp.dest(paths.build));
});

gulp.task("images", function() {
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.assets));
});

gulp.task("fonts", function() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.assets));
});

gulp.task("lib", function() {
  return gulp.src(paths.lib, {
      base: "."
    })
    .pipe(gulp.dest(paths.build));
});

gulp.task("watch", function() {
  gulp.watch(paths.sass, ["sass"]);
  gulp.watch(paths.coffee, ["coffeescript"]);
  gulp.watch(paths.fonts, ["fonts"]);
  gulp.watch(paths.haml, ["haml"]);
  gulp.watch(paths.images, ["images"]);
  gulp.watch(paths.lib, ["lib"]);
});

gulp.task("install", function() {
  return bower.commands.install()
    .on("log", function(data) {
      gutil.log("bower", gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task("default", ["sass", "coffeescript", "fonts", "haml", "images", "lib"]);
