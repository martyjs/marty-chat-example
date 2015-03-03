module.exports = function(config) {
  process.env.NODE_ENV = 'test';

  config.set({
    basePath: '',
    frameworks: ['mocha', 'browserify'],
    browserify: {
      debug: true,
      transform: ['reactify', 'envify', 'cssify']
    },
    files: [
      'app/**.js',
      'test/**/*.js'
    ],
    preprocessors: {
      'app/*.js': ['browserify'],
      'test/**/*.js': ['browserify'],
      'app/*[!server]/**/*.js': ['browserify']
    },
    reporters: ['spec'],
    browsers: ['Chrome'],
    autoWatch: true,
    singleRun: false,
    colors: true,
    port: 9876,
    logLevel: config.LOG_INFO
  });
};