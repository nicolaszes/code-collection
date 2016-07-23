window.onload = drag;

function drag() {
    var oTitle = document.getElementById("title");

    //拖曳操作
    oTitle.onmousedown = fnDown;
}

function fnDown(event) {
    event = event || window.event;
    var oDrag = document.getElementById("logBox"),

        //光标按下时，光标和面板之间的距离
        disX = event.clientX-oDrag.offsetLeft,
        disY = event.clientY-oDrag.offsetTop;

    //移动
    document.onmousemove = function(event) {
        event = event || window.event;
        fnMove(event,disX,disY);
    }

    //释放鼠标
    document.onmouseup = function() {
        document.onmousemove = null;
        document.onmouseup = null;
    }
}

function fnMove(e,posX,posY) {
    var oDrag = document.getElementById("logBox"),
        l = e.clientX-posX,
        t = e.clientY-posY,
        winW = document.documentElement.clientWidth || document.body.clientWidth,
        winH = document.documentElement.clientHeight || document.body.clientHeight;
        maxW = winW - oDrag.offsetWidth-10,
        maxH = winH - oDrag.offsetHeight-10;

    //限制范围
    if (l<0) {
        l = 10;
    }
    else if (l>maxW) {
        l = maxW;
    }

    if (t<0) {
        t = 10;
    }
    else if (t>maxH) {
        t = maxH;
    }
    oDrag.style.left = l+"px";
    oDrag.style.top = t+"px";
}
