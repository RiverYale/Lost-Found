Component({
    data: {
        addNum: 0,
        backNum: 0
    },
    
    lifetimes: {

    },

    pageLifetimes: {
        show() {
            if (typeof this.getTabBar === 'function' &&
                this.getTabBar()) {
                this.getTabBar().setData({
                    selected: 1
                })
            }
        }
    }
})
