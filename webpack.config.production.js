//webpack core
var webpack = require("webpack");
//webpack css 單獨打包 plugin
var config = require('./webpack.config');
var CompressionPlugin = require('compression-webpack-plugin');
config.output.publicPath = "public/";
//設置node_env = production
config.plugins.push(
    new webpack.DefinePlugin({
    'process.env': {
        'NODE_ENV': JSON.stringify('production')
    }
}));
// 關閉production unglify 的 warning 訊息
config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    minimize: true,
    compress: {
        drop_debugger: true,
        warnings: false,
        drop_console: true,
        conditionals: true, // optimize if-s and conditional expressions
        unused: true,       // drop unused variables/functions
        comparisons: true,  // optimize comparisons
        sequences: true,    // join consecutive statements with the "comma operato"
        dead_code: true,    // discard unreachable code 丢弃未使用的代码
        evaluate: true,     // evaluate constant expressions
        join_vars: true,    // join var declarations
        if_return: true     // optimize if-s followed by return/continue
    }
}));

//做預先壓縮 , 透過nginx gzip_static 來抓gz
config.plugins.push(new CompressionPlugin({
    asset: "[path].gz[query]",
    algorithm: "gzip",
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.8
}));
module.exports = config;
