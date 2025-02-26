const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",

  entry: './src/js/index.js', // Entry point for your application
  output: {
    filename: 'bundle.js', // Output bundle file name
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.css$/, // Rule for CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/, // Rule for JavaScript files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html', // Path to your HTML template
      filename: 'index.html', // Output HTML file name
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // Serve files from the dist directory
    compress: true,
    port: 9000,
  },
};