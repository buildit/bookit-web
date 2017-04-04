const path = require('path');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: [
          'style-loader?sourceMap',
          'css-loader?modules&importLoaders=1&localIdentName=[name]-[local]--[hash:base64:5]',
          'resolve-url-loader',
          'sass-loader?sourceMap',
        ],
        include: path.resolve(__dirname, '../'),
      },
    ],
  },
};
