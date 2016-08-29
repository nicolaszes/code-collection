var numInput = document.getElementById('number-input');
var arrNum = [];

//左侧进入函数
function LeftIn() {
    var value = numInput.value.trim();
    if (!value.match(/^\d+$/)) {
        alert('请输入整数！');
        return;
    }
    arrNum.unshift(value);
    renderNums();
}

//右侧进入函数
function RightIn() {
    var value = numInput.value.trim();
    if (!value.match(/^\d+$/)) {
        alert('请输入整数！');
        return;
    }
    arrNum.push(value);
    renderNums();
}

//左侧弹出函数
function LeftOut() {
    //判断数组中是否还有数字
    if (!arrNum[0]) {
        alert('没有数字可以删除');
        return;
    }

    var flag = confirm('删除左边第一个数字' + arrNum[0] + '吗？');
    if (flag) {
        arrNum.shift();
        renderNums();
    }
}

//右侧弹出函数
function RightOut() {
    //判断数组中是否还有数字
    if (!arrNum[0]) {
        alert('没有数字可以删除');
        return;
    }

    var flag = confirm('删除右边第一个数字' + arrNum[arrNum.length - 1] + '吗？');
    if (flag) {
        arrNum.pop();
        renderNums();
    }
}

//
function onNum(numLi) {
    var index = [].indexOf.call(numLi.parentElement.children, numLi);
    arrNum.splice(index, 1);
    renderNums();
}

//给添加删除按钮绑定点击事件
function addEvents() {
    document.getElementById('left-in').addEventListener('click', LeftIn);
    document.getElementById('right-in').addEventListener('click', RightIn);
    document.getElementById('left-out').addEventListener('click', LeftOut);
    document.getElementById('right-out').addEventListener('click', RightOut);
    document.getElementById('result').addEventListener('click', function(event) {
        if (event.target && event.target.className === 'num') {
            onNum(event.target);
        }
    });
}

//渲染数字
function renderNums() {
    var items = '';
    for (var idx in arrNum) {
        items += "<li class = 'num' style='background-color: pink; margin: 3px; width: 2em; height: 2em;" +
            " display: inline-block; text-align: center; line-height: 2em;'>" + arrNum[idx] + "</li>";
    }
    document.getElementById('result').innerHTML = items;
}

//执行函数操作
function init() {
    addEvents();
    renderNums();
}

init();