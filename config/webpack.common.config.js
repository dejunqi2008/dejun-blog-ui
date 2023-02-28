const path = require('path');

module.exports = {
  entry: {
    app: './src/app.js',
  },
  output: {
    filename: 'js/[name]-bundle-[hash:6].js',
    path: path.resolve(__dirname, '../dist'),
  },
};
