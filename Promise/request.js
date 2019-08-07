import { GLOBAL } from './api'
import { fly } from '../plugin/http'

const AUTH_TOKEN = 'MALL_MP_TOKEN'

class Auth {
  static checkIn () {
    return new Promise((resolve, reject) => {
      if (!Auth.getToken() || Auth.getToken() === 'undefined') {
        wx.login({
          success: (res) => {
            const code = res.code
            fly.get(GLOBAL.LOGIN, {
              code: code
            }).then((res) => {
              this.setToken(res.token)
              resolve('already login')
            })
          },
          fail: (err) => {
            reject(err)
          }
        })
      } else {
        resolve('already login')
      }
    })
  }

  static getToken () {
    return wx.getStorageSync(AUTH_TOKEN)
      ? wx.getStorageSync(AUTH_TOKEN)
      : ''
  }

  static setToken (val) {
    if (val) {
      wx.setStorageSync(AUTH_TOKEN, val)
    } else {
      wx.removeStorageSync(AUTH_TOKEN)
    }
  }

  static removeToken () {
    wx.removeStorageSync(AUTH_TOKEN)
  }
}

export default Auth

import Fly from 'flyio'
import Auth from './../utils/auth'

const fly = new Fly()

// const PREFIX = 'http://192.168.10.100:3006'
// const PREFIX = 'http://192.168.0.131:3006'
const PREFIX = 'http://192.168.31.52:3006'

fly.interceptors.request.use((request) => {
  request.baseURL = `${PREFIX}/mall`
  request.headers['x-auth-token'] = Auth.getToken()

  return request
})

fly.interceptors.response.use(
  (response) => {
    return new Promise((resolve, reject) => {
      const { data } = response

      if (data.code === 0) {
        resolve(data.data !== undefined ? data.data : data)
      }

      // 红包活动，当 code返回10004，未绑定手机号
      if (data.code === 10004) {
        resolve(data)
      }

      if (data.code === 40001 || data.code === 41001) {
        Auth.removeToken()
        resolve({msg: 'token非法'})
      }

      resolve({
        msg: data.msg || 'ajax出错',
        code: data.code
      })
    })
  },
  (err) => {
    return Promise.reject(err)
  }
)

export {
  fly,
  PREFIX
}

export default {
  install (Vue) {
    Vue.prototype.$http = fly
  }
}

