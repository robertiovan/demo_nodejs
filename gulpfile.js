let gulp = require('gulp');
let args = require('yargs').argv;
let del = require('del');
let $ = require('gulp-load-plugins')({lazy:true});

let config = require('./gulp.config')();

gulp.task('test',()=>{
    //Set environment variable from gulp
    $.env({vars:{ENV:'Testing'}});
    $.util.log($.util.colors.blue('Log : run BDD specs with mocha'));
    gulp.src('./src/server/controllers/**/*spec.js',{read:false})
       .pipe($.mocha({reporter:'nyan'}));
});

gulp.task('check-code', ()=>{
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


gulp.task('build-styles', ['clean-styles'], ()=>{
    $.util.log($.util.colors.blue('Compile styles'));
    return gulp.src(config.lessStyles)
        .pipe($.plumber())
        .pipe($.less())    
        .pipe($.autoprefixer({browsers:['last 2 version', '> 5%']}))
        .pipe(gulp.dest(config.outStyles));
});

// .on('error',function (error){
        //     $.util.log($.util.colors.blue('Compile styles error : ' + error));
        //     this.emit('end');
        // })

gulp.task('clean-styles', (done)=>{
    let files = config.outStyles + '**/*.css';
    del(files, done).then(() => done() );
    
});

gulp.task('watch-styles', ()=>{
    gulp.watch(config.lessStyles,['build-styles']);
});

gulp.task('copy-js', ()=>{
    $.util.log($.util.colors.blue('Log : Copy js files to output'));
    return gulp
        .src(config.js)
        .pipe(gulp.dest(config.outJs));
});

gulp.task('inject-files', ['build-styles','copy-js'], ()=>{
    $.util.log($.util.colors.blue('Log : Inject js and css files to client index file in output'));
    return gulp
        .src(config.srcIndex)
        .pipe($.inject(gulp.src(config.js)))
        .pipe($.inject(gulp.src(config.css)))
        .pipe(gulp.dest(config.outClient));
});

gulp.task('server-dev',()=> {
    $.util.log($.util.colors.blue('Log : Nodemon on fire'));
    let nodemonOptions = {
        script:'./src/server/index.js',
        ext: 'js html',     
        env:{
            'PORT':5000,
            'NODE_ENV':'development'
        },
        watch:['./src/server/']
    };
    return $.nodemon(nodemonOptions);
       
});


