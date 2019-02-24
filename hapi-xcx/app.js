//app.js
App({

  onShow: function() {
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.setStorageSync('auth', true)
        } else {
          wx.redirectTo({
            url: '/pages/home/home',
          })
          wx.setStorageSync('auth', false)

        }
      }
    })

  },
})