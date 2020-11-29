
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
					_signature: '_02B4Z6wo00d01UBUdwAAAIBADRqlWRawwolAUHOAAA-sU08RFReRfAiSBWqALllpYeIUIwzGITG1PrgymsLTkpNGstkDN9cxzk6do2TripQvonMuXmUW.B1bOPx-FNgIwBEmcdp2hrV.qt4T3e'
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
		$('.header-nav ul a').click(function() {
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
	$('.footer ul li').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
	})
	
	
	
	class ConboxMove {
		constructor(){
			this.dom = $('.container');
			this.start = 0;
			this.moveY = 0;
			this.prev = 0;
			this.domHeight = 0;
			this.minTop = $(window).height()-this.domHeight;
			this.maxTop = 0;
			this.move();
		}
		move(){
			this.dom.on('touchstart',(e)=>{
				this.start = e.originalEvent.targetTouches[0]['pageY'];
				this.domHeight = this.dom.outerHeight(true);
			})
			
			this.dom.on('touchmove',(e)=>{
				this.moveY = e.originalEvent.targetTouches[0]['pageY'] - this.start + this.prev;
				if(this.moveY>200){
					this.moveY = 200;
				}else if(this.moveY<($(window).height()-this.domHeight-200) && this.moveY<0){
					this.moveY=$(window).height()-this.domHeight-200;
				}
				this.dom.css('marginTop',this.moveY);
			})
			
			this.dom.on('touchend',(e)=>{
				//滑动距离大于200px刷新当前类型新闻
				if(this.moveY>=200)this.pullDownFlush();
				if(this.moveY>0){
					this.prev=this.maxTop;
					console.log(1112);
				}else if(this.moveY<$(window).height()-this.domHeight){
					this.prev=$(window).height()-this.domHeight-200;
					console.log(111);
				}else{
					this.prev=this.moveY;
					return;
				}
				this.dom.stop().animate({marginTop:this.prev},1000);
			})
		}
		
		//下拉刷新
		pullDownFlush(){
			$('.flush').css('display','block');
			let hasClass = $('.header-nav ul a').filter('.active').attr('data-type');
			$('.flush').stop().fadeOut(3500);
			setTimeout(()=>{
			$('.container').html('');
				getData(hasClass);
			},3000)
			
		}
	}
	// 640-1542 = -902
	new ConboxMove();
	
	