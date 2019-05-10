// pages/feedback/feedback.js
const app = getApp();

Component({
    data: {
        adviceInput: '请输入遇到的问题或建议...',
        phoneInput: '选填，便于我们联系你',
        text: '',
        num: '',
        count: 0
    },

    lifetimes: {
        attached() {
            wx.setNavigationBarColor({
                frontColor: '#000000',
                backgroundColor: '#ffffff'
            })
            wx.setNavigationBarTitle({ title: '我的反馈' })
        }
    },

    methods: {
        textInput: function (e) {
            this.data.text = e.detail.value
            this.setData({ count: e.detail.value.length })
        },

        numInput: function (e) {
            this.data.num = e.detail.value
        },

        submit: function() {
            if (this.data.text == ''){
                wx.showToast({
                    title: '反馈或建议不能为空',
                    icon: 'none'
                })
            }else{
                var that = this
                wx.request({
                    url: 'http://jianghuling.top/cst/comment',
                    method: 'POST',
                    header: { "Content-Type": "application/x-www-form-urlencoded" },
                    data: {
                        desc: that.data.text,
                        phone: that.data.num
                    },
                    success(res){
                        if (res.data.message == 'SUCCESS'){
                            wx.navigateBack()
                            wx.showToast({
                                title: '提交成功'
                            })
                        }else{
                            wx.showToast({
                                icon: 'none',
                                title: '提交失败'
                            })
                        }
                    },
                    fail(res){
                        wx.showToast({
                            icon: 'none',
                            title: '提交失败'
                        })
                    }
                })
            }
        }
    }
})