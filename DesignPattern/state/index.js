class Light {
  constructor () {
    this.state = 'off'
    this.button = null
  }

  init () {
    const button = document.createElement('button')
    this.button = document.body.appendChild(button)
    this.button.click = () => this.buttonWasPressed
  }

  /**
   * 如果需要添加第三种情况，就会出现问题
   * 1.违反开放封闭原则
   * 2.buttonWasPressed 实际情况下会变得异常庞大
   * 3.状态的切换非常不明显
   * 4.难以阅读和维护
   */
  buttonWasPressed () {
    if (this.state === 'off') {
      console.log('开灯')
      this.state = 'on'
    } else if (this.state === 'on') {
      console.log('关灯')
      this.state === 'off'
    }
  }
}

const light = new Light

/**
 * 状态模式优化
 * light
 */
class OffLightState {
  constructor (light) {
    this.light = light
  }

  buttonWasPressed () {
    console.log('弱光')
    this.light.setState(this.light.weakLightState) // 切换到 weakLightState状态
  }
}

class WeakLightState {
  constructor (light) {
    this.light = light
  }

  buttonWasPressed () {
    console.log('强光')
    this.light.setState(this.light.strongLightState) // 切换到 weakLightState状态
  }
}

class StrongLightState {
  constructor (light) {
    this.light = light
  }

  buttonWasPressed () {
    console.log('关灯')
    this.light.setState(this.light.offLightState) // 切换到 weakLightState状态
  }
}

class Light {
  constructor () {
    this.offLightState = new OffLightState(this)
    this.weakLightState = new WeakLightState(this)
    this.strongLightState = new StrongLightState(this)
    this.button = null
  }

  init () {
    const button = document.createElement('button')
    this.button = document.body.appendChild(button)
    this.button.innerHTML = '开关'

    this.currState = this.offLightState
    this.button.onclick = () => this.currState.buttonWasPressed()
  }

  setState (newState) {
    this.currState = newState
  }
}

const light = new Light
light.init()