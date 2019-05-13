// pages/myLost/myLost.js
const app = getApp();

Component({
    data: {
        isLoading: false,
        pageNo: 0,
        pageSize: 15,
        dataArray: []
    },

    lifetimes: {
        attached() {
            wx.setNavigationBarColor({
                frontColor: '#000000',
                backgroundColor: '#ffffff'
            })
            wx.setNavigationBarTitle({ title: '我丢失' })
            this.requestData()
        }
    },

    methods: {
        requestData: function () {
            this.setData({ isLoading: true })
            let that = this
            wx.request({
                url: 'http://jianghuling.top/lost/myLost',
                method: 'POST',
                header: { "Content-Type": "application/x-www-form-urlencoded" },
                data: {     //app.globalData.userId
                    userId: 'abcde',
                    pageNo: this.data.pageNo,
                    pageSize: this.data.pageSize
                },
                success(res) {
                    if (res.data.message == 'SUCCESS') {
                        console.log(res.data)
                        let temp = that.data.dataArray.concat(res.data.lost_list)
                        that.setData({
                            dataArray: temp,
                            isLoading: false
                        })
                        that.data.pageNo++
                    }
                }
            })
        }, 
        
        refreshData: function (i) {
            let that = this
            console.log(this.data.dataArray[i].id)
            console.log(this.data.dataArray[i].category)
            wx.request({
                url: 'http://jianghuling.top/lost/cancelClm',
                method: 'POST',
                header: { "Content-Type": "application/x-www-form-urlencoded" },
                data: {
                    id: this.data.dataArray[i].id,
                    category: this.data.dataArray[i].category
                },
                success(res) {
                    if (res.data.message == 'SUCCESS') {
                        that.data.dataArray.splice(i, 1);
                        let pn = that.data.dataArray.length / that.data.pageSize
                        pn = parseInt(pn)
                        wx.request({
                            url: 'http://jianghuling.top/lost/myPick',
                            method: 'POST',
                            header: { "Content-Type": "application/x-www-form-urlencoded" },
                            data: {
                                userId: 'abcde',
                                pageNo: pn,
                                pageSize: that.data.pageSize
                            },
                            success(res2) {
                                if (res2.data.message == 'SUCCESS') {
                                    that.data.dataArray.push(res2.data.lost_list[res2.data.lost_list.length - 1])
                                    that.setData({ dataArray: that.data.dataArray })
                                }
                            }
                        })
                    }
                }
            })
        },
        
        cancel: function (e) {
            let that = this
            wx.showModal({
                title: '提示',
                content: '确定要撤销吗？',
                success(res) {
                    if (res.confirm) {
                        let i = e.currentTarget.dataset.index
                        that.refreshData(i)
                    }
                }
            })
        },

        onReachBottom: function () {
            this.requestData()
        }
    }
})