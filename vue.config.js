const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const UI_DIR = path.join(__dirname, 'ui')
const SRC_DIR = path.join(UI_DIR, 'src')
const SERVER_PORT = process.env.PORT || 3000

module.exports = {
  devServer: {
    proxy: {
      '^/socket.io': {
        // target: 'http://localhost:3000',
        target: `http://localhost:${SERVER_PORT}`,
        ws: true,
        changeOrigin: true
      },
      '^/api': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true
      }
    }
  },

  configureWebpack: {
    resolve: {
      alias: {
        '@': SRC_DIR
      }
    },
    entry: {
      app: path.join(SRC_DIR, 'main.js')
    },
    plugins: [
      new CopyWebpackPlugin([{
        from: path.join(__dirname, 'ui/public'),
        to: path.join(__dirname, 'ui/dist'),
        toType: 'dir',
        ignore: [ 'index.html', '.DS_Store' ]
      }])
    ]
  },
  pages: {
    index: {
      entry: path.join(SRC_DIR, 'main.js'),
      template: path.join(UI_DIR, 'public', 'index.html')
    }
  },

  outputDir: path.join(UI_DIR, 'dist')
}
