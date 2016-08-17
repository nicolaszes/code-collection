//跨浏览器兼容的工具函数
function addEvent(element, type, handler) {
	if (element.addEventListener) {
		element.addEventListener(type, handler);
	} else if (element.attachEvent) {
		element.attachEvent('on' + type, handler);
	} else {
		element['on' + type] = handler;
	}
}

//将遍历的节点顺序存入nodeList队列中，然后一个个的取出染色
var nodeList = [];
var timer;
// var currentNode;

//元素被遍历到之后，进行渲染
var render = function() {
	currentNode.style.backgroundColor = 'white';
	if (nodeList.length == 0) {
		clearInterval(timer);
	} else {
		currentNode = nodeList.shift();
		currentNode.style.backgroundColor = '#2D7D9A';
	}
};

//所有传入参数都是一个Element对象
//前序排列
var preOrder = function(e) {
	//当前节点入队
	nodeList.push(e);
	//递归遍历左右子树
	if (e.firstElementChild) preOrder(e.firstElementChild);
    if (e.lastElementChild) preOrder(e.lastElementChild);
};


//中序排列
var inOrder = function(e) {
	//递归遍历左子树
	if (e.firstElementChild) inOrder(e.firstElementChild);
	//当前节点入队
	nodeList.push(e);
	//递归遍历右子树
	if (e.lastElementChild) inOrder(e.lastElementChild);
};


//后序排列
var postOrder = function(e) {
	//递归遍历左子树
	if (e.firstElementChild) postOrder(e.firstElementChild);
	//递归遍历右子树
	if (e.lastElementChild) postOrder(e.lastElementChild);
	//当前节点入队
	nodeList.push(e);
};


var btnHandler = function(e) {
    var target = e.target || e.srcElement;
    var option = document.getElementsByName('speed');

    if (option[0].checked) var interval = 100;
    else if (option[1].checked) var interval = 400;
    else var interval = 700;
    
    //若有正在执行的动画，则立即停止
    currentNode = document.getElementById('root');
    if(currentNode != null) currentNode.style.backgroundColor = 'white';
    
    nodeList.length = 0; // 清空队列
    clearInterval(timer); // 停止动画

    switch (target.id) {
	    case 'preOrder':
	        preOrder(currentNode);
	        break;
        case 'inOrder':
            inOrder(currentNode);
            break;
        case 'postOrder':
            postOrder(currentNode);
            break;
    }

    timer = setInterval(render, interval);
};

addEvent(document.getElementById('preOrder'), 'click', btnHandler);
addEvent(document.getElementById('inOrder'), 'click', btnHandler);
addEvent(document.getElementById('postOrder'), 'click', btnHandler);