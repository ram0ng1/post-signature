const config = require('flarum-webpack-config')();

config.optimization = config.optimization || {};
config.optimization.moduleIds = 'named';
config.optimization.chunkIds = 'named';

module.exports = config;
