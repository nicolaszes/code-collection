
/**
 * getData方法
 * 读取id为source的列表，获取其中城市名字及城市对应的空气质量
 * 返回一个数组，格式见函数中示例
 */
let data = [];

function $(id) {
    return document.getElementById(id);
}

function getData() {
    let source = $('source').getElementsByTagName('li');

    //循环遍历列表中的内容
    for (let i = 0; i < source.length; i++) {
        let city = source[i].innerText.match(/(.*?)空气/)[1]; // 使用match函数来检索字符串
        let num = source[i].getElementsByTagName('b')[0].innerText;
        data.push([city, num]);
        /*
        data = [
          ["北京", 90],
          ["北京", 90]
          ……
        ]
        */
    }
    return data;
}

/**
 * sortAqiData
 * 按空气质量对data进行从小到大的排序
 * 返回一个排序后的数组
 */
function sortAqiData(data) {
    data.sort( (a,b) => {
        return a[1] - b[1];
    });
    return data;
}

/**
 * render
 * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
 * 格式见ul中的注释的部分
 */
function render(data) {
    let air = "";
    for (let i = 0; i < data.length; i++) {
        air += `<li>第${i + 1}名:${data[i][0]}空气质量:<b>${data[i][1]}</b></li>`;
    }

    $('resort').innerHTML = air; // innerHTML 效率更高
}

// 定义 button按钮事件
function btnHandle() {
    let aqiData = getData();
    aqiData = sortAqiData(aqiData);
    render(aqiData);

    $('sort-btn').disabled = true;
}


function init() {
    // 在这下面给sort-btn绑定一个点击事件，点击时触发btnHandle函数
    $('sort-btn').onclick = btnHandle;
}

init();