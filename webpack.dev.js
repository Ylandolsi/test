const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  // to get the error msg in the original file
  devtool: "eval-source-map",
  // auto restart the server
  // will only auto-restart when it detects 
  // any changes to files we import into our JavaScript bundle
  // if any change in the template.html, it will restart the server automatically
  devServer: {
    watchFiles: ["./src/template.html"],
  },


  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        // image loader from html 
        test: /\.html$/i,
        loader: "html-loader",
      },
      // image loader from js 
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      }
    ],
  },
};
/*

*   npm init -y 
*   change build to webpack in the package.json
  "scripts": {
    "build": "webpack"
  },
* npm run build


* npm install --save-dev webpack webpack-cli


* automatically refreshes your web page whenever you save a change.: 
npm install --save-dev webpack-dev-server


* handling html : 
npm install --save-dev html-webpack-plugin


* image loader from html:
npm install --save-dev html-loader

* loader for css:

npm install --save-dev style-loader css-loader


*/
