const webpackConfig = require('./webpack.config');
// See issues for details on parts of this config.
// https://github.com/airbnb/enzyme/issues/47
// had issues loading sinon as its a dep of enzyme
const argv = require('minimist')(process.argv.slice(2));

module.exports = (config) => {
  config.set({
    browsers: ['PhantomJS'],
    singleRun: argv.watch ? false : true, // just run once by default
    frameworks: ['mocha', 'chai', 'sinon', 'es5-shim'], // use the mocha test framework
    files: [
      'test/*.ts',
    ],
    preprocessors: {
      'test/**/*.ts': ['webpack', 'sourcemap']
    },
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
      plugins: webpackConfig.plugins,
      externals: webpackConfig.externals,
    },
    webpackMiddleware: {
      stats: 'errors-only'
    },
    browserDisconnectTolerance: 1,
  });
};