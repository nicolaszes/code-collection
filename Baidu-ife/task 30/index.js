$ = function(el) {
    return document.querySelector(el);
};

$$ = function(el) {
    return document.querySelectorAll(el);
};

var checkResult = {
    right: false,
    tip: '',
};

//获取输入框集合
var inputEles = [$('#ip1'), $('#ip2'), $('#ip3'), $('#ip4'), $('#ip5')];
//获取对应的验证信息
var originTip = ['必填，长度为4-16个字符', '6到16位数字和字母', '重复输入密码', 'example@haha.com', '请输入11位手机号码'];

//定义函数检查输入信息
function checkValue(ele) {
    var str = ele.value.trim();

    //判断输入长度
    if (str.length === 0) {
        checkResult.right = false;
        checkResult.tip = '输入不能为空';
        return;
    }

    //名称输入判断
    if (ele === inputEles[0]) {
        var len = str.replace(new RegExp('[^\x00-\xff]', 'g'), 'aa').length;
        if (len >= 4 && len <= 16) {
            checkResult.right = true;
            checkResult.tip = '名称可用';
        } else {
            checkResult.right = false;
            checkResult.tip = '请检查名称字符数';
        }
    }

    //密码格式输入判断
    if (ele === inputEles[1]) {
        if (str.match(/^[a-zA-Z0-9]{6,16}$/)) {
            checkResult.right = true;
            checkResult.tip = '密码格式正确';
        } else {
            checkResult.right = false;
            checkResult.tip = '请输入6到16位字符且只能为数字和字母';
        }
    }

    //判断两次密码输入是否相同
    if (ele === inputEles[2]) {
        if (str === inputEles[1].value.trim()) {
            checkResult.right = true;
            checkResult.tip = '密码正确';
        } else {
            checkResult.right = false;
            checkResult.tip = '两次密码输入要相同';
        }
    }

    //邮箱格式输入判断
    if (ele === inputEles[3]) {
        var reg = new RegExp('^([a-zA-Z0-9_\.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$', 'i');
        if (str.match(reg)) {
            checkResult.right = true;
            checkResult.tip = '邮箱可用';
        } else {
            checkResult.right = false;
            checkResult.tip = '邮箱格式错误';
        }
    }

    //号码格式输入判断
    if (ele === inputEles[4]) {
        if (str.match(/^1\d{10}$/)) {
            checkResult.right = true;
            checkResult.tip = '号码可用';
        } else {
            checkResult.right = false;
            checkResult.tip = '号码格式错误';
        }
    }
}

//给输入框绑定对应的函数
for (var i = 0; i < inputEles.length; i++) {
    //
    inputEles[i].addEventListener('blur', function(e) {
        checkValue(e.target);
        var span = e.target.parentElement.getElementsByTagName('span')[0];
        span.innerHTML = checkResult.tip;

        if (checkResult.right) {
            e.target.style.border = '2px solid green';
            span.style.color = 'green';
        } else {
            e.target.style.border = '2px solid red';
            span.style.color = 'red';
        }
    });

    inputEles[i].addEventListener('focus', function(e) {
        var index = inputEles.indexOf(e.target);
        var span = e.target.parentElement.getElementsByTagName('span')[0];
        span.innerHTML = originTip[index];
        span.style.visibility = 'visible';
        span.style.color = 'gray';
    });
}

//给提交按钮绑定点击事件
$('#check').addEventListener('click', function(e) {
    var right = true;
    for (var i = 0; i < inputEles.length; i++) {
        var input = inputEles[i];
        checkValue(input);
        var span = input.parentElement.getElementsByTagName('span')[0];
        span.style.visibility = 'visible';
        span.innerHTML = checkResult.tip;

        if (checkResult.right) {
            input.style.border = '2px solid green';
            span.style.color = 'green';
        } else {
            input.style.border = '2px solid red';
            span.style.color = 'red';
            right = false;
        }
    }

    if (right) {
        alert('提交成功');
    } else {
        alert('提交失败，请检查输入');
    }
});