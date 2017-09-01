//node path modules
var Path = require("path");
//webpack core
var webpack = require("webpack");
module.exports = {
    // 輸入各個頁面的js
    entry: {
        // 共用vendor js
        vendor: ['react','react-dom','classnames'],
        // 有使用redux 的部份皆在app.js
        app: [Path.resolve(__dirname, "./src/js/app.js")]
    },
    // 輸出bundle
    output: {
        path: Path.resolve(__dirname, "./public/"),
        // [name]表示以entry的key命名
        // publicPath:"./public/",
        filename: "[name].js",
        sourceMapFilename: "[name].bundle.js.map",
        chunkFilename: '[name].[chunkhash:5].chunk.js'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            use: [{
                loader: "style-loader?insertAt=top&-singleton"
            }, {
                loader: "css-loader?minimize?sourceMap!autoprefixer-loader?browsers=last 2 version!" // translates CSS into CommonJS
            }]
        }, {
            // requrie less需編譯成css
            test: /\.less$/,
            use: [{
                loader: "style-loader?insertAt=top&-singleton"
            }, {
                loader: "css-loader?minimize?sourceMap!autoprefixer-loader?browsers=last 2 version!" // translates CSS into CommonJS
            }, {
                loader: "less-loader?sourceMap" // compiles Less to CSS
            }]
        }, {
            test: /\.png$/,
            loader: "url-loader?limit=100000"
        }, {
            test: /\.jpg$/,
            loader: "file-loader"
        },
        {
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/font-woff'
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/octet-stream'
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file'
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=image/svg+xml'
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'

        }]
    },
    externals: {
        // 對應外部jquery
        // "jQuery": "jQuery",
        // "$": "jQuery"
    },
    plugins: [
        // new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        // 告訴webpack看到字串自動require指定module
        new webpack.ProvidePlugin({
            "React": "react",
            "ReactDOM": "react-dom",
            "classNames": "classnames",
        }),
        // moment.js ignore locale.js , 不然打包會打包各語言檔
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|fr|hu/),
        // 這會移除所有js裡面的 vendor code
        new webpack.optimize.CommonsChunkPlugin({ name: "vendor", filename: "vendor.js" }),
    ],
    resolve: {
        // // require 檔案時的根目錄
        // root: Path.resolve(__dirname, "./"),
        // 指定特定的路徑，目前都是vendor library
        alias: {
            modules: Path.join(__dirname, "node_modules"),
            //下方放置第三方套件, 格式為  
            //"自己取名的module 名稱":"src位置"
            //"jquery": "jquery/dist/jquery.js",
        },
        // require 時可不寫 .js
        extensions: ['.js', '.less']
    }
};
