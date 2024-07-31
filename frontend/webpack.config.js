const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const dotenv = require('dotenv');
const fs = require('fs');

// Load environment variables from backend/.env file
const envConfig = dotenv.parse(fs.readFileSync(path.resolve(__dirname, '..', 'backend', '.env')));
const envKeys = Object.keys(envConfig).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(envConfig[next]);
  return prev;
}, {});

module.exports = {
  entry: './frontend/src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'frontend', 'dist'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].chunk.js',
    clean: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'frontend', 'dist'),
    },
    compress: true,
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      zlib: require.resolve('browserify-zlib'),
      querystring: require.resolve('querystring-es3'),
      path: require.resolve('path-browserify'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      http: require.resolve('stream-http'),
      os: require.resolve('os-browserify/browser'),
      net: false,
      fs: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'frontend/tsconfig.frontend.json',
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './frontend/public/index.html',
      favicon: './frontend/public/favicon.ico',
    }),
    new DefinePlugin(envKeys),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      typescript: {
        configFile: 'frontend/tsconfig.frontend.json',
        build: true,
      },
    }),
  ],
};