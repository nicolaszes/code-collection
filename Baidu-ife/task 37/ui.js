//点击登录按钮添加DOM节点
var DOM = (function () {
    var container = document.getElementById('container');

    //添加遮罩层
    var mask = document.createElement('div');
    mask.className = 'log-mask';
    mask.id = 'log_mask';
    // mask.style.position = 'fixed';
    // mask.style.width = '100%';
    // mask.style.height = '100%';
    // mask.style.backgroundColor = 'rgba(110,110,110,.6)';
    container.appendChild(mask);//插入遮罩层

    //添加登录面板
    var logBox = document.createElement('div');
    logBox.className = 'log-box';
    logBox.id = 'log_box';
    // logBox.style.position = 'fixed';
    // logBox.style.top = 'calc(50% - 85.5px)';
    // logBox.style.left = 'calc(50% - 120px)';

    // logBox.style.padding = '10px 30px';
    // logBox.style.width = '180px';
    // logBox.style.height = '180px';

    // logBox.style.color = '#fff';
    // logBox.style.backgroundColor = 'rgb(231,79,77)';
    // logBox.style.borderRadius = '10px';
    // logBox.style.boxShadow = '0 0 10px black';

    container.appendChild(logBox);//插入登录面板

    //添加登录面板顶部
    var header = document.createElement('div');
    var span = document.createElement('span');
    var spanNode = document.createTextNode('登录');
    // header.paddingTop ='20px';
    // header.cursor = 'move';
    // span.style.marginLeft = '-20px';
    // span.style.fontSize = '20px';


    logBox.appendChild(header);//插入登录面板顶部
    header.appendChild(span);
    span.appendChild(spanNode);

    //添加登录面板主体
    var input1 = document.createElement('input');
    var input2 = document.createElement('input');
    var button = document.createElement('button');
    var buttonNode = document.createTextNode('确认');

    // input1.style.marginTop = '20px';
    // input1.style.width = '180px';
    // input1.style.height = '25px';
    input1.placeholder = '请输入用户名/邮箱';

    // input2.style.marginTop = '20px';
    // input2.style.width = '180px';
    // input2.style.height = '25px';
    input2.placeholder = '请输入密码';

    // button.style.marginTop = '20px';
    // button.style.width = '180px';
    // button.style.height = '25px';
    // button.style.color = '#fff';
    button.style.backgroundColor = 'rgb(231,79,77)';

    //将节点插入面板主体
    logBox.appendChild(input1);
    logBox.appendChild(input2);
    logBox.appendChild(button);
    button.appendChild(buttonNode);
})();