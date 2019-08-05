/**
 * 分词
 * 
 * 那么回到代码的解析当中，JS代码有哪些语法单元呢？大致有以下这些（其他语言也许类似但通常都有区别）：
 * 分词的过过程从逻辑来讲并不难解释，但是这是个精细活，要考虑清楚所有的情况。
 */

// 空白：JS中连续的空格、换行、缩进等这些如果不在字符串里，
// 就没有任何实际逻辑意义，所以把连续的空白符直接组合在一起作为一个语法单元。

// 注释：行注释或块注释，虽然对于人类来说有意义，但是对于计算机来说知道这是个“注释”就行了，
// 并不关心内容，所以直接作为一个不可再拆的语法单元

// 字符串：对于机器而言，字符串的内容只是会参与计算或展示，里面再细分的内容也是没必要分析的

// 数字：JS语言里就有16、10、8进制以及科学表达法等数字表达语法，数字也是个具备含义的最小单元

// 标识符：没有被引号扩起来的连续字符，可包含字母、_、$、及数字（数字不能作为开头）。

// 标识符可能代表一个变量，或者true、false这种内置常量、也可能是if、return、function这种关键字，
// 是哪种语义，分词阶段并不在乎，只要正确切分就好了。

// 运算符：+、-、*、/、>、<等等
// 括号：(...)可能表示运算优先级、也可能表示函数调用，分词阶段并不关注是哪种语义，
// 只把“(”或“)”当做一种基本语法单元

// 还有其他：如中括号、大括号、分号、冒号、点等等不再一一列举

if (1 > 0) {
  alert("if \"1 > 0\"");
}

/**
 * 这拆分过程其实没啥可取巧的，就是简单粗暴地一个字符一个字符地遍历，
 * 然后分情况讨论，整个实现方法就是顺序遍历和大量的条件判断。
 * 我用一个简单的实现来解释，在关键的地方注释，我们只考虑上面那段代码里存在的语法单元类型。
 */
// 我们希望得到的分词是：
// 'if'     ' '       '('    '1'      ' '    '>'    ' '    ')'    ' '    '{'
// '\n  '   'alert'   '('    '"if \"1 > 0\""'    ')'    ';'    '\n'   '}'
function tokenizeCode (code) {
  const tokens = [];    // 结果数组
  for (let i = 0; i < code.length; i++) {
    // 从0开始，一个字符一个字符地读取
    let currentChar = code.charAt(i);

    if (currentChar === ';') {
      // 对于这种只有一个字符的语法单元，直接加到结果当中
      tokens.push({
        type: 'sep',
        value: ';',
      });
      // 该字符已经得到解析，不需要做后续判断，直接开始下一个
      continue;
    }
    
    if (currentChar === '(' || currentChar === ')') {
      // 与 ; 类似只是语法单元类型不同
      tokens.push({
        type: 'parens',
        value: currentChar,
      });
      continue;
    }

    if (currentChar === '}' || currentChar === '{') {
      // 与 ; 类似只是语法单元类型不同
      tokens.push({
        type: 'brace',
        value: currentChar,
      });
      continue;
    }

    if (currentChar === '>' || currentChar === '<') {
      // 与 ; 类似只是语法单元类型不同
      tokens.push({
        type: 'operator',
        value: currentChar,
      });
      continue;
    }

    if (currentChar === '"' || currentChar === '\'') {
      // 引号表示一个字符传的开始
      const token = {
        type: 'string',
        value: currentChar,       // 记录这个语法单元目前的内容
      };
      tokens.push(token);

      const closer = currentChar;
      let escaped = false;        // 表示下一个字符是不是被转译的

      // 进行嵌套循环遍历，寻找字符串结尾
      for (i++; i < code.length; i++) {
        currentChar = code.charAt(i);
        // 先将当前遍历到的字符无条件加到字符串的内容当中
        token.value += currentChar;
        if (escaped) {
          // 如果当前转译状态是true，就将改为false，然后就不特殊处理这个字符
          escaped = false;
        } else if (currentChar === '\\') {
          // 如果当前字符是 \ ，将转译状态设为true，下一个字符不会被特殊处理
          escaped = true;
        } else if (currentChar === closer) {
          break;
        }
      }
      continue;
    }
    
    if (/[0-9]/.test(currentChar)) {
      // 数字是以0到9的字符开始的
      const token = {
        type: 'number',
        value: currentChar,
      };
      tokens.push(token);

      for (i++; i < code.length; i++) {
        currentChar = code.charAt(i);
        if (/[0-9\.]/.test(currentChar)) {
          // 如果遍历到的字符还是数字的一部分（0到9或小数点）
          // 这里暂不考虑会出现多个小数点以及其他进制的情况
          token.value += currentChar;
        } else {
          // 遇到不是数字的字符就退出，需要把 i 往回调，
          // 因为当前的字符并不属于数字的一部分，需要做后续解析
          i--;
          break;
        }
      }
      continue;
    }

    if (/[a-zA-Z\$\_]/.test(currentChar)) {
      // 标识符是以字母、$、_开始的
      const token = {
        type: 'identifier',
        value: currentChar,
      };
      tokens.push(token);

      // 与数字同理
      for (i++; i < code.length; i++) {
        currentChar = code.charAt(i);
        if (/[a-zA-Z0-9\$\_]/.test(currentChar)) {
          token.value += currentChar;
        } else {
          i--;
          break;
        }
      }
      continue;
    }
    
    if (/\s/.test(currentChar)) {
      // 连续的空白字符组合到一起
      const token = {
        type: 'whitespace',
        value: currentChar,
      };
      tokens.push(token);

      // 与数字同理
      for (i++; i < code.length; i++) {
        currentChar = code.charAt(i);
        if (/\s]/.test(currentChar)) {
          token.value += currentChar;
        } else {
          i--;
          break;
        }
      }
      continue;
    }

    // 还可以有更多的判断来解析其他类型的语法单元

    // 遇到其他情况就抛出异常表示无法理解遇到的字符
    throw new Error('Unexpected ' + currentChar);
  }
  return tokens;
}

const tokens = tokenizeCode(`
  if (1 > 0) {
    alert("if 1 > 0");
  }
`);

// 以上代码是我个人的实现方式，与babel实际略有不同，但主要思路一样
[
  { type: "whitespace", value: "\n" },
  { type: "identifier", value: "if" },
  { type: "whitespace", value: " " },
  { type: "parens", value: "(" },
  { type: "number", value: "1" },
  { type: "whitespace", value: " " },
  { type: "operator", value: ">" },
  { type: "whitespace", value: " " },
  { type: "number", value: "0" },
  { type: "parens", value: ")" },
  { type: "whitespace", value: " " },
  { type: "brace", value: "{" },
  { type: "whitespace", value: "\n " },
  { type: "identifier", value: "alert" },
  { type: "parens", value: "(" },
  { type: "string", value: "\"if 1 > 0\"" },
  { type: "parens", value: ")" },
  { type: "sep", value: ";" },
  { type: "whitespace", value: "\n" },
  { type: "brace", value: "}" },
  { type: "whitespace", value: "\n" },
]