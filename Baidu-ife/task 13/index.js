function DisplayAirData() {
	let aqiInput = document.getElementById("aqi-input");
	let	button = document.getElementById("button");
	let	aqiDisplay = document.getElementById("aqi-display");
	
	// 获取aqi-input输入的值，并显示在aqi-display中
	function updateDisplay() {
		//判断输入的内容
		if (aqiInput.value.trim().match(/^[0-9]+$/)) {
			aqiDisplay.innerText = aqiInput.value;
		} else {
			alert ("请输入正确的数字!");
			aqiDisplay.innerText = "输入错误!";
		}
	}

	//给按钮button绑定一个点击事件
	button.onclick = updateDisplay();
	
	// enter键入
	aqiInput.onkeydown = function(evt) {
		if (evt.keyCode === 13) {
			updateDisplay();
		}
	};
};

DisplayAirData();