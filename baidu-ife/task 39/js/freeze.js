var table = document.getElementById('tab'),
		title = document.getElementById('title');

//向上滚动函数
function scrollEvent() {

	//文本最顶端和表格的最顶端之间的距离 
	var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;

	//判断表格顶部与scrolltop之间的距离
	if (table.offsetTop - scrolltop <= 0) {
		title.style.position = "fixed"; //表格固定
		title.style.top = 0;  //表格顶部置于文本顶端
		if (table.offsetTop + parseInt(getComputedStyle(table).height) - scrolltop <= 0) {
					title.style.position="absolute";
		}
	}
	else {
		title.style.position = "static";
	}
}


document.addEventListener("DOMMouseScroll",scrollEvent,false);


window.onscroll = document.onscroll = scrollEvent;