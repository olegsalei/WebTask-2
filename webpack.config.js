const webpack = require('webpack');

module.exports = {
    entry: "./src/scripts/app.js",
    output: {
        path: __dirname + '\\dist\\scripts',
        filename: "bundle.js"
    },
    module: {
        loaders: [{
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        }
      ]
    }
};