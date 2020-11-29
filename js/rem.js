	let html = document.querySelector("html");
		html.style['fontSize'] = html.offsetWidth / 750 * 100 + 'px';
		addEventListener('resize', () => {
			html.style['fontSize'] = html.offsetWidth / 750 * 100 + 'px';
		})
	console.log('昨日头条v1');