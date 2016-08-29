(function() {
	var aqiInput = document.getElementById("aqi-input");
		button = document.getElementById("button");
		aqiDisplay = document.getElementById("aqi-display");
	
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

	button.onclick = updateDisplay;//给按钮button绑定一个点击事件

	// enter键入
	aqiInput.onkeydown = function(evt) {
		if (evt.keyCode === 13) {
			updateDisplay();
		}
	};
})();
