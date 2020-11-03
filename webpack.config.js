const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// режимы сборки
const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd
// имя файла в зависимости от режима сборки
const filename = (ext) => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`
const portDev = 5555

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
  ]

  if (isDev) {
    loaders.push('eslint-loader')
  }

  return loaders
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill',
    'webpack-dev-server/client?http://localhost:' + portDev,
    'webpack/hot/dev-server',
    './index.js'],
  output: {
    filename: 'js/' + filename('js'),
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      minify: {
        collapseWhitespace: isProd,
        removeComments: isProd,
      },
    }),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'src/img/'),
        to: path.resolve(__dirname, './dist/img'),
      }],
    }),
    new MiniCssExtractPlugin({
      filename: 'style/' + filename('css'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
    ],
  },
  devServer: {
    open: isDev,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: portDev,
    hot: isDev,
  },
  devtool: isDev ? 'source-map' : false,

  performance: {
    hints: false,
  },
}
