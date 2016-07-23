var data = [];
		data[0] = new Student("小明", 80, 90, 70);
		data[1] = new Student("小红", 90, 60, 90);
		data[2] = new Student("小亮", 60, 100, 70);
		data[3] = new Student("小李", 50, 95, 40);
		data[4] = new Student("小华", 70, 80, 60);

function Student(name, chinese, math, english){
  this.name = name;
  this.chinese = chinese;
  this.math = math;
  this.english = english;
  this.total = math + chinese + english;
}

//渲染表格
var table = document.getElementById('tab');

function renderTable(data){
  for(var i = 0; i < data.length; i++){
    var row = "<tr><td>" + data[i].name + "</td><td>" + data[i].chinese + "</td><td>" + data[i].math +"</td><td>" + data[i].english + "</td><td>" + data[i].total + "</td></tr>";
    table.innerHTML += row;
  }
}

//清空表格
function deleteTable(table){
  var len = table.rows.length; //获取到表格的行的数量
  for(var i = 1; i < len; i++){
    table.deleteRow(1);
  }
}


renderTable(data);