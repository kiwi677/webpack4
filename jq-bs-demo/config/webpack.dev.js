const path = require("path");
const webpack = require('webpack');
const HTMLWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    //入口（一个或多个）
    entry: {
        //main:["other.js","./src/main.js"]
        // main: "./src/main.js"
        //在入口文件就把polyfill编译进去
        // main:["babel-polyfill","./src/main.js"]
        main:["core-js/fn/promise","./src/main.js"]
    },
    //打包环境：development & production
    mode: "development",
    //出口只有一个
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/"
    },
    devServer: {
        contentBase: "dist",
        //热更新
        hot:true,
        overlay: true
    },
    module: {
        rules: [
            //css loaders
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            //html loaders
            {
                test: /\.html$/,
                //use: ["file-loader?name=[name].html", "extract-loader", "html-loader"]
                use: ["html-loader"]

                // use: [
                //     {
                //         loader: "file-loader",
                //         option: {
                //             name: "[name].html"
                //         }
                //     },
                //     {
                //         loader: "extract-loader"
                //     },
                //     {
                //         loader: "html-loader"
                //     }
                // ]

            },
            //image loaders
            {
                //匹配到.jpg|png|svg|gif结尾的文件
                test: /\.(jpg|png|svg|gif)$/,
                //多个loader需要从后到前进行解析(大于10kb打包)
                use: ["url-loader?limit=10&name=images/[name]-[hash:8].[ext]"]
            },
            //JS loaders
            {
                test:/\.js$/,
                use:["babel-loader"],
                //排除node_modules中的JS文件
                exclude:/node_modules/
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new HTMLWebpackPlugin({
            template:"./src/index.html"
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
        })
    ]
}