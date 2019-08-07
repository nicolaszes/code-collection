/**
 * 1.根据MDN上对Array.sort()的解释，默认的排序方法会将数组元素转换为字符串
 * 然后比较字符串中字符的UTF-16编码顺序来进行排序。所以'102' 会排在 '15' 前面。
 * 
 * 以下是MDN中的解释原文：
 * The sort() method sorts the elements of an array in place and returns the array. 
 * The default sort order is built upon converting the elements into strings,
 * then comparing their sequences of UTF-16 code units values.
 * 
 * [102, 15, 22, 29, 3, 8]
 */
[3, 15, 8, 29, 102, 22].sort()

/**
 * 2.有默认函数
 */
[3, 15, 8, 29, 102, 22].sort((a, b) => a - b)