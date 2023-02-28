const path = require('path');

const babelLoaderRule = {
    test: /\.(js|jsx)$/,
    exclude: /(node_modules|bower_components)/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
                '@babel/plugin-transform-runtime',
                '@babel/plugin-proposal-class-properties',
            ]
        }
    }
}

const urlLoaderRule =  {
    test: /\.(png|jpe?g|gif)$/i,
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
      outputPath: 'images',
      limit: 8192,
    }
}

module.exports = {
    entry: {
        app: './src/index.js',
    },
    output: {
        filename: 'js/[name]-bundle-[chunkhash:6].js',
        path: path.resolve(__dirname, '../dist'),
    },
    module: {
        rules: [ babelLoaderRule, urlLoaderRule ]
    }
};
