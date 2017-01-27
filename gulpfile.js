let gulp = require('gulp');
let args = require('yargs').argv;
let del = require('del');
let pump = require('pump');
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
gulp.task('build-js', ['clean-js'], ()=> {
    logToConsole('Compile javascript to es5');
    return gulp.src(config.srcJsFiles)
        .pipe($.plumber())
        .pipe($.babel({presets: ['es2015']}))
        .pipe(gulp.dest(config.srcTempPath));
});

//Use plumber instaid
// .on('error',function (error){
//     $.util.log($.util.colors.blue('Compile styles error : ' + error));
//     this.emit('end');
// })

gulp.task('clean-styles', (done)=> {
    let files = config.srcCssFiles;
    del(files, done).then(() => done());
});
gulp.task('clean-js', (done)=> {
    let files = config.srcJsBuildFiles;
    del(files, done).then(() => done());
});
gulp.task('clean-production', (done)=> {
    let files = config.outClientPath;
    del(files, done).then(() => done());
});

gulp.task('watch-styles', ()=> {
    gulp.watch(config.lessStyleFiles,['build-styles']);
});


gulp.task('inject-files', ['build-styles','build-js'], ()=> {
    logToConsole('Log : Inject js and css files to client index file in output');
    return gulp
        .src(config.srcIndexFile)
        .pipe($.inject(gulp.src(config.srcCssFiles, {read: false}), {relative: true}))
        .pipe($.inject(gulp.src(config.srcJsBuildFiles, {read: false}), {relative: true}))
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

gulp.task('build-production', ['clean-production'], ()=> {
    let htmlFilter = $.filter(['**','!**/index.html'], {restore: true});

    return gulp
        .src(config.srcIndexFile)
        .pipe($.plumber())
        .pipe($.useref())
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.csso()))
        .pipe(htmlFilter)
        .pipe($.rev())
        .pipe(htmlFilter.restore)
        .pipe($.revReplace())
        .pipe(gulp.dest(config.outClientPath))
        .pipe($.rev.manifest())
        .pipe(gulp.dest(config.outClientPath));
});

gulp.task('bump',()=> {
    let msg = 'Bumping version';
    let type = args.type;
    let version = args.ver;
    let options = {};
    if(version) {
        options.version = version;
        msg += ' to ' + version;
    }
    else {
        options.type = type;
        msg += ' for a ' + type;
    }
    logToConsole(msg);
    return gulp
        .src(config.packages)
        .pipe($.print())
        .pipe($.bump(options))
        .pipe(gulp.dest(config.root));
});










