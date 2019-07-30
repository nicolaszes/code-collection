/**
 * 命令模式
 * “松耦合的方式来设计程序，使得请求发送者和请求接收者能够消除彼此之间的耦合关系”
 */
var setCommand = function (button, ) {
  button.onClick = function () {
    command.execute();
  }
}

var MenuBar = {
  refresh: function () {
    console.log('刷新菜单目录')
  }
}

var SubMenu = {
  add: function () {
    console.log('增加子菜单')
  },
  del: function () {
    console.log('删除子菜单')
  }
}

var RefreshMenuBarCommand = {
  function (receiver) {
    this.receiver = receiver
  }
}

RefreshMenuBarCommand.prototype.execute = function () {
  this.receiver.refresh()
}

var AddSubMenuCommand = function (receiver) {
  this.receiver = receiver;
}

AddSubMenuCommand.prototype.execute = function () {
  this.receiver.add()
}

var DelSubMenuConmmand = function (receiver) {
  this.receiver = receiver;
}

DelSubMenuConmmand.prototype.execute = function () {
  console.log('删除子菜单')
}

// “把命令接收者传入到command对象中，并且把command对象安装到button上面”
var refreshMenuBarCommand = new RefreshMenuBarCommand(MenuBar)
var addSubMenuCommand = new AddSubMenuCommand(MenuBar)
var delSubMenuConmmand = new DelSubMenuConmmand(MenuBar)

setCommand(button1, refreshMenuBarCommand)
setCommand(button2, addSubMenuCommand)
setCommand(button3, delSubMenuConmmand)

/**
 * javascript中的命令模式
 */
var bindClick = function (button, func) {
  button.onClick = func;
}

var MenuBar = {
  refresh: function () {
    console.log('刷新菜单界面')
  }
}

var SubMenu = {
  add: function () {
    console.log('增加子菜单')
  },
  del: function () {
    console.log('删除子菜单')
  }
}

buttonClick( button1, MenuBar.refresh)
buttonClick( button2, SubMenu.add)
buttonClick( button3, SubMenu.del)

// 用 闭包实现的命令模式
var setCommand = function (button, func) {
  button.click = function () {
    func();
  }
}
var MenuBar = {
  refresh: function () {
    console.log('刷新菜单列表')
  }
}
var RefreshMenuBarCommand = function (receiver) {
  return function () {
    receiver.refresh();
  }
}
var refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar)
setCommand(button1, refreshMenuBarCommand)

/*
 * 想更明确地表达当前正在使用命令模式，或者除了执行命令之外，将来有可能还要提供撤销命令等操作。
 * 那我们最好还是把执行函数改为调用execute方法
 */
var setCommand = function (button, command) {
  button.click = function () {
    command.execute();
  }
}
var MenuBar = {
  refresh: function () {
    console.log('刷新菜单列表')
  }
}
var RefreshMenuBarCommand = function (receiver) {
  return {
    execute: function () {
      receiver.refresh();
    }
  }
}
var refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar)
setCommand(button1, refreshMenuBarCommand)

/**
 * 撤销命令
 */
var ball = document.getElementById('ball');
var pos = document.getElementById('pos');
var moveBtn = document.getElementById('moveBtn');

var MoveCommand = function (receiver, pos) {
  this.receiver = receiver;
  this.pos = pos;
}

MoveCommand.prototype.execute = function () {
  this.receiver.start('left', this.pos, 1000, 'strongEaseOut')
};

var moveCommand;

moveBtn.onClick = function () {
  var animate = new Animate(ball);
  moveCommand = new moveCommand(animate, pos.value);
  moveCommand.execute();
}

// add unexecude
var MoveCommand = function (receiver, pos) {
  this.receiver = receiver;
  this.pos = pos;
  this.oldPos = null;
}

MoveCommand.prototype.execute = function () {
  this.receiver.start('left', this.pos, 1000, 'strongEaseOut')
  this.oldPos = this.receiver.dom.getBoundingClientRect()[this.receiver.propertyName];
};

MoveCommand.prototype.execute = function () {
  this.receiver.start('left', this.pos, 1000, 'strongEaseOut')
};

MoveCommand.prototype.undo = function () {
  this.receiver.start('left', this.oldPos, 1000, 'strongEaseOut');
};

var moveCommand;

moveBtn.onClick = function () {
  var animate = new Animate(ball);
  moveCommand = new moveCommand(animate, pos.value);
  moveCommand.execute();
}

cancel.onClick = function () {
  moveCommand.undo();
}

/**
 * 撤销和重做
 * 撤销一系列的命令：把所有执行的命令存储在一个历史列表中，然后倒序循环来依次执行这些命令的 undo操作，直到循环到第五个命令为止
 * Canvas：先清除画布，然后把刚才执行过的命令全部重新执行一遍，这一点同样可以利用一个历史列表堆栈办到
 */


/**
 * 宏命令：一组命令的集合
 * 通过执行宏命令的方式，可以一次执行一批命令
 */
var closeDoorCommand = {
  execute: function () {
    console.log('关门')
  }
}
var openPcCommand = {
  execute: function () {
    console.log('开电脑')
  }
}
var openQQCommand = {
  execute: function () {
    console.log('登录QQ')
  }
}

// 定义宏命令
var MacroCommand = function () {
  return {
    commandsList: [],
    add: function (command) {
      this.commandsList.push(command)
    },
    execute: function () {
      for (var i = 0, command; command = this.commandsList[i++];) {
        command.execute();
      }
    }
  }
}

var macroCommand = MacroCommand();
macroCommand.add(closeDoorCommand);
macroCommand.add(openPcCommand);
macroCommand.add(openQQCommand);

macroCommand.execute();
