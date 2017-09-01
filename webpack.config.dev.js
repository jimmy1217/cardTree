var Path = require("path");

//webpack core
var webpack = require("webpack");
var config = require('./webpack.config');
config.devtool = 'eval';
// config.debug = true;
config.output.publicPath = "http://localhost:8089/public/";
config.devServer = {
    proxy: [
        {
            path: '/',
            // target: "http://dev.iot.itaifeng.com/"
        }
    ],
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
};
// css loader
config.module.loaders[0].use = [{
    loader: "style-loader?insertAt=top&-singleton"
}, {
    loader: "css-loader?minimize?sourceMap!autoprefixer-loader?browsers=last 2 version!" // translates CSS into CommonJS
}];

// less loader
config.module.loaders[1].use = [{
    loader: "style-loader?insertAt=top&-singleton"
}, {
    loader: "css-loader?minimize?sourceMap!autoprefixer-loader?browsers=last 2 version!" // translates CSS into CommonJS
}, {
    loader: "less-loader?sourceMap" // compiles Less to CSS
}];
// dev 不使用 ExtractTextPlugin
config.plugins.pop();
module.exports = config;