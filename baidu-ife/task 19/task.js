(function () {
    // body...
    var array = [],
        sort  = document.getElementById('sort'),
        btn   = document.getElementsByTagName('button'),
        Lin   = document.getElementById('left-in'),
        Rin   = document.getElementById('right-in'),
        Lout  = document.getElementById('left-out'),
        Rout  = document.getElementById('right-out'),
        start = document.getElementById('start');

    var domUtil = {

        leftIn : function(value) {
            var div = this.CreateNum(div,value);
            array.unshift(value);
            sort.insertBefore(div,sort.firstChild);
            console.log(array);
        }

        rightIn : function(value) {
            var div = this.CreateNum(div,value);
            array.push(value);
            sort.appendChild(div);
        }

        leftOut : function(value) {
            if(sort.firstChild != null) {
                array.shift();
                sort.removeChild(sort.firstChild);
            }
            else {
                alert('数列为空！')
            }
        }

        rightOut : function(value) {
            if(sort.lastChild != null) {
                array.pop();
                sort.removeChild(sort.lastChild);
            }
            else{
                alert('数列为空！');
            }
        }

        
    }
})();