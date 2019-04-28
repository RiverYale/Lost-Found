// pages/info/info.js
const app = getApp();

Component({
    data: {
        mySchool: '',
        myCollege: '',
        name: '',
        studentId: '',
        index: 0,
        schools: [],
    },

    lifetimes: {
        attached() {
            wx.setNavigationBarColor({
                frontColor: '#000000',
                backgroundColor: '#ffffff'
            })
            wx.setNavigationBarTitle({
                title: '编辑资料'
            })
        }
    },

    pageLifetimes:{
        show: function() {
            this.setData({
                mySchool: app.globalData.mySchool,
                myCollege: app.globalData.myCollege,
                name: app.globalData.name,
                studentId: app.globalData.studentId,
                index: app.globalData.index,
                schools: app.globalData.schools
            })
        }
    },

    methods: {
        tapSchool: function(e) {
            this.setData({
                index: e.detail.value,
                mySchool: this.data.schools[e.detail.value]
            })
            app.globalData.index = this.data.index
            app.globalData.mySchool = this.data.mySchool
        },

        editCollege: function(e) {
            this.setData({
                myCollege: e.detail.value
            })
            app.globalData.myCollege = this.data.myCollege
        },
        
        editName: function(e) {
            this.setData({
                name: e.detail.value
            })
            app.globalData.name = this.data.name
        },

        editStudentId: function(e) {
            this.setData({
                studentId: e.detail.value
            })
            app.globalData.studentId = this.data.studentId
        }
    }
})