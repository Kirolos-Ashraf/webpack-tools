const HtmlWebpackPlugin = require("html-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
// const HtmlWebpackInlineSourcePlugin = require('html-webpack-plugin')
// var InjectHtmlPlugin = require('inject-html-webpack-plugin')
const { extendDefaultPlugins } = require("svgo");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlPlugin = require("html-webpack-plugin")
const cssMininizer = require('css-minimizer-webpack-plugin')

const pathModule = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "./js/script.min.js",
    path: pathModule.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/[name][ext]",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },

      //css files
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
     
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new htmlPlugin({template:"src/index.html"}),
    
    new MiniCssExtractPlugin({ filename: "./css/style.bundle.css" }),
  ],
  //   plugins:[
  //     new InjectHtmlPlugin({
  //         filename:'./index.html',

  //     })
  // ],
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     inlineSource: '.(js|css)$' // embed all javascript and css inline
  //   }),
  //   new HtmlWebpackInlineSourcePlugin()
  // ] ,
  optimization: {
    minimize:true,
    minimizer: [
      "...",
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
            ],
          },
        },
      }),
      new cssMininizer()
    ],
  },
};
