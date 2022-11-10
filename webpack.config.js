const path = require('path')
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {

  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new CopyPlugin({
        patterns: [
          { from: "public" },
        ],
    }),
  ],

  devServer: {
    historyApiFallback: {disableDotRule: true},
    port: 8080,
    static: {
      directory: __dirname
    }
  }
}
