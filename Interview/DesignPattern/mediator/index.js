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
}

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

