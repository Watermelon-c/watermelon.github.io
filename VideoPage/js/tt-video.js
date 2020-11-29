var fabu=document.querySelector("#icon_video>a");
// 监听页面宽度改变而改变html字体大小
window.onload = () => {
    let html = document.querySelector("html");
    html.style['fontSize'] = html.offsetWidth / 320*16+'px';
    addEventListener('resize',()=>{
        if(html.offsetWidth<340){
            fabu.innerHTML="";
        }else{
            fabu.innerHTML="发布";
        }
        html.style['fontSize'] = html.offsetWidth /320*16+'px';
    })
}

//获取视频数据函数
function get(options){
    let xhr=new XMLHttpRequest();
    xhr.open("get",options.url);
    xhr.send();
    xhr.onreadystatechange=()=>{
        if(xhr.readyState==4){
            if(xhr.status==200){
                options.success(xhr.responseText);
            }
        }
    }
}

var ul=document.querySelector(".main>ul");
var tt_video,tt_play,lis;
function getvideo(url,classify){
    get({
        url:url,
        success:function(res){
            var data=JSON.parse(res)[classify].data.channelFeed.Data;
            data.forEach((item,index,data)=>{
                let playnum=item.data.playNum;
                let give=item.data.duration;

                playnum=setdanwei(playnum);
                give=setdanwei(give);

                let user_video=`<li>
                        <video src="../video/game_bgVideo.webm"></video>
                        <div class="bottom_text">
                            <ul>
                                <li class="pizhu">${item.data.user_info.name}</li>
                                <li class="title">${item.data.title}</li>
                                <li class="video_count">
                                    <div>
                                        <span class="iconfont icon-bofang1"></span>
                                        <a href="JavaScript:void(0)">${playnum}播放</a>
                                    </div>
                                    <span class="give">${give}赞</span>
                                </li>
                            </ul>
                        </div>
                        <span class="iconfont icon-iconset0481 show"></span>
                        <span class="iconfont icon-bofang hide"></span>
                        <span class="iconfont icon-icon-- hide"></span>
                        <div class="zzc"></div>
                    </li>
                `;
                ul.innerHTML+=user_video;
                lis=document.querySelectorAll(".main>ul>li");
                tt_video=document.querySelectorAll(".main>ul>li>video");
                tt_play=document.querySelectorAll(".main>ul>li>.bottom_text");
                
            })
            let bofang=document.querySelectorAll(".icon-iconset0481");
            let zanting=document.querySelectorAll(".icon-bofang");
            let chongfu=document.querySelectorAll(".icon-icon--");
            let zzc=document.querySelectorAll(".zzc");
            for(let i=0;i<lis.length;i++){
                let isplay=false;
                //给双数的视频加白边
                if(i%2!=0){
                    lis[i].style.borderLeft="solid 1px white";
                }

                zzc[i].onclick=()=>{
                    if(isplay){
                        tt_video[i].pause();
                        bofang[i].classList.remove("hide");
                        bofang[i].classList.add("show");
                        zzc[i].style.opacity="1";
                        isplay=false;
                    }else{
                        tt_video[i].play();
                        bofang[i].classList.add("hide");
                        bofang[i].classList.remove("show");

                        showbtn(zanting[i]);

                        zzc[i].style.opacity="0";
                        isplay=true;
                    }
                }
                bofang[i].onclick=(e)=>{
                    e.stopPropagation();
                    tt_video[i].play();
                    zzc[i].style.opacity="0";
                    bofang[i].classList.add("hide");
                    bofang[i].classList.remove("show");
                    isplay=true;
                    
                    showbtn(zanting[i]);

                }                    
                tt_video[i].onended=()=>{
                    chongfu[i].classList.add("show");
                    chongfu[i].classList.remove("hide");
                    bofang[i].classList.add("hide");
                    bofang[i].classList.remove("show");
                    zanting[i].classList.remove("show");
                    zanting[i].classList.add("hide");
                    zzc[i].style.opacity="1";
                    tt_video[i].poster=true;
                    chongfu[i].onclick=(e)=>{
                        e.stopPropagation();
                        zzc[i].style.opacity="0";
                        chongfu[i].classList.remove("show");
                        chongfu[i].classList.add("hide");
                        tt_video[i].play();
                    }   
                }
            }
        }
    })
}

//播放显示按钮
function showbtn(btn){
    btn.classList.add("show");
    btn.classList.remove("hide");
    setTimeout(() => {
        btn.classList.add("hide");
        btn.classList.remove("show");
    }, 500);
}

//添加单位的函数
function setdanwei(num){
    if(num>=10000){
        num=num/10000;
        num=parseInt(num)+"万";
    }else{
        num=parseInt(num);
    }
    return num;
}
//点击按钮切换数据
let video_ul=document.querySelector(".main>ul");
let btn=document.querySelectorAll("#head_ul>li");
var classify;
for(let i=0;i<btn.length;i++){
    btn[i].onclick=()=>{
        document.querySelector("#head_ul>li.current").removeAttribute("class");
        btn[i].className="current";
        video_ul.innerHTML="";
        switch(i){
            case 0 : classify="attention";
            break;
            case 1 : classify="recommend";
            break;
            case 2 : classify="game";
            break;
        }
        getvideo("../json/tt-video.json",classify);
    }
}
//默认显示推荐视频
btn[1].click();

var footLis = document.querySelectorAll(".footer ul li");
        footLis[0].onclick = function () {
            window.location.href = "../../index.html"
        }
        footLis[1].onclick = function () {
            window.location.href = "../../NewsPage/index.html"
        }
        footLis[2].onclick = function () {
            window.location.href = "#"
        }
        footLis[3].onclick = function () {
            window.location.href = "../../LoginPage/log-index.html"
        }