var Path = require("path");
//webpack core
var webpack = require("webpack");
var config = require('./webpack.config');
config.devtool = 'eval';
config.output.publicPath = "http://localhost:8089/public/";
config.devServer = {
    proxy: [
        {
            path: '/',
        }
    ],
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
};
module.exports = config;