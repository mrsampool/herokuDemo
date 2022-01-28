const path = require('path');

module.exports = (env) => ({

  entry: path.resolve(__dirname, 'client.jsx'),
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(jsx)?$/,
        include: path.resolve(__dirname),
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        ],
      },
    ],
  },
});