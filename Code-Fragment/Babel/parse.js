/**
 * 语义分析
 * 
 * 语义分析就是把词汇进行立体的组合，确定有多重意义的词语最终是什么意思、
 * 多个词语之间有什么关系以及又应该再哪里断句等。
 */

// 在编程语言的解析中有两个很相似但是又有区别的重要概念：

// 语句：语句是一个具备边界的代码区域，相邻的两个语句之间从语法上来讲互不干扰，
// 调换顺序虽然可能会影响执行结果，但不会产生语法错误
// 比如return true、var a = 10、if (...) {...}

// 表达式：最终有个结果的一小段代码，它的特点是可以原样嵌入到另一个表达式
// 比如myVar、1+1、str.replace('a', 'b')、i < 10 && i > 0等

// 很多情况下一个语句可能只包含一个表达式，比如console.log('hi');。
// estree标准当中，这种语句节点称作ExpressionStatement。

// 语义分析的过程又是个遍历语法单元的过程，不过相比较而言更复杂，
// 因为分词过程中，每个语法单元都是独立平铺的，
// 而语法分析中，语句和表达式会以树状的结构互相包含。
// 针对这种情况我们可以用栈，也可以用递归来实现。

// 我继续上面的例子给出语义分析的代码，代码很长，先在最开头说明几个函数是做什么的：

// nextStatement：读取并返回下一个语句
// nextExpression：读取并返回下一个表达式
// nextToken：读取下一个语法单元（或称符号），赋值给curToken
// stash：暂存当前读取符号的位置，方便在需要的时候返回
// rewind：返回到上一个暂存点
// commit：上一个暂存点不再被需要，将其销毁

function parse (tokens) {
  let i = -1;     // 用于标识当前遍历位置
  let curToken;   // 用于记录当前符号

  // 读取下一个语句
  function nextStatement () {
    // 暂存当前的i，如果无法找到符合条件的情况会需要回到这里
    stash();
    
    // 读取下一个符号
    nextToken();

    if (curToken.type === 'identifier' && curToken.value === 'if') {
      // 解析 if 语句
      const statement = {
        type: 'IfStatement',
      };
      // if 后面必须紧跟着 (
      nextToken();
      if (curToken.type !== 'parens' || curToken.value !== '(') {
        throw new Error('Expected ( after if');
      }

      // 后续的一个表达式是 if 的判断条件
      statement.test = nextExpression();

      // 判断条件之后必须是 )
      nextToken();
      if (curToken.type !== 'parens' || curToken.value !== ')') {
        throw new Error('Expected ) after if test expression');
      }

      // 下一个语句是 if 成立时执行的语句
      statement.consequent = nextStatement();

      // 如果下一个符号是 else 就说明还存在 if 不成立时的逻辑
      if (curToken === 'identifier' && curToken.value === 'else') {
        statement.alternative = nextStatement();
      } else {
        statement.alternative = null;
      }
      commit();
      return statement;
    }

    if (curToken.type === 'brace' && curToken.value === '{') {
      // 以 { 开头表示是个代码块，我们暂不考虑JSON语法的存在
      const statement = {
        type: 'BlockStatement',
        body: [],
      };
      while (i < tokens.length) {
        // 检查下一个符号是不是 }
        stash();
        nextToken();
        if (curToken.type === 'brace' && curToken.value === '}') {
          // } 表示代码块的结尾
          commit();
          break;
        }
        // 还原到原来的位置，并将解析的下一个语句加到body
        rewind();
        statement.body.push(nextStatement());
      }
      // 代码块语句解析完毕，返回结果
      commit();
      return statement;
    }
    
    // 没有找到特别的语句标志，回到语句开头
    rewind();

    // 尝试解析单表达式语句
    const statement = {
      type: 'ExpressionStatement',
      expression: nextExpression(),
    };
    if (statement.expression) {
      nextToken();
      if (curToken.type !== 'EOF' && curToken.type !== 'sep') {
        throw new Error('Missing ; at end of expression');
      }
      return statement;
    }
  }

  // 读取下一个表达式
  function nextExpression () {
    nextToken();

    if (curToken.type === 'identifier') {
      const identifier = {
        type: 'Identifier',
        name: curToken.value,
      };
      stash();
      nextToken();
      if (curToken.type === 'parens' && curToken.value === '(') {
        // 如果一个标识符后面紧跟着 ( ，说明是个函数调用表达式
        const expr = {
          type: 'CallExpression',
          caller: identifier,
          arguments: [],
        };

        stash();
        nextToken();
        if (curToken.type === 'parens' && curToken.value === ')') {
          // 如果下一个符合直接就是 ) ，说明没有参数
          commit();
        } else {
          // 读取函数调用参数
          rewind();
          while (i < tokens.length) {
            // 将下一个表达式加到arguments当中
            expr.arguments.push(nextExpression());
            nextToken();
            // 遇到 ) 结束
            if (curToken.type === 'parens' && curToken.value === ')') {
              break;
            }
            // 参数间必须以 , 相间隔
            if (curToken.type !== 'comma' && curToken.value !== ',') {
              throw new Error('Expected , between arguments');
            }
          }
        }
        commit();
        return expr;
      }
      rewind();
      return identifier;
    }

    if (curToken.type === 'number' || curToken.type === 'string') {
      // 数字或字符串，说明此处是个常量表达式
      const literal = {
        type: 'Literal',
        value: eval(curToken.value),
      };
      // 但如果下一个符号是运算符，那么这就是个双元运算表达式
      // 此处暂不考虑多个运算衔接，或者有变量存在
      stash();
      nextToken();
      if (curToken.type === 'operator') {
        commit();
        return {
          type: 'BinaryExpression',
          left: literal,
          right: nextExpression(),
        };
      }
      rewind();
      return literal;
    }

    if (curToken.type !== 'EOF') {
      throw new Error('Unexpected token ' + curToken.value);
    }
  }

  // 往后移动读取指针，自动跳过空白
  function nextToken () {
    do {
      i++;
      curToken = tokens[i] || { type: 'EOF' };
    } while (curToken.type === 'whitespace');
  }

  // 位置暂存栈，用于支持很多时候需要返回到某个之前的位置
  const stashStack = [];

  function stash (cb) {
    // 暂存当前位置
    stashStack.push(i);
  }

  function rewind () {
    // 解析失败，回到上一个暂存的位置
    i = stashStack.pop();
    curToken = tokens[i];
  }

  function commit () {
    // 解析成功，不需要再返回
    stashStack.pop();
  }
  
  const ast = {
    type: 'Program',
    body: [],
  };

  // 逐条解析顶层语句
  while (i < tokens.length) {
    const statement = nextStatement();
    if (!statement) {
      break;
    }
    ast.body.push(statement);
  }
  return ast;
}

const ast = parse([
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
]);