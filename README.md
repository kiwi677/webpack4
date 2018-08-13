### 搭建环境及配置
#### 基本框架
##### 全局安装
    #全局安装 ( MAC 需要在 npm 前加 sodu )
    npm install webpack -g
    #全局安装webpack命令行接口
    npm install webpack-cli -g
    #全局安装一个小型的Node.js Express服务器
    npm install webpack-dev-server -g
##### 文件夹
    #生成src文件夹
    mkdir src config dist
##### 初始化
    #初始化一个本地仓库，方便后期将代码上传到gitHub上
    git init
    #初始化（生成package.json)
    npm init -y
##### 文件夹/文件    
    touch src/index.js dist/index.html
    
#### 环境
    #打包自动生成dist文件夹，以及dist下main.js文件（mode是webpack4独有）
    ##开发环境下
    webpack --mode=development
    ##生产环境下
    webpack --mode=production
        
##### 局部安装
    #局部安装(安装到开发环境)
    npm install webpack webpack-cli webpack-dev-server
    
#### 配置    
##### 基础配置 
    touch config/webpack.dev.js
    rm dist/main.js src/index.js
    touch src/main.js
```
#config/webpack.dev.js
const path = require("path")
module.exports = {
    //入口（一个或多个）
    entry:{
        //main:["other.js","./src/main.js"]
        main:"./src/main.js"
    },
    //打包环境：development & production
    mode:"development",
    //出口只有一个
    output:{
        filename: "[name].bundle.js",
        path: path.resolve(__dirname,"../dist"),
        //根路径
        publicPath: "/"
    }
}
```
    #打包
    webpack --config=config/webpack.dev.js
    #启动服务（Project is running at http://localhost:8080/）
    webpack-dev-server --config=config/webpack.dev.js
##### 配置package.json简化命令行
>###### "start":"webpack-dev-server --config=config/webpack.dev.js",<br>"build":"webpack --config=config/webpack.dev.js"
```
# package.json
{
  "name": "mingx",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.config.js",
  "dependencies": {
    "webpack": "^4.8.3",
    "webpack-cli": "^2.1.4",
    "webpack-dev-server": "^3.1.4"
  },
  "devDependencies": {},
  "scripts": {
    "start":"webpack-dev-server --config=config/webpack.dev.js",
    "build":"webpack --config=config/webpack.dev.js"
  },
  "author": "",
  "license": "ISC"
}
```
     #重启
     npm start
     #打包
     npm run build
![](https://user-gold-cdn.xitu.io/2018/5/25/1639607e954101e4?w=2032&h=390&f=png&s=67671)
##### 配置本地服务器（设置默认页面为dist里面的内容）
```
#config/webpack.dev.js
devServer:{
    contentBase:"dist"
}
```
### 加载CSS
    #生成一个css文件
    touch src/main.css
```
# dist/index.html
<div>hello</div>
<script src="main.bundle.js"></script>

#src/main.css
body{background-color:blueviolet;color:#fff;}

# src/main.js（引入css文件）
require("./main.css")
```
#### 下载css加载器
    npm install style-loader css-loader
#### 配置css loaders   
```
#config/webpack.dev.js
module:{
    rules:[
        //css loaders
        {
            test:/\.css$/,
            use:["style-loader","css-loader"]
        }
    ]
}
```
>##### 重新启动（只要webpack.config.js文档有变动就需要重启，并刷新页面）<br>npm start
    
![](https://user-gold-cdn.xitu.io/2018/5/25/163962eba6aa35ea?w=1658&h=218&f=png&s=33086)
##### 错误信息反馈到终端

![](https://user-gold-cdn.xitu.io/2018/5/25/16396355c3afb106?w=2098&h=646&f=png&s=107082)
>##### 将错误信息同步到http://localhost:8080/页面（webapck.dev.js文档devServer里面添加overlay:true）

```
#config/webpack.dev.js
devServer:{
    contentBase:"dist",
    overlay:true
}
```

![](https://user-gold-cdn.xitu.io/2018/5/25/163963833d86f37e?w=2280&h=476&f=png&s=94320)

### 加载html
    #将dist文件夹下的index.html，引入src中
    mv dist/index.html src/
```
# src/main.js
require("./main.css")
require("./index.html")
```
#### 1.下载html加载器
    npm install html-loader extract-loader file-loader
#### 2.配置html loaders
```
# webpack.dev.js
{
    test:/\.html$/,
    use:["file-loader?name=[name].html","extract-loader","html-loader"]
    //使用顺序从后往前
    //1.html-loader找到html文件
    //2.extract-loader将index.html跟生成的bundle.js进行分割
    //3.file-loader为加载的文件起名字
}
##另外的的编译方式
{
    test:/\.html$/,
    use: [
        {
            loader: "file-loader",
            option: {
                name: "[name].html"
            }
        },
        {
            loader: "extract-loader"
        },
        {
            loader: "html-loader"
        }
    ]
}
```
    #删除dist里面的文件
    rm -rf dist/main.bundle.js dist/index.bundle.html
#### 3.打包、重启 
    npm run build 
    npm start
### 加载器图片
    #生成
    mkdir src/images
#### 1.下载url加载器
    npm install url-loader 
#### 2.配置image loaders
```
#webpack.dev.js
{
    //匹配到.jpg|png|svg|gif结尾的文件
    test:/\.(jpg|png|svg|gif)$/,
    //多个loader需要从后到前进行解析(大于10kb打包)
    use:["url-loader?limit=10&name=images/[name]-[hash:8].[ext]"]
}
```
#### 3.打包、重启

### 加载JS
#### 使用babel转换JS
```
# src/main.js 
var a = () => {
    console.log("one more time")
}
```
#### 下载
    #安装babel-core
    npm install babel-core
    #生成.babelrc文件( babelrc文件的本质是json ,rc为自动加载的文件)
    touch .babelrc
    #下载库，将ES6转为ES5
    npm install babel-plugin-transform-es2015-arrow-functions
###### 配置.babelrc 文件   
```
#.babelrc
{
    "plugins":[
        "transform-es2015-arrow-functions"
    ]
}
```
    #安装babel
    sudo npm install babel-cli -g
    #main.js使用babel
    babel src/main.js
![ES6转为ES5](https://user-gold-cdn.xitu.io/2018/5/25/16396a70c4b73eda?w=2182&h=682&f=png&s=146139)

    #安装babel-loader
    npm install babel-loader
#### 配置JS loaders 
```
#  webpack.dev.js
{
    test:/\.js$/,
    use:["babel-loader"],
    //排除node_modules中的JS文件
    exclude:/node_modules/
}
```
######
    #删除dist里面的文件
    rm -rf dist/main-bundle.js dist/index.html dist/images
    #重新启动、打包
    npm start
    npm run build
###### 查看dist/main.bundle.js (中有ES6被解析为ES5)  
![](https://user-gold-cdn.xitu.io/2018/5/25/16396b1a8045f2ea?w=1812&h=154&f=png&s=40334)
#### 更好的解决JS语法：polyfill / preset / transform
```
# src/main.js
var a = async () => {
    await console.log("one more time");
    console.log('two')
}

#.babelrc 
{
    "plugins":[
        "transform-es2015-arrow-functions",
        "async-to-promises"
    ]
}
```
    #将async转为promise
    npm install babel-plugin-async-to-promises
    #main.js使用babel
    babel src/main.js

![](https://user-gold-cdn.xitu.io/2018/5/25/16396bc55f9467b0?w=2100&h=544&f=png&s=100681)
##### polyfill会在预编译之前编译指定的东西(缺点：生成环境变量的污染)
    #安装polyfill
    npm install babel-polyfill
#### 配置JS loaders 
```
#  webpack.dev.js
entry:{
    main:["babel-polyfill","./src/main.js"]
}
```
###### babel-polyfill中选择对应的内容转化指定的语法(观察main.bundel.js的大小)
```
entry:{
    main:["core-js/fn/promise","./src/main.js"]
},
```
    #比polyfill更好的方式：安装环境变量
    npm install babel-preset-env
```
#.babelrc
{
   "presets":[
       "env",
       {
           "debug":true
       }
   ]
}
```
![](https://user-gold-cdn.xitu.io/2018/5/25/16396d332702785b?w=1790&h=1018&f=png&s=211342)
```
#.babelrc
{
   "presets":[
       [
            #配置环境自动下载对应的插件
            "env",
            {
                "tartgets":{
                #配置浏览器的版本号
                    "browsers":["last 2 versions"]
                },
                "debug":true
            }
       ]
   ],
   "plugins":[
        #识别最新语法，解决环境污染
        "transform-runtime"
    ]
}
```
    #安装插件：transform-runtime
    npm install babel-plugin-transform-runtime
```
# main.js
require("babel-runtime/regenerator")
require("./main.css")
require("./index.html")
var a = async args  => {
    const {a, b} = args
    await console.log("one more time", a, b);
    console.log('two')
}
a({a:12,b:23});
```
    #main.js使用babel
    babel src/main.js  
![](https://user-gold-cdn.xitu.io/2018/5/25/16396df7cdaf729b?w=2170&h=1122&f=png&s=217842)
    
### 搭建脚手架
>###### 实时报错、服务端和客户端实时渲染...
    #安装express
    npm install express
    #创建server文件夹用于启动服务
    mkdir src/server
    #创建入口文件和配置服务器的文件
    touch src/server/main.js src/server/express.js
```
# package.json添加dev(用node启动main.js )
"dev":"node src/server/main.js"

# src/server/main.js
//将ES6转为ES5
require("babel-register")
//执行express文件
require("./express")

# src/server/express.js
//启动一个服务器
import express from 'express';
import path from 'path';
//创建服务器
const server = express()
//监听端口号 8080
server.listen(8080,() => {
    console.log("server is running...")
})
```
##### 配置服务启动页面
    #监听代码
    npm install webpack-dev-middleware
```
# src/server/express.js
//启动一个服务器
import express from 'express';
import path from 'path';

//创建服务器
const server = express()
//配置启动路径
const staticMiddleware = express.static("dist")
//监听代码
const webpack = require("webpack")
const config = require("../../webpack.dev")
//使用webpack把config传进去作为实例
const compiler = webpack(config)
//使用下载的webpack-dev-middleware
const webpackDevMiddleware = require("webpack-dev-middleware")(compiler,config.devServer)
//【运行】server
server.use(webpackDevMiddleware)
// 【使用路径】
server.use(staticMiddleware)
//监听端口号 8080
server.listen(8080,() => {
    console.log("server is running...")
})
```
##### npm run dev
#### 前端热更新
    #配置热更新
    npm install webpack-hot-middleware    
```
# src/server/express.js //【使用热更新】在【运行】之后，【使用路径】之前

//热更新
const webpackHotMiddleware = require("webpack-hot-middleware")(compiler)
//【使用热更新】
server.use(webpackHotMiddleware)
```
##### 配置热更新
```
# webpack.dev.js
//引入webpack
const webpack = require('webpack');
//添加
module.exports = {
    devServer:{
        //热更新
        hot:true,
    },
    //插件
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ]
」
# src/main.js
require("webpack-hot-middleware/client")
```
#### 后端热更新
    #安装全局的nodemon进行监听(后端)
    sudo npm install nodemon -g
##### 配置监听
```
#package.json
"dev":"nodemon --watch config --watch src/server src/server/main.js" 
```
#### 服务端热更新
    #服务端监听,安装插件
    npm install html-webpack-plugin
##### 配置后端热更新
```
# webpack.dev.js
//引入html-webpack-plugin，并且生成实例
const HTMLWebpackPlugin = require("html-webpack-plugin");
//更改html loaders,去除和"html-webpack-plugin"插件功能中相同的部分
{
    test: /\.html$/,
    use:["html-loader"]
}
//插件
plugins:[
        new webpack.HotModuleReplacementPlugin(),
        //添加插件HTMLWebpackPlugin
        new HTMLWebpackPlugin({
            template:"./src/index.html"
        })
    ]

# src/main.js
require("webpack-hot-middleware/client?reload=true")
```
##### 优化热更新重复编译和动态创建文件的问题
    npm install webpack-mild-compile
```
# src/server/express.js  
require("webpack-mild-compile")
```
### 借助webpack、node.js、浏览器实现调试
```
#package.json
"dev":"nodemon --inspect --watch config  --watch src/server src/server/main.js 
```
>##### 问题：<span style="color:#f40">[nodemon] app crashed - waiting for file changes before starting...</span><br>解决：我凭借直觉改了src/server/express.js里面监听的端口路径-_-!
### React
    npm install react react-dom
    #创建react入口文件
    touch src/app.js
    
```
#src/main.js
//引入babel文件解析ES6
require("babel-register");
//引入将react入口文件
require("./app");

#src/index.html
//添加根目录
<div id="react-root"></div>

#src/app.js
import React from 'react';
import ReactDOM from 'react-dom';
ReactDOM.render(
    <h1>Hi kiwi</h1>,
    document.getElementById("react-root")
)
```
#### 解析jsx
##### 下载babel-preset-react
    npm install babel-preset-react
##### 配置babel-preset-react    
```
#.babelrc
{
    "presets":[
        [
             "env",
             {
                 "tartgets":{
                     "browsers":["last 2 versions"]
                 },
                 "debug":true
             }
        ],
        "babel-preset-react"
    ],
    "plugins":[
         "transform-runtime"
     ]
 }
```
    npm run dev    
### Sass
    npm install node-sass sass-loader
    touch src/main.sass
    
```
# main.js
require("./main.sass")

#config/webpack.dev.js
//sass
{
    test: /\.sass$/,
    use: ["style-loader", "css-loader","sass-loader"]
}
```
### jQuery
    npm install jquery
    
```
#config/webpack.dev.js
plugins: [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    })
]
```
### Bootstrap
    npm install bootstrap

```
# main.js
import 'bootstrap/dist/css/bootstrap.css'
//需要先安装jquery 和 popper.js
import 'bootstrap/dist/js/bootstrap.js'
```
    npm install popper.js
```
#config/webpack.dev.js
plugins: [
    new webpack.ProvidePlugin({
    new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
        })
]
```

