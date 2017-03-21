const path = require('path');

module.exports = {
  module: {
    loaders: [
      {
        test: /.css$/,
        loader: 'style!css?modules&sourceMap&localIdentName=[name]-[local]--[hash:base64:5]!sass',
        include: path.resolve(__dirname, '../')
      }
    ]
  }
}
