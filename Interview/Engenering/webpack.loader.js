// loader就是一个node模块，它输出了一个函数。
// 当某种资源需要用这个loader转换时，这个函数会被调用。
// 并且，这个函数可以通过提供给它的this上下文访问Loader API。
// reverse-txt-loader
// 定义
module.exports = function(src) {
  //src是原文件内容（abcde），下面对内容进行处理，这里是反转
  var result = src.split('').reverse().join(''); 
  //返回JavaScript源码，必须是String或者Buffer
  return `module.exports = '${result}'`;
}
// 使用
// {
// 	test: /\.txt$/,
// 	use: [
// 		{
// 			'./path/reverse-txt-loader'
// 		}
// 	]
// },
