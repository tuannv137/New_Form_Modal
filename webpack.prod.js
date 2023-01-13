const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.config.js');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        publicPath: '/'
    },
    optimization: {
        minimize: true,
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'node_vendors', // part of the bundle name and
                    // can be used in chunks array of HtmlWebpackPlugin
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    priority: 1,
                    maxInitialRequests: 2, // create only one vendor file
                    minChunks: 1
                }
            }
        },
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false
                    }
                },
                extractComments: false,
                // enable parallel running
                parallel: true
            })
        ]
    }
});
