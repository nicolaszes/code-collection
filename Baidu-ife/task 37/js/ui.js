//给获取DOM节点定义函数
var $ = function(el) {
    return document.querySelector(el);
};

var $$ = function(el) {
    return document.querySelectorAll(el);
};

//创建新元素
var createEle = function(tagName) {
    return document.createElement(tagName);
};

//创建新的文本节点
var createNode = function(text) {
    return document.createTextNode(text);
};


// 兼容的事件方法
//绑定事件
var addEvent = function (ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent('on' + event, hanlder);
    } else {
        ele['on' + event] = hanlder;
    }
};

//移除事件
var removeEvent = function (ele, event, hanlder) {
    if (ele.removeEventListener) {
        ele.removeEventListener(event, hanlder, false);
    } else if (ele.detachEvent) {
        ele.detachEvent('on' + event, hanlder);
    } else {
        ele['on' + event] = null;
    }
};

//点击登录按钮添加DOM节点
var logInPanel = function (element) {
    this.e = element;
    this.visible = false;
    this.mask = null;
    this.animateTime = 600;

    this.init();
};


//给登录面板添加prototype属性
logInPanel.prototype = {
    show: function() {
        this.visible = true;
        // this.e.style.transform = 'translate(-50%, -50%) scale(1,1)';
        this.mask.style.visibility = 'visible';
    },

    hide: function() {
        this.visible = false;
        // this.e.style.transform = 'translate(-50%, -50%) scale(0,0)';

        var self = this;
        setTimeout(function() {
            self.mask.style.visibility = 'hidden';
        }, this.animateTime - 10);
    },

    init: function() {
        var container = $('#container');

        //添加遮罩层
        var mask = createEle('div');
        mask.className = 'log-mask';
        mask.id = 'log_mask';

        //插入遮罩层
        container.appendChild(mask);

        //添加登录面板
        var logBox = createEle('div');
        logBox.className = 'log-box';
        logBox.id = 'log_box';

        //插入登录面板
        container.appendChild(logBox);

        //添加登录面板顶部
        var header = createEle('div');
        var span = createEle('span');
        var spanNode = createNode('登录');
        var closeButton = createEle('button');
        var closeButtonNode = createNode('X');

        closeButton.className = 'close-btn';

        //插入登录面板顶部
        logBox.appendChild(header);
        header.appendChild(span);
        span.appendChild(spanNode);
        header.appendChild(closeButton);
        closeButton.appendChild(closeButtonNode);

        //添加登录面板主体
        var input1 = createEle('input');
        var input2 = createEle('input');
        var button = createEle('button');
        var buttonNode = createNode('确认');

        input1.placeholder = '请输入用户名/邮箱';
        input2.placeholder = '请输入密码';
        button.className = 'confirm-btn';
        button.id = 'confirm_btn';

        //将节点插入面板主体
        logBox.appendChild(input1);
        logBox.appendChild(input2);
        logBox.appendChild(button);
        button.appendChild(buttonNode);
    },
    drag: function() {},
    scale: function() {},
};



(function() {
    var layer = logInPanel();
        layer.show();

    addEvent($('#log_btn'), 'click', function() {
        layer.show();
    });

    addEvent($('#close_btn'), 'click', function() {
        layer.hide();
    });

    addEvent($('#log_mask'), 'click', function() {
        layer.hide();
    });
})();