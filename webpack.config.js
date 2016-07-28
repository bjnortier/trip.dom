
module.exports = {
  entry: {
    'databinding.test': './test/functional/src/databinding.test.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(moment|jquery)/,
        loader: 'babel',
      },
    ],
  },
  output: {
    path: 'test/functional/bundles/',
    filename: '[name].bundle.js',
  },
  devtool: 'eval',
  node: {
    net: 'empty',
    dns: 'empty',
    crypto: 'empty',
  },
};
