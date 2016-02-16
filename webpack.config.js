module.exports = {
  entry: {
    'databinding.test': "./test/functional/src/databinding.test.js",
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: /(lib|test)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      // {
      //   test: /\.js$/,
      //   exclude: /(node_modules)/,
      //   // loader: 'babel'
      // }
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
