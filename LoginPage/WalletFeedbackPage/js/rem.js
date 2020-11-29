// 自执行函数
(function (doc, win) { // 形参 doc, win
    //获取根元素  html
    var docEl = doc.documentElement;
    //监听浏览器（页面）宽度的尺寸改变  事件名称
    var  resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    // 定义设置根元素字体大小的函数
    var recalc = function () {
        // 获取页面的宽度(可视区的宽度)  offset  client scroll
        var clientWidth = docEl.clientWidth;
        // console.log({clientWidth})
        // 判断是否获取页面宽度 没有直接终止代码
        if (!clientWidth) return;
        // 判断页面宽度是否大于等于 640px
        if(clientWidth >= 640) clientWidth = 640; 
        // 判断页面宽度是否小于等于
        // 设置根元素的字体大小 320
        if(clientWidth <= 320) clientWidth = 320; 
        // 指定了html在 320px 屏幕下的字体 为 1rem = 20px
        docEl.style.fontSize = 24 * (clientWidth / 320) + 'px';
    };
    // 判断浏览器是否支持 addEventListener api
    if (!doc.addEventListener) return;
    // 监听页面宽度的变化事件（resizeEvt） 执行设置根元素字体大小的处理逻辑（recalc）
    win.addEventListener(resizeEvt, recalc, false);
    // 初始化  onload   
    doc.addEventListener('DOMContentLoaded', recalc, false);

})(document, window);//实参
// 备注：利用脚本，根据页面屏幕宽度去改变根元素字体大小

window.onmousedown = ()=>{
    return false;
}