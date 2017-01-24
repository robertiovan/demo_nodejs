let gulp = require('gulp');
let gulpMocha = require('gulp-mocha');
let env = require('gulp-env');

gulp.task('test',function(){
    //Set environment variable from gulp
    env({vars:{ENV:'Testing'}});
    gulp.src('./src/server/controllers/**/*spec.js',{read:false})
       .pipe(gulpMocha({reporter:'nyan'}));
});
