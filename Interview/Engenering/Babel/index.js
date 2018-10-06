/**
 * Babel工作的三个阶段
 * 首先要说明的是，现在前端流行用的WebPack或其他同类工程化工具会将源文件组合起来，
 * 这部分并不是Babel完成的，是这些打包工具自己实现的，
 * Babel的功能非常纯粹，以字符串的形式将源代码传给它，
 * 它就会返回一段新的代码字符串（以及sourcemap）。
 * 他既不会运行你的代码，也不会将多个代码打包到一起，
 * 它就是个编译器，输入语言是ES6+，编译目标语言是ES5。
 * 
 * 在Babel官网，plugins菜单下藏着一个链接：thejameskyle/the-super-tiny-compiler。
 * 它已经解释了整个工作过程，有耐心者可以自己研究，当然也可以继续看我的文章。
 */

// Babel的编译过程跟绝大多数其他语言的编译器大致同理，分为三个阶段：

// 解析：将代码字符串解析成抽象语法树
// 变换：对抽象语法树进行变换操作
// 再建：根据变换后的抽象语法树再生成代码字符串

if (1 > 0) {
  alert('hi');
}

// 第 1 步得到一个如下的对象
// 可以验证语法的正确性，同时由字符串变为对象结构后更有利于精准地分析以及进行代码结构调整。
AST = {
  "type": "Program",                      // 程序根节点
  "body": [                               // 一个数组包含所有程序的顶层语句
    {
      "type": "IfStatement",              // 一个if语句节点
      "test": {                           // if语句的判断条件
        "type": "BinaryExpression",       // 一个双元运算表达式节点
        "operator": ">",                  // 运算表达式的运算符
        "left": {                         // 运算符左侧值
          "type": "Literal",              // 一个常量表达式
          "value": 1                      // 常量表达式的常量值
        },
        "right": {                        // 运算符右侧值
          "type": "Literal",
          "value": 0
        }
      },
      "consequent": {                     // if语句条件满足时的执行内容
        "type": "BlockStatement",         // 用{}包围的代码块
        "body": [                         // 代码块内的语句数组
          {
            "type": "ExpressionStatement",// 一个表达式语句节点
            "expression": {
              "type": "CallExpression",   // 一个函数调用表达式节点
              "callee": {                 // 被调用者
                "type": "Identifier",     // 一个标识符表达式节点
                "name": "alert"
              },
              "arguments": [              // 调用参数
                {
                  "type": "Literal",
                  "value": "hi"
                }
              ]
            }
          }
        ]
      },
      "alternative": null                     // if语句条件未满足时的执行内容
    }
  ]
}

// 第 2 步原理就很简单了，就是遍历这个对象所描述的抽象语法树，
// 遇到哪里需要做一下改变，就直接在对象上进行操作，
// 比如我把 IfStatement 给改成 WhileStatement 就达到了把条件判断改成循环的效果。


// 第3步也简单，递归遍历这颗语法树，然后生成相应的代码，大概的实现逻辑如下：
const types = {
  Program (node) {
    return node.body.map(child => generate(child));
  },
  IfStatement (node) {
    let code = `if (${generate(node.test)}) ${generate(node.consequent)}`;
    if (node.alternative) {
      code += `else ${generate(node.alternative)}`;
    }
    return code;
  },
  BlockStatement (node) {
    let code = node.body.map(child => generate(child));
    code = `{ ${code} }`;
    return code;
  },
  // ......
};
function generate(node) {
  return types[node.type](node);
}
const ast = Babel.parse(
  // ...
) // 将代码解析成语法树
const generatedCode = generate(ast);// 将语法树重新组合成代码


/**
 * 抽象语法树是如何产生的
 * 
 * 解析这一步又分成两个步骤：
 * 
 * 1.分词：将整个代码字符串分割成 语法单元 数组
 * 2.语义分析：在分词结果的基础之上分析 语法单元之间的关系
 * 
 * 真正看下来，其实没有哪个地方的原理特别高深莫测，就是精细活，需要考虑到各种各样的情况。
 * 总之要做一个完整的语法解释器需要的是十分的细心与耐心。
 */
