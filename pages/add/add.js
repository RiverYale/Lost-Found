const app = getApp();
Component({
    data: {
        addNum: 0,
        backNum: 0,
        card_name: '',
        card_college: '',
        card_stuId: '',
        card_loaction: '',
        other_image: '/images/upload.png',
        other_category: '',
        other_description: '',
        other_location: '',
        page: 0,
        hasImage: false,
        loading: false,
        index: 0,
        category: ['U盘', '雨伞', '钱包证件', '电子产品', '其他']
    },
    
    pageLifetimes: {
        show() {
            if (typeof this.getTabBar === 'function' && this.getTabBar()) {
                this.getTabBar().setData({ selected: 1 })
            }
            this.refreshStatistic();
        }
    },

    methods: {
        refreshStatistic: function() {
            let that = this
            wx.request({
                url: 'http://jianghuling.top/lost/statistics',
                method: 'POST',
                header: { "Content-Type": "application/x-www-form-urlencoded" },
                success(res) {
                    if (res.data.message == 'SUCCESS') {
                        that.setData({
                            addNum: res.data.lost_num,
                            backum: res.data.find_num
                        })
                    }
                }
            })
        },

        selectCard: function() {
            this.setData({ page: 0 })
        },

        selectOther: function () {
            this.setData({ page: 1 })
        },

        cEditName: function(e) {
            this.data.card_name = e.detail.value
        },

        cEditCollege: function(e) {
            this.data.card_college = e.detail.value
        },

        cEditStuId: function(e) {
            this.data.card_stuId = e.detail.value
        },

        cEditLocation: function(e) {
            this.data.card_location = e.detail.value
        },

        oEditDescription: function(e) {
            this.data.other_description = e.detail.value
        },

        oEditLocation: function(e) {
            this.data.other_location = e.detail.value
        },

        chooseImage: function() {
            let that = this
            wx.chooseImage({
                count: 1,
                sizeType: ['compressed'],
                success: function(res) {
                    that.setData({ 
                        other_image: res.tempFilePaths[0],
                        hasImage: true
                    })
                }
            })
        },

        tapCategory: function(e) {
            this.setData({ 
                index: e.detail.value,
                other_category: this.data.category[e.detail.value]
            })
        },

        isFinishFill: function() {
            if (this.data.page == 0) {
                return  this.data.card_name.length != 0 &&
                        this.data.card_college.length != 0 &&
                        this.data.card_stuId.length != 0 &&
                        this.data.card_location.length != 0
            } else {
                return  this.data.hasImage &&
                        this.data.other_category.length != 0 &&
                        this.data.other_description.length != 0 &&
                        this.data.other_location.length != 0
            }
        },

        submit: function() {
            let that = this
            if(!this.isFinishFill()){
                wx.showToast({
                    title: '请将信息填写完整',
                    icon: 'none'
                })
                return
            }
            this.setData({ loading: true })
            if(this.data.page == 0){
                wx.request({
                    url: 'http://jianghuling.top/lost/card',
                    method: 'POST',
                    header: { "Content-Type": "application/x-www-form-urlencoded" },
                    data: { //app.globalData.userId
                        userId: 'abcde',
                        name: this.data.card_name,
                        college: this.data.card_college,
                        stuId: this.data.card_stuId,
                        takePlace: this.data.card_location
                    },
                    success(res) {
                        if (res.data.message == 'SUCCESS') {
                            wx.showToast({ title: '发布成功' })
                            that.refreshStatistic()
                            that.setData({
                                card_name: '',
                                card_college: '',
                                card_stuId: '',
                                card_location: '',
                                loading: false
                            })
                        }
                    }
                })
            }else{
                wx.uploadFile({
                    url: 'http://jianghuling.top/lost/item',
                    filePath: this.data.other_image,
                    name: 'image',
                    formData: { //app.globalData.userId
                        userId: 'abcde',
                        category: this.data.other_category,
                        desc: this.data.other_description,
                        claimMethod: this.data.other_location
                    },
                    success(res) {
                        var data = JSON.parse(res.data);
                        if (data.message == 'SUCCESS') {
                            wx.showToast({ title: '发布成功' })
                            that.refreshStatistic()
                            that.setData({
                                other_image: '/images/upload.png',
                                other_category: '',
                                other_description: '',
                                other_location: '',
                                hasImage: false,
                                loading: false
                            })
                        }
                    }
                })
            }
        }
    }
})
