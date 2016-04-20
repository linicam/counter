var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
// var jqueryPlugin = new webpack.ProvidePlugin({
//     $: "jquery",
//     jQuery: "jquery",
//     "window.jQuery": "jquery"
// });

module.exports = {
    //插件项
    plugins: [commonsPlugin],
    //页面入口文件配置
    entry: {
        index : './js/index.js'
    },
    //入口文件输出配置
    output: {
        path: './static',
        filename: 'bundle.js'
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.png$/, loader: "url-loader?mimetype=image/png" },
            { test: /\.handlebars$/, loader: "handlebars-loader" }
        ]
    },
    //其它解决方案配置
    resolve: {
        root: './', //绝对路径
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            jquery : 'lib/jquery-1.12.3.min.js',
            pikaday : 'lib/pikaday.js',
            underscore : 'lib/underscore-min.js'
        }
    }
};