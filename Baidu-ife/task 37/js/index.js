/*
var o = {  
    trans: function (el){  
        var i,  
        tempArr = el.split('_'),  
        len = tempArr.length;  
        for(i = 1; i < len; i++){  
            tempArr[i] = tempArr[i].charAt(0).toUpperCase() + tempArr[i].substr(1,tempArr[i].length-1);  
        }  
        el = tempArr.join('');  
        return el;  
    }  
};  
o.trans(el);  
*/

var logBox = document.getElementById('log_box');
var logBtn = document.getElementById('log_btn');
var logMask = document.getElementById('log_mask');
var logTitle = document.getElementById('log_title');
var closeBtn = document.getElementById('close_btn');
var confirmBtn = document.getElementById('confirm_btn');


//跨浏览器事件处理程序
var eventUtil = {
    addHandler: function (element,type,handler) {
        if (element.addEventListener) {
            element.addEventListener(type,handler,false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type,handler);
        } else {
            element['on' + type] = handler;
        }
    }
};

//弹出登录面板
var boxDisplay = function () {
    logMask.style.display = 'block';
    logBox.style.display = 'block';
};

//隐藏登录面板
var boxHide = function () {
    logMask.style.display = 'none';
    logBox.style.display = 'none';
};

eventUtil.addHandler(logBtn, 'click', boxDisplay);
eventUtil.addHandler(closeBtn, 'click', boxHide);
eventUtil.addHandler(confirmBtn, 'click', boxHide);
eventUtil.addHandler(logMask, 'click', boxHide);


//实现登录面板的拖曳操作
(function drag() {
    //拖曳操作
    logTitle.onmousedown = fnDown;

    function fnDown(event) {
        event = event || window.event;
        var logBox = document.getElementById('log_box'),

        //光标按下时，光标和面板之间的距离
        disX = event.clientX-logBox.offsetLeft,
        disY = event.clientY-logBox.offsetTop;

        //点击鼠标移动登录面板
        document.onmousemove = function(event) {
            event = event || window.event; //兼容IE
            fnMove(event,disX,disY);
        };

        //释放鼠标松开登录面板
        document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    }

    function fnMove(e,posX,posY) {
        var l = e.clientX-posX;
        var t = e.clientY-posY;
        //得到登录面板的最大移动宽度和高度
        var winW = document.documentElement.clientWidth || document.body.clientWidth;
        var winH = document.documentElement.clientHeight || document.body.clientHeight;
        //得到登录面板的最大移动宽度和高度
        var maxW = winW - logBox.offsetWidth - 10;
        var maxH = winH - logBox.offsetHeight - 10;

        //限制范围登录面板的移动范围
        //当登录面板与屏幕周边距离小于10px时
        if (l < 0) {
            l = 10;
        } else if (l > maxW) {
            l = maxW;
        }

        //当登录面板与屏幕周边距离小于10px时
        if (t < 0) {
            t = 10;
        } else if (t > maxH) {
            t = maxH;
        }
        logBox.style.left = l+'px';
        logBox.style.top = t+'px';
    }
})();