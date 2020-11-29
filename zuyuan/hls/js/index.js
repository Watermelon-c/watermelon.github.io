//移动端触摸滑动效果
//1. 手指按下侧栏列表容器标签时记录手指按下的坐标位置等信息
//2. 手指滑动的时候改变容器的垂直位置
//3. 容器的垂直位置小于0 的时候，有个缓冲区 200px高度 ，松开手指容器标签动画方式吸附顶部
//4. 容器的垂直位置小于（容器标签的父元素高度-容器标签的高度） 的时候，有个缓冲区 200px高度 ，松开手指容器标签动画方式吸附底部
//5. 否则，正常滑动侧栏菜单

let sp_ul = document.querySelector(".sp_ul");
let nav   = document.querySelector("#nav");
let li    = document.querySelectorAll(".sp_ul li");

//控制水平位置

//手指按下的位置
let startX = 0;
//当前导航条的位置
let curX   = 0;
//滑动的距离
let resX   = 0;
//可选变量
let isTouchStart = false;

//导航条的实际宽度
let width = sp_ul.offsetWidth;

//计算当航条向右边可以滑动的最大距离
let maxSide = nav.offsetWidth - width;

let rightX = 0;

//事件绑定
sp_ul.ontouchstart = function(e){
    var e = e || window.event;
    isTouchStart = true;
    //手指按下的位置
    startX = e.touches[0].pageX;
    // console.log(startX);
}


document.ontouchmove = function(event){
    var event = event || window.event;
    if(isTouchStart){
        let moveX = event.touches[0].pageX;
        rightX =  maxSide - 50 - nav.offsetWidth;
        resX = moveX - startX + curX;
        if(resX > 0){
            resX = 50;
        }
        if(resX < maxSide-50){
            resX = maxSide-50;//-446
            // console.log("ssss"+resX);
            // console.log("rightx"+rightX);
        }

        sp_ul.style['transform'] = "translateX("+resX+"px)";
        // console.log(resX);


    }
}

document.ontouchend = function(){
    if(resX > 0){
        sp_ul.style['transform'] = "translateX(0)";
        sp_ul.style['transition'] = "transform .5s linear";
        curX = resX = 0;
    }else if(resX < maxSide){
        sp_ul.style['transform'] = "translateX("+maxSide+"px)";
        sp_ul.style['transition'] = "transform .5s linear";
        curX = resX = maxSide;
        // console.log("kkjl"+resX);
        
    }else{
        curX = resX;
        console.log("当前导航条的位置"+curX);

    }
    isTouchStart = false;
}


