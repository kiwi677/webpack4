//启动一个服务器
import express from 'express';
import path from 'path';

//创建服务器
const server = express()
//配置启动路径
const staticMiddleware = express.static("dist")
//监听代码
const webpack = require("webpack")
const config = require("../../config/webpack.dev")
//使用webpack把config传进去作为实例
const compiler = webpack(config)
//使用下载的webpack-dev-middleware
const webpackDevMiddleware = require("webpack-dev-middleware")(compiler,config.devServer)
//热更新
const webpackHotMiddleware = require("webpack-hot-middleware")(compiler)
//解决重复编译的问题webpack-mild-compile
require("webpack-mild-compile")

//运行server
server.use(webpackDevMiddleware)

//使用热更新
server.use(webpackHotMiddleware)

//使用启动路径
server.use(staticMiddleware)
// debugger

//监听端口号 8080
server.listen(8081,() => {
    console.log("server is running...")
})