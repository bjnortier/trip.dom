module.exports = {
  entry: {
    'databinding.test': "./test/functional/src/databinding.test.js",
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: /(test)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
    ],
  },
  output: {
    path: 'test/functional/bundles/',
    filename: "[name].bundle.js"
  },
  devtool: "#source-map",
  node: {
    net: 'empty',
    dns: 'empty',
    crypto: 'empty',
  }
};
