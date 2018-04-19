/**
 * 中介者模式
 */
class Mediator {
  send (msg, colleague) {}
}

class Colleague {
  constructor (mediator) {
    this.mediator = mediator
  }

  send (msg) {
    throw new Error('Abstract method')
  }

  receive (msg) {
    throw new Error('Abstract method')
  }
}

class ConcreteColleagueA extends Colleague {
  constructor (mediator) {
    super(mediator)
  }

  send (msg) {
    this.mediator.send(msg, this)
  }

  receive (msg) {
    console.log(msg, "`receive` of ConcreteColleagueA is being called!")
  }
}

class ConcreteColleagueB extends Colleague {
  constructor (mediator) {
    super(mediator)
  }

  send (msg) {
    this.mediator.send(msg, this)
  }

  receive (msg) {
    console.log(msg, "`receive` of ConcreteColleagueA is being called!")
  }
}

class ConcreteMediator extends Mediator {
  send (msg, colleague) {
    if (this.concreteColleagueA === colleague) {
      this.concreteColleagueB.receive(msg)
    } else {
        this.concreteColleagueA.receive(msg)
    }
  }
}

var cm = new ConcreteMediator()
let c1 = new ConcreteColleagueA(cm)
let c2 = new ConcreteColleagueB(cm)

cm.concreteColleagueA = c1
cm.concreteColleagueB = c2

c1.send("`send` of ConcreteColleagueA is being called!")
c2.send("`send` of ConcreteColleagueB is being called!")

/**
 * 中介者模式玩泡泡堂
 */
class Player {
  constructor (name, teamColor) {
    this.name = name
    this.teamColor = teamColor
    this.state = 'alive'
  }
  win () {
    console.log(`${this.name} won`)
  }
  lose () {
    console.log(`${this.name} lost`)
  }
  die () {
    this.state = 'dead'
    playerDirector.ReceiveMessage( 'playerDead', this ) // 给中介者发消息，玩家死亡
  }
  remove () {
    playerDirector.ReceiveMessage( 'removePlayer', this ) // 给中介者发消息，移除一个玩家
  }
  changeTeam () {
    playerDirector.ReceiveMessage( 'changeTeam', this, color) // 给中介者发消息，玩家换队
  }
}

const playerDirector = (function () {
  let players = {}
  const operations = {
    /**
     * 新增一个玩家
     */
    addPlayer (player) {
      let teamColor = player.teamColor
      players[ teamColor ] = players[ teamColor ] || []
      players[ teamColor ].push(player)
    },

    /**
     * 移除一个玩家
     */
    removePlayer (player) {
      let teamColor = player.teamColor
      let teamPlayers = players[ teamColor ]

      for (let i = teamPlayers.length - 1; i >= 0; i--) {
        if (teamPlayers[ i ] === player) {
          teamPlayers.splice(i , 1)
        }
      }
    },

    /**
     * 玩家换队
     */
    changeTeam (player, newTeamColor) {
      operations.removePlayer( player )
      player.teamColor = newTeamColor
      operations.addPlayer( player ) 
    },

    // 玩家死亡
    playerDead (player) { 
      let teamColor = player.teamColor
      let teamPlayers = players[ teamColor ]
      let all_dead = true
  
      for ( let i = 0, player; player = teamPlayers [ i++ ];) {
        if ( player.state !== 'dead' ) {
          all_dead = false
          break
        }
      }
  
      if (all_dead) {
        for (let i = 0, player; player = teamPlayers[ i++ ];) {
          player.lose() // 本队所有玩家lose
        }
  
        for ( let color in players) {
          if ( color !== teamColor ) {
            let teamPlayers = players[ color ] // 其他队伍的玩家
  
            for ( let i = 0, player; player = teamPlayers[ i++ ]; ){
              player.win()   // 其他队伍所有玩家win
            }
          }
        }
      }
    }
  }

  let ReceiveMessage = function () {
    let message = Array.prototype.shift.call(arguments)
    operations[ message ].apply(this, arguments)
  }

  return {
    ReceiveMessage: ReceiveMessage
  }
})()

const playerFactory = function (name, teamColor) {
  const newPlayer = new Player(name, teamColor)
  playerDirector.ReceiveMessage( 'addPlayer', newPlayer )
  return newPlayer
}

console.log(playerFactory)

var player1 = playerFactory( '皮蛋', 'red' ),
    player2 = playerFactory( '小乖', 'red' ),
    player3 = playerFactory( '宝宝', 'red' ),
    player4 = playerFactory( '小强', 'red' );

// 蓝队：
var player5 = playerFactory( '黑妞', 'blue' ),
    player6 = playerFactory( '葱头', 'blue' ),
    player7 = playerFactory( '胖墩', 'blue' ),
    player8 = playerFactory( '海盗', 'blue' );

player1.die()
player2.die()
player3.die()
player4.die()

/**
 * 中介者模式购买商品
 */
var goods = {   // 手机库存
  "red": 3,
  "blue": 6
};

colorSelect.onchange = function(){
  var color = this.value,   // 颜色
      number = numberInput.value,   // 数量
      stock = goods[ color ]   // 该颜色手机对应的当前库存

  colorInfo.innerHTML = color

  if ( !color ){
      nextBtn.disabled = true
      nextBtn.innerHTML = '请选择手机颜色'
      return
  }

  if ( ( ( number - 0 ) | 0 ) !== number - 0 ){   // 用户输入的购买数量是否为正整数
      nextBtn.disabled = true
      nextBtn.innerHTML = '请输入正确的购买数量'
      return
  }

  if ( number > stock  ){   // 当前选择数量超过库存量
    nextBtn.disabled = true
    nextBtn.innerHTML = '库存不足'
    return 
  }

  nextBtn.disabled = false
  nextBtn.innerHTML = '放入购物车'
}

numberInput.oninput = function(){
  var color = colorSelect.value,   // 颜色
      number = this.value,   // 数量
      stock = goods[ color ]  // 该颜色手机对应的当前库存

  numberInfo.innerHTML = number

  if ( !color ){
      nextBtn.disabled = true
      nextBtn.innerHTML = '请选择手机颜色'
      return;
  }

  if ( ( ( number - 0 ) | 0 ) !== number - 0 ){   // 输入购买数量是否为正整数
      nextBtn.disabled = true
      nextBtn.innerHTML = '请输入正确的购买数量'
      return;
  }

  if ( number > stock  ){   // 当前选择数量没有超过库存量
      nextBtn.disabled = true
      nextBtn.innerHTML = '库存不足'
      return
  }

  nextBtn.disabled = false
  nextBtn.innerHTML = '放入购物车'
}

/**
 * 可能遇到的困难
 * 假设现在就要求去掉 colorInfo和 numberInfo这两个展示区域
 * 我们需要分别改动 colorSelect.onchange 和 numberInput.oninput
 * 因为先前的代码，对象耦合在了一起
 * 
 * 如果页面的节点激增到 10 - 15个，它们之间的联系将变得错综复杂
 * 
 * 引入中介者
 * 新增一些跟需求相关的节点，只需要修改中介者函数
 * 中介者模式是迎合迪米特法则的一种实现。迪米特法则也叫最少知识原则，是指一个对象应该尽可能少地了解另外的对象
 */
var mediator = (function () {
  var colorSelect = document.getElementById( 'colorSelect' ),
      memorySelect = document.getElementById( 'memorySelect' ),
      numberInput = document.getElementById( 'numberInput' ),
      colorInfo = document.getElementById( 'colorInfo' ),
      memoryInfo = document.getElementById( 'memoryInfo' ),
      numberInfo = document.getElementById( 'numberInfo' ),
      nextBtn = document.getElementById( 'nextBtn' );

  return {
    changed: function( obj ){
      var color = colorSelect.value,   // 颜色
          memory = memorySelect.value,// 内存
          number = numberInput.value,   // 数量
          stock = goods[ color + '|' + memory ]  // 颜色和内存对应的手机库存数量
  
      if ( obj === colorSelect ){     // 如果改变的是选择颜色下拉框
          colorInfo.innerHTML = color
      }else if ( obj === memorySelect ){
          memoryInfo.innerHTML = memory
      }else if ( obj === numberInput ){
          numberInfo.innerHTML = number
      }
  
      if ( !color ){
          nextBtn.disabled = true
          nextBtn.innerHTML = '请选择手机颜色'
          return
      }
  
      if ( !memory ){
          nextBtn.disabled = true
          nextBtn.innerHTML = '请选择内存大小'
          return
      }
  
      if ( ( ( number - 0 ) | 0 ) !== number - 0 ){   // 输入购买数量是否为正整数
          nextBtn.disabled = true
          nextBtn.innerHTML = '请输入正确的购买数量'
          return
      }
  
      nextBtn.disabled = false
      nextBtn.innerHTML = '放入购物车'
    }
  }
})()

// 事件函数：
colorSelect.onchange = function(){
  mediator.changed( this );
}
memorySelect.onchange = function(){
  mediator.changed( this );
}
numberInput.oninput = function(){
  mediator.changed( this );
}