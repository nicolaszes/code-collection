(function () {
	'use strict';
	var timer;
	var doing = false;
	var BFindex = 0;//广度优先遍历自增标识符

	// 深度优先遍历
	function depthFirstTraversal(e,nodeList){
		nodeList.push(e);
		for(var i = 0;i < e.children.length; i++){
			depthFirstTraversal(e.children[i],nodeList);
		}	
	}

	//广度优先遍历
	function breadthFirstTraversal(e, nodeList) {
		if (e) {
			nodeList.push(e);
			breadthFirstTraversal(e.nextElementSibling, nodeList);
			e = nodeList[BFindex++];
			breadthFirstTraversal(e.firstElementChild, nodeList);
		}
	}


	//根据按钮的选中情况切换速度
	var option = document.getElementsByTagName('input');

	//判断按钮进行速度切换
	var interval = '';
	if (option[1].checked) interval = 100;
	else if (option[2].checked) interval = 400;
	else interval = 700;
		
	console.log(interval);

	//渲染动画，有文本传入则可执行搜索
	var traverseRender =  function (nodeList,inputText){
		var i = 0;
		var len = nodeList.length;

		//判断inputText与div中的值是否相等
		if ( nodeList[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g, '') === inputText) {
			nodeList[i].className = 'found';
			// doing = false;
			// setInterval(timer);
		} else {
			nodeList[i++].className = 'active';
		}

		var doing = true;
		var timer = setInterval(function (){
			nodeList[i - 1].className = '';

			if(i < len){
				if ( nodeList[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g, '') === inputText ) {
					nodeList[i].className = 'found';
					// doing = false;
					// setInterval(timer);
				} else {
					nodeList[i++].className = 'active';
				}
			} else {
				doing = false;
				clearInterval(timer);
			}
		}, interval);

	};


	//打包遍历函数
	var traverse = function (i, nodeList){
		//获取当前节点的位置
		var currentNode = document.getElementById('root');
		var nodeList = [];

		switch(i){
			case 0: depthFirstTraversal(currentNode,nodeList);
				break;
			case 1: BFindex = 0;
				    breadthFirstTraversal(currentNode,nodeList);
				break;
			case 2: var inputText = document.getElementsByTagName('input').value.trim();
				    depthFirstTraversal(currentNode,nodeList);
				break;
			case 3: BFindex = 0;
				    var inputText = document.getElementsByTagName('input').value.trim();
				    breadthFirstTraversal(currentNode,nodeList);
				break;
		}

		resetBG();
		setTimeout(traverseRender(nodeList,inputText),interval);
	};

	//绑定按钮事件
	function buttonClick() {
		var oBtns = document.getElementsByTagName('button');

		for (var i = 0; i < oBtns.length; i++) {
			// 闭包参数传入
			(function (i) {
				oBtns[i].onclick = function () {
					//重复点击按钮实现重新遍历
					if (doing === true) {
						doing = false;
						clearInterval(timer);
						traverse(i);
						// alert('正在遍历中!');
					} else {
						traverse(i);
					}	
				};
			})(i);
		}
	}

	// 重置所有节点样式
	function resetBG(){
		var nodeList = [];
		var currentNode = document.getElementById('root');
		depthFirstTraversal(currentNode,nodeList);
		for(var i=0;i<nodeList.length;i++){
			nodeList[i].className = 'default';
		}
	}

	buttonClick();
})();