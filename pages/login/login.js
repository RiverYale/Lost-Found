// pages/login/login.js
const app = getApp()
Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        index: 0,
        schools: [],
        mySchool: '选择高校'
    },

    bindPickerChange: function(e){
        this.setData({
            index: e.detail.value,
            mySchool: this.data.schools[e.detail.value],
            hasUserInfo: true
        })
        app.globalData.mySchool = this.data.mySchool
        app.globalData.index = this.data.index
    },

    getUserInfo: function (e) {
        if (e.detail.userInfo === undefined){
            wx.showToast({
                title: '绑定失败',
                icon: 'none'
            })
        } else {
            app.globalData.userInfo = e.detail.userInfo
            this.setData({
                userInfo: e.detail.userInfo,
                hasUserInfo: true
            })
            wx.switchTab({
                url: '/pages/lost/lost'
            })
            wx.showToast({
                title: '绑定成功'
            })
        }
    },

    onLoad: function (options) {
        this.setData({
            mySchool: app.globalData.mySchool,
            schools: app.globalData.schools,
            index: app.globalData.index
        })
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
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
    }
})