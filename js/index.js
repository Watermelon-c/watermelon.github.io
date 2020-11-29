//启动广告
// let bgobj = {
// 	timer: null,
// 	closeTimer: 4,
// 	close() {
// 		$('.closeBg').click(function() {
// 			$(this).parent().fadeOut(1000);
// 		})
// 	},
// 	autoClose() {
// 		this.timer = setInterval(() => {
// 			this.closeTimer--;
// 			if (this.closeTimer <= 0){
// 				$('.startbg').fadeOut(1000);
// 				clearInterval(this.timer);
// 			} 
// 			$('.closeBg span').html(`${this.closeTimer}s | `);
// 		}, 1000);
// 	}
// }
// bgobj.close();
// bgobj.autoClose();



// 顶部导航
// jsonp请求数据函数
function getData(tag = 'news_tech') {
	$.ajax({
		url: 'http://m.toutiao.com/list/',
		type: 'get',
		dataType: 'jsonp',
		data: {
			tag: tag, //新闻类型
			ac: 'wap', //手机端
			format: 'json_raw',
			as: 'A17538D54D106FF', //随机获取
			cp: '585DF0A65F0F1E1', //随机获取
			min_behot_time: '148491611253',
		},
		success(k) {
			getNews(k)
		},
		error(e) {
			console.log(e);
			throw Error('获取出错');
		}
	})
}
getData();


// 渲染数据
var container = document.querySelector('.container');
let getNews = (k) => {
	let data = k['data'];
	for ({
			title,
			source,
			comment_count,
			image_url
		} of data) {
		let img = image_url ? `<img src="${image_url}" />` : '';
		let newsDiv =
			`
						<div class="newscon">
							<div class="con">
								<p class="title">${title}</p>
								<div class="newsimg">
									${img}
								</div>
							</div>
							
							<div class="msg clear">
								<div class="author">${source}</div>
								<div class="commentnum">${comment_count}条评论</div>
								<div class="close floatR">
									<img src="images/err.jpg" >
								</div>
							</div>
						</div>
				 `;
		container.insertAdjacentHTML('beforeEnd', newsDiv);
	}
}



// 点击获取指定类型新闻
$('.header-nav ul a[class!="xs"]').click(function() {
	// 排他
	$(this).addClass('active').parent().siblings().find('a').removeClass('active');
	// 获取自定义属性新闻类型
	let newsType = $(this).attr('data-type');
	// 清空上一个类型文章
	$('.container').html('');
	// 渲染当前类型文章
	getData(newsType);
});



//底部导航
$('.footer ul li').click(function() {
	$(this).addClass('active').siblings().removeClass('active');
})


$('.container .newscon .msg .close img').click(function() {
	$(this).parents('.newscon').remove();
	console.log($(this).parents('.msg'));
})


// 内容盒子滑动
class ConboxMove {
	constructor() {
		this.dom = $('.container'); //内容盒子
		this.start = 0; //开始位置
		this.moveY = 0; //移动高度
		this.prev = 0; //上次移动的高度
		this.domHeight = 0; //内容高度
		this.maxTop = 0; //最大高度
		this.move();
	}
	move() {
		//开始触摸
		this.dom.on('touchstart', (e) => {
			this.start = e.originalEvent.targetTouches[0]['pageY'];
			this.domHeight = this.dom.outerHeight(true);
			this.minTop = $(window).height() - this.domHeight;
			console.log(this.moveY);
		})

		//触摸移动
		this.dom.on('touchmove', (e) => {
			// 移动距离=移动的高度-点击的位置+上次移动的高度
			this.moveY = e.originalEvent.targetTouches[0]['pageY'] - this.start ;
			//最大移动高度到200px
			if (this.moveY > 200) {
				this.moveY = 200;
				//最小移动高度是视口高度-内容高度,允许多移动-300px	
			} else if (this.moveY < (this.minTop - 300) && this.moveY < 0) {
				this.moveY = this.minTop - 300;
			}
			//设置位置
			this.dom.css('marginTop', this.moveY+ this.prev);
		})

		// 触摸结束
		this.dom.on('touchend', (e) => {
			//滑动距离大于200px刷新当前类型新闻
			if (this.moveY >= 200) this.pullDownFlush();
			if (this.moveY > 0) {
				this.moveY=this.prev = this.maxTop;
			} else if (this.moveY <= this.minTop) {
				
				
				this.prev = this.minTop - 100;
			} else {
				this.prev = this.moveY;
				return;
			}
			this.dom.stop().animate({
				marginTop: this.prev
			}, 1000);
			console.log(this.dom.offset().top);
		})
	}

	//下拉刷新
	pullDownFlush() {
		//找到当前新闻类型
		let hasClass = $('.header-nav ul a').filter('.active').attr('data-type');
		//小点点动画显示
		$('.flush').css('display', 'block');
		//小点点3.5秒后消失
		$('.flush').stop().fadeOut(3500);
		//3秒后刷新页面
		setTimeout(() => {
			$('.container').html('');
			getData(hasClass);
		}, 3000)

	}
}
// 640-1542 = -902
new ConboxMove();
var footLis = document.querySelectorAll(".footer ul li");
footLis[0].onclick = function(){
    window.location.href="#"
}
footLis[1].onclick = function(){
    window.location.href="NewsPage/index.html"
}
footLis[2].onclick = function(){
    window.location.href="./VideoPage/html/tt-video.html"
}
footLis[3].onclick = function(){
    window.location.href="./LoginPage/log-index.html"
}
