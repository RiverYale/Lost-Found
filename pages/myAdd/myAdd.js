// pages/myAdd/myAdd.js
const app = getApp();

Component({
    data: {
        dataArray: []
    },

    lifetimes: {
        attached() {
            wx.setNavigationBarColor({
                frontColor: '#000000',
                backgroundColor: '#ffffff'
            })
            wx.setNavigationBarTitle({
                title: '我捡到'
            })
        }
    },

    pageLifetimes: {
        show(){
            this.setData({
                dataArray: [
                    {
                        type: '校园卡',
                        time: '2019-4-24'
                    },
                    {
                        type: 'U盘',
                        time: '2019-4-23'
                    },
                    {
                        type: '电子产品',
                        time: '2019-4-22'
                    }
                ]
            })
        }
    },

    methods: {
        cancel: function(e){
            let i = e.currentTarget.dataset.index
            let that = this
            this.data.dataArray.splice(i, 1);
            this.setData({
                dataArray: that.data.dataArray
            })
            console.log(i)
        }
    }
})