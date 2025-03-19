const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    content: './src/extension/content.ts',
    background: './src/extension/background.ts',
    popup: './src/extension/popup.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                module: 'ES2020',
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devtool: 'source-map',
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/extension/manifest.json', to: 'manifest.json' },
        { from: 'src/extension/popup.html', to: 'popup.html' },
      ],
    }),
  ],
}; 