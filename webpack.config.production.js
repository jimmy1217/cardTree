//webpack core
var webpack = require("webpack");
//webpack css 單獨打包 plugin

var config = require('./webpack.config');

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
module.exports = config;
