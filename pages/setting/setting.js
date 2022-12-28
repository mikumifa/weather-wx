// pages/setting/setting.js
import Notify from '@vant/weapp/notify/notify';
const app=getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: true,
  },
  formatDate(date) {
    var date = new Date(date);
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    return YY + MM + DD;
  },
  Email(e){
   var that=this
   
   let params={
      'province': app.globalData.nowCity.province,
      'country': app.globalData.nowCity.country,
      'city': app.globalData.nowCity.city,
      'wechatOpenid':that.data.openid,
      'email':e.detail
   }
   console.log(params.email)
   wx.request({
      url: app.sqlUrl +"/SetEmail/"+params.wechatOpenid+"/"+params.email+"/"+params.province+"/"+params.city+"/"+params.country,
      method: "POST",
      success() {
            wx.request({
              url: app.sqlUrl +"/GetUserSignInfoByopenId/" +that.data.openid,
              method: "GET",
              success(re2) {
                console.log(re2)
                that.setData({
                  'userInfo.continuitySignDays': re2.data.continuitySignDays,
                  'userInfo.lastSignTime': re2.data.lastSignTime,
                  'userInfo.province': re2.data.province,
                  'userInfo.country': re2.data.country,
                  'userInfo.city': re2.data.city,
                  'userInfo.email': re2.data.email
                })
              }
            })
            //
      }
    })
  },
  Login(e){
    var that=this
    if(that.data.userInfo.lastSignTime.substring(0,10)==this.formatDate(new Date))
        {console.log("明天再去打卡吧")    
        Notify({ type: 'warning', message: '          明天再去打卡吧',color:'#000' ,background:'#FF0000'});

  }
       else wx.request({
          url: app.sqlUrl +"/SignInByopenId/" +that.data.openid,
          method: "POST",
          success() {
            console.log("打卡一次！！")
                wx.request({
                  url: app.sqlUrl +"/GetUserSignInfoByopenId/" +that.data.openid,
                  method: "GET",
                  success(re2) {
                    that.setData({
                      'userInfo.continuitySignDays': re2.data.continuitySignDays,
                      'userInfo.lastSignTime': re2.data.lastSignTime,
                      'userInfo.province': re2.data.province,
                      'userInfo.country': re2.data.country,
                      'userInfo.city': re2.data.city,
                      'userInfo.email': re2.data.email
                    })
                  }
                })
                //
          }
        })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserInfo(e) {
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getUserProfile(e) {
      wx.getUserProfile({
        desc: '用于完善会员资料', 
        success: (res) => {
          wx.setStorageSync('message', res.userInfo)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          var that =this;
          wx.login({
            success: function (res) {
              var code = res.code;
              wx.request({
                url: app.serverUrl +"/wxLogin/" + code,
                method: "POST",
                success: function (result) {
                  //
                  that.setData({
                    openid: result.data.openid,
                    session_key: result.data.session_key
                  })
                  wx.request({
                    url: app.sqlUrl +"/GetUserSignInfoByopenId/" +that.data.openid,
                    method: "GET",
                    success(re2) {
                     console.log(re2)
                      that.setData({
                        'userInfo.continuitySignDays': re2.data.continuitySignDays,
                        'userInfo.lastSignTime': re2.data.lastSignTime,
                        'userInfo.province': re2.data.province,
                        'userInfo.country': re2.data.country,
                        'userInfo.city': re2.data.city,
                        'userInfo.email': re2.data.email
                      })
                    }
    
                  })
                  //
                }
              })
            }
          })
        }
      })
    
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})