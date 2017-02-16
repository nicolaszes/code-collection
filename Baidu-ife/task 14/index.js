let aqiData = [
    ["北京", 90],
    ["上海", 50],
    ["福州", 10],
    ["广州", 50],
    ["成都", 90],
    ["西安", 100]
];

(function () {
   
    //先进行过滤，选出空气质量指数大于60的城市
    let newData = aqiData.filter(item => {
        return (item[1] > 60);
    });

    //对指数大于60的城市进行降序排序
    newData.sort( (a, b) => {
        return b[1] - a[1];
    });

    //将结果显示
    let aqiList = document.getElementById('aqi-list');
    for(let i = 0; i < newData.length; i++){
        aqiList.innerHTML += `<li>第${i + 1}名：${newData[i][0]}${newData[i][1]}</li>`;
    }
})();