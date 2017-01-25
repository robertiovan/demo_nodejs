module.exports = ()=> {
    let srcClient = './src/client/';
    let outClient = './out/client/';
    let outStyles = outClient+'styles/';
    let outJs = outClient+'javascript/';
    let index = 'index.html';
    return {
        srcFiles:['./src/**/*.js','./*.js'],
        lessStyles: srcClient + 'styles/styles.less',
        outStyles: outStyles,
        css: [outStyles +'**/*.css'],
        js: [srcClient + 'javascript/**/*.js'],
        srcIndex: srcClient + index,
        outClient: outClient,
        srcClient: srcClient,
        outJs:outJs
    };
};
