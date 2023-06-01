const node_externals = require('webpack-node-externals')
const path = require('path')

const public_folder = path.resolve(__dirname, 'public')

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
  mode: 'production',
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
  mode: 'production',
  module: wpr_weather_module,
}

module.exports = [client_config, server_config]
