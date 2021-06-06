const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.OPEN_WEATHER_KEY": JSON.stringify(
        process.env.OPEN_WEATHER_KEY
      ),
      "process.env.GOOGLE_MAPS_KEY": JSON.stringify(
        process.env.GOOGLE_MAPS_KEY
      ),
    }),
  ],
};
