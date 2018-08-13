require("babel-runtime/regenerator")
require("webpack-hot-middleware/client?reload=true")
require("./main.css")
require("./index.html")
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
var a = async args  => {
    const {a, b} = args
    await console.log("one more time", a, b);
    console.log('two')
}
a({a:12,b:23});

$('.changeBg').click(function(){
    $('body').css({'backgroundColor':'#ccc'})
    $(this).html('背景颜色以及改变').css({'backgroundColor':'#333'})
})