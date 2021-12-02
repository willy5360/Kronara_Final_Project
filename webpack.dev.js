const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const port = 8080;
const [_, host] = process.env.GITPOD_WORKSPACE_URL.split('://') ?? null;
const publicUrl = host ? `${port}-${host}` : `http://localhost:${port}`;


module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        allowedHosts: 'all',
        hot: true,
        compress: true,
        historyApiFallback: true,
        port: port
    }
});
