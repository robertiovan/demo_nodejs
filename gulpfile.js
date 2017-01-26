let gulp = require('gulp');
let args = require('yargs').argv;
let del = require('del');
let browserSync = require('browser-sync');
let $ = require('gulp-load-plugins')({lazy:true});

let config = require('./gulp.config')();
let port = process.env.PORT || config.defaultPort;

gulp.task('default', ['help']);
gulp.task('help',()=> $.taskListing);
//use $.iamgemin to compress images eg: pipe($.imagemin({optiomizationLevel:4}))

gulp.task('test-specs',()=> {
    //Set environment variable from gulp
    $.env({vars:{ENV:'Testing'}});
    logToConsole('Log : run BDD specs with mocha');
    gulp.src(config.srcSpecFiles,{read:false})
       .pipe($.mocha({reporter:'nyan'}));
});

gulp.task('check-code', ()=> {
    /*run  gulp --verbose check-code to hit if condition */
    logToConsole('Log : Check javascript errors and coding styles with jshint & jscs');
    return gulp
        .src(config.srcFiles)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose:true}))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('build-styles', ['clean-styles'], ()=> {
    logToConsole('Compile styles');
    return gulp.src(config.lessStyleFiles)
        .pipe($.plumber())
        .pipe($.less())
        .pipe($.autoprefixer({browsers:['last 2 version', '> 5%']}))
        .pipe(gulp.dest(config.srcTempPath));
});

// .on('error',function (error){
//     $.util.log($.util.colors.blue('Compile styles error : ' + error));
//     this.emit('end');
// })

gulp.task('clean-styles', (done)=> {
    let files = config.srcTempPath;
    del(files, done).then(() => done());
});

gulp.task('watch-styles', ()=> {
    gulp.watch(config.lessStyleFiles,['build-styles']);
});

gulp.task('dist-copy-js', ()=> {
    logToConsole('Log : Copy js files to output');
    return gulp
        .src(config.srcJsFiles)
        .pipe(gulp.dest(config.outJsPath));
});

gulp.task('inject-files', ['build-styles'], ()=> {
    logToConsole('Log : Inject js and css files to client index file in output');
    return gulp
        .src(config.srcIndexFile)
        .pipe($.inject(gulp.src(config.srcJsFiles)))
        .pipe($.inject(gulp.src(config.srcCssFiles)))
        .pipe(gulp.dest(config.srcClientPath));
});

gulp.task('server-dev',['inject-files'], ()=> {
    logToConsole('Log : Nodemon on fire');
    let nodemonOptions = {
        script:config.srcServerIndex,
        ext: 'js html',
        env:{
            'PORT':port,
            'NODE_ENV':'development'
        },
        watch:[config.srcServer]
    };
    return $.nodemon(nodemonOptions)
        .on('restart',()=> {
            logToConsole('Nodemon restarting ...');
            setTimeout(function() {
                browserSync.notify('reloading now ...');
                browserSync.reload({stream: false});
            }, config.browserReloadDelay);
        })
        .on('start',()=> {
            logToConsole('Nodemon starting ...');
            startBrowserSync();
        })
        .on('crash',()=> {
            logToConsole('Nodemon crash ...');
        })
        .on('exit',()=> {
            logToConsole('Nodemon exiting ...');
        });
});

function startBrowserSync() {
    if (args.nosync || browserSync.active) {
        return;
    }
    logToConsole('Starting browser-sync on port ' + port);

    gulp.watch(config.lessStyleFiles, ['build-styles'])
        .on('change', function(event) { changeEvent(event); });

    let options = {
        proxy: 'localhost:' + port,
        port: 3000,
        files: [
            config.srcClientPath + '**/*.*',
            '!' + config.lessStyleFiles
        ],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 1000 //1000
    };

    browserSync(options);
}

function changeEvent(event) {
    let srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    logToConsole('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

function logToConsole(message) {
    $.util.log($.util.colors.blue(message));
}


