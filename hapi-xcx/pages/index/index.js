//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    auth: '',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.request({
      url: `http://localhost:8001/orders/7/pay`, // 我们的服务端地址
      method: 'POST',
      header: {
        authorization: this.data.auth,
      },
      data: {
        
        orderId: 7
      },
      success: res => {
        // res.data 为服务端正确登录后签发的 JWT
        console.log(res.data)
        this.setData({
          auth: res.data
        })
        wx.setStorageSync('auth', res.data);
      }
    })
    wx.requestPayment({
      'timeStamp': '',
      'nonceStr': '',
      'package': '',
      'signType': 'MD5',
      'paySign': '',
      'success': function(res) {},
      'fail': function(res) {},
      'complete': function(res) {}
    })
  },
  onLoad: function() {
  
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    let encryptedData = e.detail.encryptedData
    let iv = e.detail.iv
    wx.login({
      timeout: 3000,
      success: res => {
        const code = res.code;
        console.log(code)
        wx.request({
          url: `http://localhost:8001/users/wxLogin`, // 我们的服务端地址
          method: 'POST',
          data: {
            code,
            encryptedData,
            iv
          },
          success: res => {
            // res.data 为服务端正确登录后签发的 JWT
            
            this.setData({
              auth: res.data
            })
            wx.setStorageSync('auth', res.data);
            console.log(this.data.auth)
          }
        })
      }
    })
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})