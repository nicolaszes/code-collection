document.getElementById('check').addEventListener('click', function() {
    var input = document.querySelector('#textInput');
    var len = input.value.trim().replace(/[^\x00-\xff]/g, 'aa').length;
    var tips = document.querySelector('#tips');
    if (len >= 4 && len <= 16) {
        tips.innerHTML = '名称格式正确';
        tips.style.color = 'green';
        input.style.border = '2px solid green';
    } else {
        tips.innerHTML = '名称格式错误';
        tips.style.color = 'red';
        input.style.border = '2px solid red';
    }
});