// 修改方法一：箭头函数最方便
let userInfo = {
  name: "jack.ma",
  age: 13,
  sex: 'male',
  updateInfo: function () {
    // 模拟 xmlhttprequest 请求延时
    setTimeout(() => {
      this.name = "pony.ma"
      this.age = 39
      this.sex = 'female'
    }, 100)
  }
}

userInfo.updateInfo()
setTimeout(() => {
  console.log(userInfo)
}, 200)

// 修改方法二：缓存外部的this
let userInfo = {
  name: "jack.ma",
  age: 13,
  sex: 'male',
  updateInfo: function () {
    let me = this;
    // 模拟 xmlhttprequest 请求延时
    setTimeout(function () {
      me.name = "pony.ma"
      me.age = 39
      me.sex = 'female'
    }, 100)
  }
}

userInfo.updateInfo()
setTimeout(() => {
  console.log(userInfo);
}, 200)

// 修改方法三，其实和方法二的思路是相同的
let userInfo = {
  name: "jack.ma",
  age: 13,
  sex: 'male',
  updateInfo: function () {
    // 模拟 xmlhttprequest 请求延时
    void
    function (me) {
      setTimeout(function () {
        me.name = "pony.ma"
        me.age = 39
        me.sex = 'female'
      }, 100)
    }(this);
  }
}

userInfo.updateInfo()
setTimeout(() => {
  console.log(userInfo)
}, 200)

let update = function () {
  this.name = "pony.ma"
  this.age = 39
  this.sex = 'female'
}

方法四: 利用call或apply修改函数被调用时的this值(不知掉这么描述正不正确)
let userInfo = {
  name: "jack.ma",
  age: 13,
  sex: 'male',
  updateInfo: function () {
    // 模拟 xmlhttprequest 请求延时
    setTimeout(function () {
      update.call(userInfo);
      // update.apply(userInfo)
    }, 100)
  }
}

userInfo.updateInfo()
setTimeout(() => {
  console.log(userInfo)
}, 200)

// 方法五: 利用bind返回一个新函数，新函数被调用时的this指定为userInfo
let userInfo = {
  name: "jack.ma",
  age: 13,
  sex: 'male',
  update: function () {
    this.name = "pony.ma"
    this.age = 39
    this.sex = 'female'
  },
  updateInfo: function () {
    // 模拟 xmlhttprequest 请求延时
    setTimeout(this.update.bind(this), 100)
  }
}