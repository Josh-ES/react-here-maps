var webpack = require('webpack');

module.exports = {
  entry: "./test/main.ts",
  output: {
    filename: "test/tests.webpack.js"
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  module: {
    loaders: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.tsx?$/, exclude: /node_modules/, loader: "ts-loader" },
      // All files with a '.json' extension will be handled by 'json-loader'.
      { test: /\.json$/, loader: "json-loader" },
      { test: /sinon\.js$/, loader: "imports?define=>false,require=>false" },
    ],
    preLoaders: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { test: /\.js$/, loader: "source-map-loader" },
    ],
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/^\.\/package$/, function(result) {
      if(/cheerio/.test(result.context)) {
        result.request = "./package.json"
      }
    })
  ],
  externals: {
    "react/addons": true,
    "react/lib/ExecutionEnvironment": true,
    "react/lib/ReactContext": "window",
    "text-encoding": "window"
  },
};