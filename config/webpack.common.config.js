const path = require('path');

module.exports = {
    entry: {
        app: './src/index.js',
    },
    output: {
        filename: 'js/[name]-bundle-[chunkhash:6].js',
        path: path.resolve(__dirname, '../dist'),
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: [
                        '@babel/plugin-transform-runtime',
                        '@babel/plugin-proposal-class-properties',
                    ],
                }
            }
        }]
    }
};
