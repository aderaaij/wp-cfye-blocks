const paths = require('./paths');
const externals = require('./externals');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Extract style.css for both editor and frontend styles.
const blocksCSSPlugin = new ExtractTextPlugin({
  filename: './dist/blocks.style.build.css',
});

// Extract editor.css for editor styles.
const editBlocksCSSPlugin = new ExtractTextPlugin({
  filename: './dist/blocks.editor.build.css',
});

// Configuration for the ExtractTextPlugin — DRY rule.
const extractConfig = {
  use: [
    // "postcss" loader applies autoprefixer to our CSS.
    { loader: 'raw-loader' },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: [
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
          }),
        ],
      },
    },
    // "sass" loader converts SCSS to CSS.
    {
      loader: 'sass-loader',
      options: {
        // Add common CSS file for variables and mixins.
        data: '@import "./src/common.scss";\n',
        outputStyle: 'nested',
      },
    },
  ],
};

// Export configuration.
module.exports = {
  entry: {
    './dist/blocks.build': paths.pluginBlocksJs, // 'name' : 'path/file.ext'.
  },
  output: {
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // The dist folder.
    path: paths.pluginDist,
    filename: '[name].js', // [name] = './dist/blocks.build' as defined above.
  },
  // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            // This is a feature of `babel-loader` for webpack (not Babel itself).
            // It enables caching results in ./node_modules/.cache/babel-loader/
            // directory for faster rebuilds.
            cacheDirectory: true,
          },
        },
      },
      {
        test: /style\.s?css$/,
        exclude: /(node_modules|bower_components)/,
        use: blocksCSSPlugin.extract(extractConfig),
      },
      {
        test: /editor\.s?css$/,
        exclude: /(node_modules|bower_components)/,
        use: editBlocksCSSPlugin.extract(extractConfig),
      },
    ],
  },
  // Add plugins.
  plugins: [blocksCSSPlugin, editBlocksCSSPlugin],
  stats: 'minimal',
  // stats: 'errors-only',
  // Add externals.
  externals: externals,
};
