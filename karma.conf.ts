// Karma configuration
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = (config: any) => {
  config.set({
    frameworks: [
      // Reference: https://github.com/karma-runner/karma-jasmine
      // Set framework to jasmine
      'jasmine'
    ],

    browsers: [
      // Run tests using PhantomJS
      'PhantomJS'
    ],

    files: [
      'src/scripts/tests.webpack.js'
    ],

    preprocessors: {
      // add webpack as preprocessor
      'src/scripts/tests.webpack.js': ['webpack', 'sourcemap']
    },

    // TODO: Using 2.0.6 karma-webpack due to bug:
    // https://github.com/webpack-contrib/karma-webpack/issues/291
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
    webpack: require('./webpack.config'),

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only'
    },

    singleRun: true
  });
};
