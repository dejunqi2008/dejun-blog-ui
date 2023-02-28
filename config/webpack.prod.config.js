const { merge } = require('webpack-merge');
const common = require('./webpack.common.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
          },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            filename: 'index.html',
            inject: 'body',
            minify: {
                removeComments: true,
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({ filename: 'style/[name].[chunkhash:6].css' }),
    ],
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin()],
    },
});