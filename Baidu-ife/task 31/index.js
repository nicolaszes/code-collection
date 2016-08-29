$ = function(el) {
    return document.querySelector(el);
};

var cityOps = '';
for (var city in schools) {
    cityOps += '<option>' + city + '</option>';
}

var inRadio = $('#inRadio');
var outRadio = $('#outRadio');
var school = $('#school');
var work = $('#work');
var citySelect = $('#citySelect');
var schoolSelect = $('#schoolSelect');

citySelect.innerHTML = cityOps;

var schools = {
    "北京": ["清华大学", "北京大学"],
    "上海": ["上海交通大学", "复旦大学"],
    "武汉": ["武汉大学", "华中科技大学"],
    "南京": ["南京大学","东南大学"]
};

function renderSchoolSelect() {
    var city = citySelect.options[citySelect.selectedIndex].value;
    schoolSelect.innerHTML = schools[city].map(function(d) {
        return '<option>' + d + '</option>';
    });
}

function render() {
    if (inRadio.checked) {
        school.style.display = 'block';
        work.style.display = 'none';
    }
    if (outRadio.checked) {
        school.style.display = 'none';
        work.style.display = 'block';
    }
}

render();
renderSchoolSelect();

citySelect.addEventListener('change', renderSchoolSelect);
inRadio.addEventListener('click', render);
outRadio.addEventListener('click', render);