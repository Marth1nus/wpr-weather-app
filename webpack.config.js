const node_externals = require('webpack-node-externals')
const path = require('path')

const typical_react = {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    },
  ],
}

const client_config = {
  entry: './src/home.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'home.js',
  },
  mode: 'development',
  module: typical_react,
}

const server_config = {
  entry: './server.js',
  output: {
    path: __dirname,
    filename: 'server-compiled.js',
  },
  externals: [node_externals()],
  target: 'node',
  mode: 'production',
  module: typical_react,
}

module.exports = [client_config, server_config]
