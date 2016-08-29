function g(el) {
    return document.getElementById(el);
}

//跨浏览器事件处理程序
var eventUtil = {
    addHandler:function(element,type,handler) {
        if (element.addEventListener) {
            element.addEventListener(type,handler,false);
        }
        else if (element.attachEvent) {
            element.attachEvent("on" + type,handler);
        }
        else {
            element["on" + type] = handler;
        }
    }
}

//弹出登录面板
function boxDisplay() {
    selectBox.style.display = "block";
    logBox.style.display = "block";
}

//隐藏登录面板
function boxHide() {
    mask.style.display = "none";
    logBox.style.display = "none";
}

eventUtil.addHandler(caleSelect, "click", boxDisplay);