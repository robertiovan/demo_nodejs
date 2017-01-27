module.exports = ()=> {
    let srcClientPath = './src/client/';
    let outClientPath = './out/client/';
    let outStylesPath = outClientPath + 'styles/';
    let outJsPath = outClientPath + 'javascript/';
    let srcStylesPath = srcClientPath + 'styles/';
    let srcJsPath = srcClientPath + 'javascript/';
    let srcTempPath = srcClientPath + 'temp/';
    let srcSpecFiles = ['./src/server/controllers/**/*spec.js'];
    let index = 'index.html';
    let srcServer = './src/server/';
    let srcServerIndex = srcServer + 'index.js';
    return {
        defaultPort:5000,
        browserReloadDelay:1000,
        srcIndexFile: srcClientPath + index,
        srcCssFiles: [srcTempPath + '**/*.css'],
        srcJsBuildFiles: [srcTempPath + '**/*.js'],
        outJsFiles: [outJsPath + '**/*.js'],
        srcJsFiles: [srcJsPath + '**/*.js'],
        lessStyleFiles: srcStylesPath + '**/*.less',
        packages:['./package.json'],
        srcFiles:['./src/**/*.js','./*.js'],
        srcTempPath:srcTempPath,
        srcSpecFiles:srcSpecFiles,
        outJsPath:outJsPath,
        srcClientPath: srcClientPath,
        srcServer:srcServer,
        srcServerIndex:srcServerIndex,
        outStylesPath:outStylesPath,
        outClientPath:outClientPath,
        root:'./'
    };
};
