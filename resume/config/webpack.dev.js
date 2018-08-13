const path = require("path");
const webpack = require('webpack');
const HTMLWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: {
        main:["core-js/fn/promise","./src/main.js"]
    },
    mode: "development",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: ""
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
            //sass
            {
                test: /\.sass$/,
                use: ["style-loader", "css-loader","sass-loader"]
            },
            //html loaders
            {
                test: /\.html$/,
                //use: ["file-loader?name=[name].html", "extract-loader", "html-loader"]
                use: ["html-loader"]

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
        })
    ]
}