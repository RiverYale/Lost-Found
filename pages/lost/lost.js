// pages/lost.js
Page({
  data: {
    scrollHeight: '',
    loadingWidth: '',
    showplace: false,
    completedmsg: "",
    cardplace: false,
    cardplace_index: 0,
    zhezhao: false,
    zhezhao1: false,
    navleftenable: false,
    btn_1index: 0,
    curNav: 0,
    itemsinfo: 0,
    cardinfo: [],
    iteminfo: [],
    itemid: 0,
    btn_1_size: 0,
    // hasMoreData: true,
    // isRefreshing: false,
    isLoadingMoreData: false,
    isLoad: false,
    nowPage: 0,
    bottomLoading: false, //控制底部加载栏的渲染与否
    navLeftItems: [
      "校园卡",
      "优盘",
      "雨伞",
      "钱包证件",
      "电子产品",
      "其他"
    ],
    imgUrls: [
      '../../images/ad.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  suretoget: function(kind, sindex) {
    var that = this;
    if (kind == "card") {
      wx.request({
        url: "http://jianghuling.top/lost/claim/card",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: { //app.globalData.userId
          userId: "abcde",
          cardId: that.data.cardinfo.lost_card_list[sindex].id
        },
        method: 'POST',
        success: function(res) {
          console.log("请求成功")
        },
        fail: function() {
          console.log("请求失败")
        }
      })
    } else {
      wx.request({
        url: "http://jianghuling.top/lost/claim/item",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {  //app.globalData.userId
          userId: "abcde",
          itemId: that.data.iteminfo.lost_item_list[this.data.itemid].item_id,
        },
        method: 'POST',
        success: function(res) {
          console.log("请求成功")
        },
        fail: function() {
          console.log("请求失败")
        }
      })
    }
  },
  changebtn: function(e) {
    this.setData({
      navleftenable: true,
    })
  },
  changeleft: function(e) {
    var str = this.data.navLeftItems[e.currentTarget.dataset.index];
    var bytesCount = 0;
    for (var i = 0, n = str.length; i < n; i++) {
      var c = str.charCodeAt(i);
      if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
        bytesCount += 1;
      } else {
        bytesCount += 2;
      }
    }
    //var p = this.data.nowPage + 1;
    var array = [];
    this.setData({
      btn_1index: e.currentTarget.dataset.index,
      navleftenable: false,
      curNav: e.currentTarget.dataset.index,
      btn_1_size: bytesCount,
      nowPage: 0,
      cardinfo: array,
      iteminfo: array,
      isLoad: false,
      isLoadingMoreData: false,
    })
    var left = this.data.navLeftItems[e.currentTarget.dataset.index];
    this.lostrequest(left);
  },
  showitemsinfo: function(e) {
    this.setData({
      zhezhao: true,
      itemid: e.currentTarget.dataset.index
    })
  },
  cancel: function() {
    this.setData({
      zhezhao: false,
      showplace: false
    })
  },
  showitemsplace: function(e) {
    var kind = e.currentTarget.id;
    var sindex = this.data.itemid;
    this.setData({
      showplace: true
    })
    this.suretoget(kind, sindex);
  },

  cardplacekit: function(e) {
    //console.log(e)
    var kind = e.currentTarget.id;
    var sindex = e.currentTarget.dataset.index;
    this.setData({
      cardplace_index: sindex,
      cardplace: true,
    })
    this.suretoget(kind, sindex);
  },

  lookcardinfo: function(e) {
    this.setData({
      zhezhao1: true,
    })
    var k = e.currentTarget.id;
    if (k == "name") {
      this.setData({
        completedmsg: this.data.cardinfo.lost_card_list[e.currentTarget.dataset.index].name,
      })
    }
    if (k == "college") {
      this.setData({
        completedmsg: this.data.cardinfo.lost_card_list[e.currentTarget.dataset.index].college,
      })
    }
    if (k == "place") {
      this.setData({
        completedmsg: this.data.cardinfo.lost_card_list[e.currentTarget.dataset.index].take_place,
      })
    }
  },
  cancel1: function(e) {
    this.setData({
      zhezhao1: false,
    })
  },
  onLoad: function(url, postData) {
    var left = "校园卡";
    this.lostrequest(left);
  },
  onReady: function() {
    let that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight-159,
          loadingWidth: res.windowWidth,
        })
      },
    })
  },

  lostrequest: function(left) {
    var that = this;
    wx.request({
      url: 'http://jianghuling.top/lost/showInfo',
      data: {
        pageNo: this.data.nowPage, //设置为全局变量，在每次切换栏目的后都会重新清零
        pageSize: 10,
        category: left
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        if (left == "校园卡") {
          if (Object.keys(that.data.cardinfo).length != 0) {
            var list = that.data.cardinfo;
            for (var i = 0; i < res.data.lost_card_list.length; i++) {
              list.lost_card_list.push(res.data.lost_card_list[i]);
            }
            var t = false;
            if (res.data.lost_card_list.length == 0 || res.data.lost_card_list.length < 10) {
              t = true;
            }
            that.setData({
              cardinfo: list,
              bottomLoading: false,
              isLoad: t,
            })
          } else {
            that.setData({
              cardinfo: res.data,
            })
          }
        } else {
          if (Object.keys(that.data.iteminfo).length != 0) {
            var list = that.data.iteminfo;
            for (var i = 0; i < res.data.lost_item_list.length; i++) {
              list.lost_item_list.push(res.data.lost_item_list[i]);
            }
            var t = false;
            if (res.data.lost_item_list.length == 0 || res.data.lost_item_list.length < 10) {
              t = true;
            }
            that.setData({
              iteminfo: list,
              bottomLoading: false,
              isLoad: t
            })
          } else {
            that.setData({
              iteminfo: res.data,
            })
          }
        }
      },
      fail: function(res) {
        console.log("请求失败")
        that.setData({
          bottomLoading: false,
        })
      },
    })
  },

  search: function(e) {
    var k = this.data.navLeftItems[this.data.curNav];
    if (k == "校园卡") {
      this.searchcard(e.detail.value);
    } else {
      this.searchitem(k, e.detail.value);
    }
  },

  searchcard: function(keyword) {
    var that = this;
    wx.request({
      url: 'http://jianghuling.top/lost/searchCard',
      data: {
        name: keyword,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        that.setData({
          cardinfo: res.data
        })
      },
      fail: function(res) {
        console.log("请求失败")
      },
      complete: function(res) {},
    })
  },

  searchitem: function(category, keyword) {
    var that = this;
    wx.request({
      url: 'http://jianghuling.top/lost/searchItem',
      data: {
        category: category,
        desc: keyword,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        that.setData({
          iteminfo: res.data,
          isLoadingMoreData:false
        })
      },
      fail: function(res) {
        console.log("请求失败")
      },
      complete: function(res) {},
    })
  },

  loadMoreData: function() {
    if(this.data.isLoadingMoreData == true){
      return ;
    }
    console.log("hhh")
    var that = this;
    var p = this.data.nowPage + 1;
    this.setData({
      isLoadingMoreData: true,
      nowPage: p,
    })
    var left = (this.data.curNav == 0 ? "校园卡" : "物品");
    setTimeout(function() {
      that.lostrequest(left); //数据请求
    }, 600) //延迟时间 这里是1秒
  },
})