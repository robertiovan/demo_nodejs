let gulp = require('gulp');
let args = require('yargs').argv;
let $ = require('gulp-load-plugins')({lazy:true});

let config = require('./gulp.config')();

gulp.task('test',function() {
    //Set environment variable from gulp
    $.env({vars:{ENV:'Testing'}});
    $.util.log($.util.colors.blue('Log : run BDD specs with mocha'));
    gulp.src('./src/server/controllers/**/*spec.js',{read:false})
       .pipe($.mocha({reporter:'nyan'}));
});

gulp.task('check-code',function() {
    /*run  gulp --verbose check-code to hit if condition */
    $.util.log($.util.colors.blue('Log : Check javascript errors and coding styles with jshint & jscs'));
    return gulp
        .src(config.srcFiles)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose:true}))
        .pipe($.jshint.reporter('fail'));
});

/*
gulp.task('styles',function() {
    $.util.log($.util.colors.blue('Compile styles'));
    return gulp.src(config.lessStyles)
        .pipe($.less())
        .pipe($.autoprefixer({browsers:['last 2 version', '> 5%']}))
        .pipe(gulp.dest(config.temp));
});
*/
