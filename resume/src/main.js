require("babel-runtime/regenerator")
require("webpack-hot-middleware/client?reload=true")
require("./css/main.css")
require("./css/gb.css")
require("./index.html")

"use strict"
function init () {
  hideLoad();
  changePage();
  showPlan ();
}
//上下滑动翻页
function changePage () {
  var page = document.getElementsByClassName('part'),
      progress = document.getElementsByClassName('progress')[0],
      step = progress.getElementsByTagName('circle')[0],
      bg = document.getElementsByClassName('bg')[0],
      startY,
      endY,
      dy,
      num = 0;
  bg.style.display = 'block';
  progress.style.display = 'block';
  page[num].classList.add('in')
  document.addEventListener('touchstart',function (ev) {
    startY = ev.touches[0].pageY;
  }, false);
  document.addEventListener('touchend',function (ev) {
    endY = ev.changedTouches[0].pageY;
    dy = startY - endY;
    if(dy > 16) {//向上滑动
      page[num].classList.remove('in')
      if(num === 3){
        num = 3;
      }else{
        num ++
      }
      page[num].classList.add('in')
    }else if(dy< -16){//向下滑动
      page[num].classList.remove('in')
      if(num === 0){
        num = 0;
      }else{
        num --
      }
      page[num].classList.add('in') 
    }
    //progress 移动位置
    step.setAttribute('cy', num * 14 + 5)
  },false)
}
//part2点击展示项目
function showPlan () {
  var apDetail = document.getElementsByClassName('ap_detail_item'),
      len = apDetail.length,
      i,j;
      for(i = 0; i < len; i++){
        apDetail[i].addEventListener('click', function (ev) {
          for(j = 0; j < len; j++){
            apDetail[j].classList.remove('act')
          }
          this.classList.add('act')
        },false)
      }
}
//隐藏load页面
function hideLoad () {
  var load = document.getElementById('load');
  load.style.display = 'none';
}
init()
