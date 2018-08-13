require("babel-runtime/regenerator")
require("webpack-hot-middleware/client?reload=true")
require("./main.css")
require("./index.html")
var a = async args  => {
    const {a, b} = args
    await console.log("one more time", a, b);
    console.log('two')
}
a({a:12,b:23});