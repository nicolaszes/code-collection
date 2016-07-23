
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var cityInput = document.getElementById("aqi-city-input");
var aqiInput = document.getElementById("aqi-value-input");

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = cityInput.value.trim();
    var aqi = aqiInput.value.trim();

    if(!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
        alert("城市名必须为中英文字符！");
        return;
    }
    if(!aqi.match(/^\d+$/)) {
        alert("空气质量指数必须为整数！");
        return;
    }
    aqiData[city] = aqi;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var items = "<tr><th>城市</th><th>空气质量</th><th>操作</th></tr>";
    for(var city in aqiData){
        items += "<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button data-city='"+city+"'>删除</button></td></tr>";
    }
    document.getElementById("aqi-table").innerHTML = city ? items : "";


	// var Table = document.getElementById('aqi-table');

	// //删除子节点
	// function removeAllChild(Table){
	//     while(Table.hasChildNodes()) 
	//     {
	//         Table.removeChild(Table.firstChild);
	//     }
	// }

 //    // 标题栏
 //    var headTr = document.createElement('tr');
 //    var headCity = document.createElement('th');
 //    var headAqi = document.createElement('th');
 //    var headOption = document.createElement('th');

 //    headCity.innerHTML = "城市";
 //    headAqi.innerHTML = "空气质量";
 //    headOption.innerHTML = "操作";

 //    headTr.appendChild(headCity);
 //    headTr.appendChild(headAqi);
 //    headTr.appendChild(headOption);
 //    Table.appendChild(headTr);

 //    // 内容
 //    for (var city in aqiData) {
	//     var contentTr = document.createElement("tr");
	//     var contentCity = document.createElement("td");
	//     var contentAqi = document.createElement("td");
	//     var contentBtn = document.createElement("td");

	//     contentCity.innerHTML = city;
	//     contentAqi.innerHTML = aqiData[city];
	//     contentBtn.innerHTML = "<button>删除</button>";

	//     contentTr.appendChild(contentCity);
	//     contentTr.appendChild(contentAqi);
	//     contentTr.appendChild(contentBtn);
	//     Table.appendChild(contentTr);	
 //    };

    console.log(aqiData);
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
    // do sth.
    delete aqiData[city];
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    document.getElementById("add-btn").addEventListener("click", addBtnHandle);
    // enter键入
    // document.getElementById("add-btn").addEventListener("keydown", addBtnHandle);
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    document.getElementById("aqi-table").addEventListener("click", function(event){
        if(event.target.nodeName.toLowerCase() === 'button') delBtnHandle.call(null, event.target.dataset.city);
    });
}

init();