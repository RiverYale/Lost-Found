// pages/myLost/myLost.js
const app = getApp();

Component({
    data: {

    },

    lifetimes: {
        attached() {
            wx.setNavigationBarColor({
                frontColor: '#000000',
                backgroundColor: '#ffffff'
            })
            wx.setNavigationBarTitle({
                title: '我丢失'
            })
        }
    },

    pageLifetimes: {

    },

    methods: {

    }
})