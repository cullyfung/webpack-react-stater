const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, './src/main.jsx'),
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle[fullhash].js',
    clean: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        // 处理图片
        test: /\.(jpe?g|png|gif|webp|svg)$/,
        type: 'asset',
        generator: {
          filename: 'assets/img/[hash:10][ext]'
        },
        parser: {
          dataUrlCondition: {
            // 小于60kb的图片会被base64处理
            maxSize: 60 * 1024
          }
        }
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        // 只处理 src 下的文件，排除其他如 node_modules 的处理
        include: path.resolve(__dirname, './src'),
        loader: 'babel-loader',
        options: {
          // 开启 babel 缓存
          cacheDirectory: true,
          // 关闭缓存压缩
          cacheCompression: false,
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html')
    })
  ]
}
