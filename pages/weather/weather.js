// pages/weather/weather.js
const app = getApp()
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: true,
    logged: false,
    takeSession: false,
    requestResult: '',
  },
  
  onLoad() {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'TNMBZ-ZTBWD-QTG4L-PS2WR-UK2DS-WKBP2'
    })
    var that =this;
    qqmapsdk.reverseGeocoder({
      success: function(res) {
        console.log(res);
        wx.request({
          url: app.serverUrl+'/get.do',
          data: {
            province:res.result.ad_info.province,
            city: res.result.ad_info.city,
            country: res.result.ad_info.district
          },
          complete(getRes) {
            console.log(getRes)
            var weather=getRes.data.data
            console.log(weather)

            that.setData({
              province:res.result.ad_info.province,
              city: res.result.ad_info.city,
              country: res.result.ad_info.district,
              weather:weather
            })
          }
        })
      }
     })
}
})