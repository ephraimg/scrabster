// guidance here: https://stanko.github.io/webpack-babel-react-revisited/

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src'),
  APP: path.resolve(__dirname, 'src/app'),
};

// Webpack configuration
module.exports = {
  mode: 'development',
  entry: path.join(paths.APP, 'app.jsx'),
  output: {
    path: paths.DIST,
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: path.join(paths.SRC, 'index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};