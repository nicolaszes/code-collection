//升序
function upSort(data,i) {
  data.sort(function(a, b){
    return a[i] - b[i];
  });
  return data;
}

//降序
function downSort(data,i) {
  data.sort(function(a, b){
    return b[i] - a[i];
  });
  return data;
}


function sortClick(){
  var flag = {
    "chinese": true,
    "math": true,
    "english": true,
    "total": true
  };
  table.onclick = function(event){
    event = event || window.event;
    var target = event.target || event.srcElement;

    //取得触发事件的当前对象的TYPE，把它转换成小写，并判断是否等于th
    if(target.tagName.toLowerCase() === "th"){
      if(flag[target.id] !== true){
        upSort(data, target.id);
      }
      else{
        downSort(data, target.id);
      }
      deleteTable(table);
      renderTable(data);
      flag[target.id] = !flag[target.id];
    }
  };
}


sortClick();