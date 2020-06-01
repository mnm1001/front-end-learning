const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const demos = (function () {
  const fs = require('fs')
  function readFileList (dir, filesList = []) {
    const files = fs.readdirSync(dir)

    files.forEach((item, index) => {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)
      if (stat.isDirectory()) {
        readFileList(path.join(dir, item), filesList) // 递归读取文件
      } else {
        filesList.push(fullPath)
      }
    })
    return filesList
  }
  const filesList = []
  readFileList('./src/demos/pages', filesList)

  const indexFilePaths = filesList.filter(item => item.match(/index\.js/))
  return indexFilePaths
}())

const entry = demos.reduce((result, value) => {
  const indexFileName = value.match(/demos\/(.*?)\/index.js/)[1]
  result[indexFileName] = `./${value}`
  return result
}, {})

module.exports = {
  entry: {
    main: './src/main/main.js',
    ...entry,
  },
  output: {
    filename: '[name].bundle.js',
  },
  devtool: 'cheap-eval-source-map',
  devServer: {
    // historyApiFallback: true,
    // contentBase: './dist',
    hot: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: './public', to: '' },
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'main',
      template: 'src/main/main.html',
      // base: '/',
      chunks: ['main'],
    }),
    ...Object.keys(entry).map((item) => {
      return new HtmlWebpackPlugin({
        title: item,
        filename: item,
        template: 'src/demos/demoTemplate.html',
        // base: '/',
        chunks: ['util', item],
      })
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: 'raw-loader',
          },
        ],
      },
      {
        test: /innerJs.js$/,
        use: [
          {
            loader: 'raw-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true,
            },
          },
          // 'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          test: /[\\/]src[\\/]demos[\\/]commons/,
          name: 'common',
          chunks: 'initial',
          enforce: true,
        },
        node_modules: {
          test: /[\\/]node_modules[\\/]/,
          name: 'node_modules',
          enforce: true,
          chunks: 'initial',
        },
      },
    },
  },
}
