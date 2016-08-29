function g(el) {
    return document.getElementById(el);
}

//创建下拉列表并将初始值设为当前日期
function selectBox() {
	var displayYear = g("displayYear"),
		displayMonth = g("displayMonth");

	for (var i = 1950; i < 2050 ; i++) {
		var optionYear = document.createElement("option");
			optionYear.value = String(i);
		var optionYearText = document.createTextNode(String(i) + "年");
			optionYear.appendChild(optionYearText);
			displayYear.appendChild(optionYear);	
	}

	for (var j = 0; j < 12 ; j++) {
		var optionMonth = document.createElement("option");
			optionMonth.value = String(j);
		var optionMonthText = document.createTextNode(String(j+1) + "月");
			optionMonth.appendChild(optionMonthText);
			displayMonth.appendChild(optionMonth);	
	}

	var currentDate = new Date(),
		currentYear = currentDate.getFullYear(),
		currentMonth = currentDate.getMonth() + 1;
	currentMonth = (currentMonth < 10) ? ("0" + currentMonth)  : currentMonth;
	displayYear.value = currentYear;
	displayMonth.value = currentDate.getMonth();
	g("myText").value = currentYear + "年" + currentMonth + "月";
}


window.onload = selectBox();