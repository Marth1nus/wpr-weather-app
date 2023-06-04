const node_externals = require('webpack-node-externals')
const path = require('path')

const public_folder = path.resolve(__dirname, 'public')
const mode = 'development'

const wpr_weather_module = {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /node_modules/,
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
    path: public_folder,
    filename: 'home.js',
  },
  mode,
  module: wpr_weather_module,
}

const search_client_config = {
  entry: './src/search.js',
  output: {
    path: public_folder,
    filename: 'search.js',
  },
  mode,
  module: wpr_weather_module,
}

const server_config = {
  entry: './server.mjs',
  output: {
    path: __dirname,
    filename: 'server-compiled.js',
  },
  externals: [node_externals()],
  target: 'node',
  mode,
  module: wpr_weather_module,
}

module.exports = [search_client_config, client_config, server_config]
