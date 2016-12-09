module.exports = {
  resolve: {
    root: __dirname,
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
};
