const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const fs = require('fs')
const exec = require('child_process').exec
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
readFileList('./src/demo', filesList)

const indexFilePaths = filesList.filter(item => item.match(/index\.js/))

const entry = indexFilePaths.reduce((result, value) => {
  const indexFileName = value.match(/demo\/(.*?)\/index.js/)[1]
  result[indexFileName] = `./${value}`
  return result
}, {})

module.exports = {
  entry: {
    main: './src/main.js',
    ...entry
  },
  output: {
    filename: '[name].bundle.js'
  },
  devtool: 'cheap-eval-source-map',
  devServer: {
    // historyApiFallback: true,
    // contentBase: './dist',
    hot: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/')
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: './public', to: '' }
      ]
    }),
    new HtmlWebpackPlugin({
      title: 'main',
      template: 'src/main.html',
      // base: '/',
      chunks: ['main']
    }),
    ...Object.keys(entry).map((item) => {
      return new HtmlWebpackPlugin({
        title: item,
        filename: item,
        template: 'src/demoTemplate.html',
        // base: '/',
        chunks: ['util', item]
      })
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: 'raw-loader'
          }
        ]
      },
      {
        test: /innerJs.js$/,
        use: [
          {
            loader: 'raw-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
    }
  }
}
