(function(){

    var array = [],
        sort  = document.getElementById('sort'),
        btn   = document.getElementsByTagName('button'),
        Lin   = document.getElementById('left-in'),
        Rin   = document.getElementById('right-in'),
        Lout  = document.getElementById('left-out'),
        Rout  = document.getElementById('right-out'),
        sort = document.getElementById('sort');
        

    var domUtil = {

        leftIn : function(value) {
            var div = this.CreateNum(div,value);
            array.unshift(value);
            sort.insertBefore(div,sort.firstChild);
            console.log(array);
        },

        rightIn : function(value) {
            var div = this.CreateNum(div,value);
            array.push(value);
            sort.appendChild(div);
        },

        leftOut : function() {
            if(sort.firstChild != null ) {
                array.shift();
                sort.removeChild(sort.firstChild);
            } 
            else {
                alert('已经没有数据移走啦!')
            }
        },

        rightOut : function() {
            if(sort.lastChild != null) {
                array.pop();
                sort.removeChild(sort.lastChild);
            } 
            else {
                alert('已经没有数据移走啦!');
            }
        },

        randNum : function() {
            sort.innerHTML = null;
            array.length = 0;
            for(var i=0;i< 50;i++) {
                domUtil.rightIn(parseInt(Math.random() * 91 + 10));
            }
        },

        CreateNum : function(el,value) {
            el = document.createElement('div');
            el.style.height = value * 4 + 'px';
            return el;
        }
    };


    function BubbleSort(el) {
        var len = array.length,
            div = el,
            i = 0,
            j = 0,
            temp,
            clear = null;
        clear = setInterval(run,15);

        function run() {
            if(i < len ){
                if(j < len - i -1) {
                    if(array[j] > array[j+1]) {
                        temp = array[j];
                        array[j] = array[j+1];
                        array[j+1] = temp;
                        div[j].style.height = array[j] * 4 + 'px';
                        div[j+1].style.height = array[j+1] * 4 + 'px';
                    }
                    j++;
                    return; 
                } 
                else {
                    j = 0;
                }
                i++;
            } 
            else {
                clearInterval(clear);
            }
        }
    } 
          

    Lin.onclick = function() {
        var value = parseInt(document.getElementById('num').value);
        /^([0-9]{1,2}|100)$/.test(value) ? domUtil.leftIn(value) : alert('请输入正确数值');
    }

    Rin.onclick = function () {
        var value = parseInt(document.getElementById('num').value);
        /^([0-9]{1,2}|100)$/.test(value) ? domUtil.rightIn(value) : alert('请输入正确数值');
    }

    Lout.onclick = domUtil.leftOut;
    Rout.onclick = domUtil.rightOut;
    rand.onclick = domUtil.randNum;

    start.onclick = function() {
        var div = document.getElementById('sort').getElementsByTagName('div');
        BubbleSort(div);
    }

})();