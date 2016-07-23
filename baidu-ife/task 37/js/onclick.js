function g(el) {
    return getElementById(el);
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
    mask.style.display = "block";
    logBox.style.display = "block";
}

//隐藏登录面板
function boxHide() {
    mask.style.display = "none";
    logBox.style.display = "none";
}

eventUtil.addHandler(logBtn, "click", boxDisplay);
eventUtil.addHandler(closeBtn, "click", boxHide);
eventUtil.addHandler(confirmBtn, "click", boxHide);
eventUtil.addHandler(mask, "click", boxHide);