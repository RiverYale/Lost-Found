// pages/feedback/feedback.js
const app = getApp();

Component({
    data: {
        adviceInput: '请输入遇到的问题或建议...',
        phoneInput: '选填，便于我们联系你',
        text: '',
        num: ''
    },

    lifetimes: {
        attached() {
            wx.setNavigationBarColor({
                frontColor: '#000000',
                backgroundColor: '#ffffff'
            })
            wx.setNavigationBarTitle({
                title: '我的反馈'
            })
        }
    },

    methods: {
        textInput: function (e) {
            this.data.text = e.detail.value
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
                console.log(this.data.text)
                console.log(this.data.num)
                wx.navigateBack()
                wx.showToast({
                    title: '提交成功'
                })
            }
            // this.setData({
            //     text: '',
            //     num: ''
            // })
        }
    }
})