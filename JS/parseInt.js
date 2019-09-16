["1", "2", "3"].map(parseInt)

// 首先, map接受两个参数, 一个回调函数 callback, 一个回调函数的this值

// 其中回调函数接受三个参数 currentValue, index, arrary;

// 而题目中, map只传入了回调函数--parseInt.

// 其次, parseInt 只接受两个两个参数 string, radix(基数).  
// 本题理解来说也就是key与 index 

// 所以本题即问
// parseInt('1', 0);
// parseInt('2', 1);
// parseInt('3', 2);

// parseInt(string, radix)
// string	必需。要被解析的字符串。
// radix 可选。表示要解析的数字的基数。该值介于 2 ~ 36 之间。
parseInt("0xF", 0) // 15
// 如果省略该参数或其值为 0，则数字将以 10 为基础来解析。如果它以 “0x” 或 “0X” 开头，将以 16 为基数。

// 将'123'看作5进制数，返回十进制数38 => 1*5^2 + 2*5^1 + 3*5^0 = 38
parseInt('123', 5) // 38
parseInt(021, 8) // 15？