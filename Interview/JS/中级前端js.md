#JAVASCRIPT
####1.数组去重
*好多同学只认为值相等即为相同,而忽略类类型的判断*
- 1)ES6 新增 Array 方法，Array.from() + Set();
```
Array.prototype.unique = function() {
    return Array.from(new Set(this));
}
```
- 2)结合 {} 实现
* 这种方法的关键点就是：判断是否相同的时候,不要忽略对元素类型的判断。
```
Array.prototype.unique = function() {
    var json = {};
    var result = [];
    this.forEach(function(value){
        var type = Object.prototype.toString.call(value).match(/\s(\w+)/)[1].toLowerCase();
        if(!((type + '-'+value) in json)){
            json[type + '-'+value] = true;
            result.push(value);
        }
    })
    return result;
}
```
####2.