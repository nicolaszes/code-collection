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
}



//创建日历主体
function calendar() {
    var myTable = g("calendar");
    var tableHead = document.createElement("thead");
    tableHead.id = "TableHead";
    var week = ["日", "一", "二", "三", "四", "五", "六"];
    var tableTr = document.createElement("tr");

    for (var i = 0; i < 7; i++) {
        var tableTh = document.createElement("th");
        var tableThText = document.createTextNode(week[i]);
        tableTh.appendChild(tableThText);
        tableTr.appendChild(tableTh);
    }
    tableHead.appendChild(tableTr);
    myTable.appendChild(tableHead);
    
    var tableBody = document.createElement("tbody");
    tableBody.id = "TableBody";
    for (var j = 0; j < 6; j++) {
        var tableTr = document.createElement("tr");
        for (var k = 0; k < 7; k++) {
            var tableTd = document.createElement("td");
            tableTd.id = "tds";  //给td表格添加Id
            tableTr.appendChild(tableTd);
        }
        tableBody.appendChild(tableTr);
    }
    myTable.appendChild(tableBody);
}


function getWeek() {
	var yearMonth = new Date(),
		displayYear = g("displayYear").value,
		displayMonth = g("displayMonth").value;
	yearMonth.setFullYear(displayYear,displayMonth,1);
	var selectDay = yearMonth.getDay();
	return selectDay;
}


function getdate() {
	var displayYear = parseInt(g("displayYear").value),
		nowMonth = parseInt(g("displayMonth").value) + 1;

	if (nowMonth == 1 || nowMonth == 3 || nowMonth == 5 || nowMonth == 7 || nowMonth == 8 || nowMonth == 10 || nowMonth == 12) {
		return 31;
	}
	else if (nowMonth == 4 || nowMonth == 6 || nowMonth == 9 || nowMonth == 11) {
		return 30;
	}
	else if ((displayYear % 100 != 0 && displayYear % 4 ==0) || displayYear % 400 == 0) {
		return 29;
	}
	else {
		return 28;
	}
}


function writeDate() {
	var weekday = getWeek(),
		date = 1,
		tableTds = document.getElementsByTagName("td"),
		dateNum = getdate();

	for (var i = 0; i < tableTds.length; i++) {
		if (tableTds[i].firstChild) {
			tableTds[i].removeChild(tableTds[i].firstChild);
		}
	}

	for (var j = 0; j < dateNum; j++) {
		var tableTdText = document.createTextNode(date);
			tableTds[weekday].appendChild(tableTdText);
		weekday++;
		date++;
	}
}


function refrenshTable() {
	g("selectBox").onclick = function() {
		writeDate();
		var displayYear = g("displayYear").value,
			displayMonth = g("displayMonth").value + 1;
		displayMonth = displayMonth < 10 ? "0" + displayMonth :displayMonth;
		g("caleSelect").value = displayYear + "年" + displayMonth + "月";
	}
}


function showDate() {
	var displayYear = parseInt(g("displayYear").value),
		displayMonth = parseInt(g("displayMonth").value) + 1;
		displayMonth = displayMonth < 10 ? "0" + displayMonth : displayMonth;

	g("TableBody").onclick = function() { //添加点击事件，显示日期
		if (event.target.firstChild) {
			var displayDate = event.target.firstChild.nodeValue;
			g("caleSelect").value = displayYear + "年" + displayMonth + "月" + displayDate + "日";
		}

		g("myCalendar").style.display = "none"; //点击日期隐藏日历
	}
}


function showCalendar() {
    g("myCalendar").style.display = "none";

    //待优化
    g("caleSelect").onclick = function () {
        if (g("myCalendar").style.display == "none") {
            g("myCalendar").style.display = "block";
        } 
        else {
            g("myCalendar").style.display = "none";
        }
    } 
    g("show").onclick = function () {
        if (g("myCalendar").style.display == "none") {
            g("myCalendar").style.display = "block";
        } 
        else {
            g("myCalendar").style.display = "none";
        }
    } 
}



window.onload = function() {
	selectBox();
	calendar();
	getWeek();
	getdate();
	writeDate();
	refrenshTable();
	showDate();
	showCalendar();
}