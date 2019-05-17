//app.js
App({
    globalData: {
        userInfo: null,
        schools: ['四川大学'],
        userId: '',
        newUser: true,
        url: 'https://aneoncode.com'
    },
    
    onLaunch: function() {
        var that = this
        wx.login({
            success(res) {
                if (res.code) {
                    wx.request({
                        url: that.globalData.url+'/account/login',
                        method: 'POST',
                        header: { "Content-Type": "application/x-www-form-urlencoded" },
                        data: { jscode: res.code },
                        success(res) {
                            if (res.data.message == 'SUCCESS') {
                                that.globalData.userId = res.data.userId
                                if (res.data.code == 1) that.globalData.newUser = false
                                if (that.userIdReadyCallback) that.userIdReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: res => {
                            this.globalData.userInfo = res.userInfo
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    }
})