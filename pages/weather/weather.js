// pages/weather/weather.js
const app = getApp()
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    active: 0,
    province:"",
    city:"",
    country:"",
    weather: "",
    res: []
  },
  loadWeather(){
        wx.request({
          url: app.serverUrl+'/get.do',
          data:app.globalData.nowCity,
          complete(getRes) {
     
            var weather=getRes.data.data
            app.globalData.res[0]={
              province:app.globalData.nowCity.province,
              city: app.globalData.nowCity.city,
              country: app.globalData.nowCity.district,
              weather:weather
            }
          }
        })
        wx.request({
          url: app.serverUrl+'/get.do',
          data:app.globalData.city_0,
          complete(getRes) {
         
            var weather=getRes.data.data
            app.globalData.res[1]={
              province:app.globalData.city_0.province,
              city:app.globalData.city_0.city,
              country:app.globalData.city_0.district,
              weather:weather
            }
          }
        })
        wx.request({
          url: app.serverUrl+'/get.do',
          data:app.globalData.city_1,
          complete(getRes) {
        
            var weather=getRes.data.data
            app.globalData.res[2]={
              province:app.globalData.city_1.province,
              city: app.globalData.city_1.city,
              country:app.globalData.city_1.district,
              weather:weather
            }
          }
        })
        wx.request({
          url: app.serverUrl+'/get.do',
          data:app.globalData.city_2,
          complete(getRes) {
            var weather=getRes.data.data
            app.globalData.res[3]={
              province:app.globalData.city_2.province,
              city: app.globalData.city_2.city,
              country:app.globalData.city_2.district,
              weather:weather
            }
          }
        })
        this.setData({
           res: app.globalData.res
        })
      },
  ChangeIndex(event) {
    wx.showToast({
      title: `切换成功`,
      icon: 'none',
    });
    this.loadWeather();
    var index=event.detail.index;
    var res=app.globalData.res
    console.log(res.length)
    this.setData({
      province:res[index].province,
      city:res[index].city,
      country:res[index].country,
      weather:res[index].weather
    })
    console.log(this.data)
  },
  onLoad() {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'TNMBZ-ZTBWD-QTG4L-PS2WR-UK2DS-WKBP2'
    })
    var that =this;
    qqmapsdk.reverseGeocoder({
      success: function(res) {
        console.warn(app.globalData)
        var nowCity={
          province:res.result.ad_info.province,
            city: res.result.ad_info.city,
            country: res.result.ad_info.district
        }
        app.globalData.nowCity=nowCity;
        app.globalData.chosen=nowCity;
        wx.request({
          url: app.serverUrl+'/get.do',
          data:app.globalData.nowCity,
          complete(getRes) {
    
            var weather=getRes.data.data
   
            app.globalData.res.push({
              province:res.result.ad_info.province,
              city: res.result.ad_info.city,
              country: res.result.ad_info.district,
              weather:weather
            })
          }
        })
        wx.request({
          url: app.serverUrl+'/get.do',
          data:app.globalData.city_0,
          complete(getRes) {
         
            var weather=getRes.data.data
            app.globalData.res.push({
              province:res.result.ad_info.province,
              city: res.result.ad_info.city,
              country: res.result.ad_info.district,
              weather:weather
            })
          }
        })
        wx.request({
          url: app.serverUrl+'/get.do',
          data:app.globalData.city_1,
          complete(getRes) {
      
            var weather=getRes.data.data
            app.globalData.res.push({
              province:res.result.ad_info.province,
              city: res.result.ad_info.city,
              country: res.result.ad_info.district,
              weather:weather
            })
          }
        })
        wx.request({
          url: app.serverUrl+'/get.do',
          data:app.globalData.city_2,
          complete(getRes) {

            var weather=getRes.data.data
            app.globalData.res.push({
              province:res.result.ad_info.province,
              city: res.result.ad_info.city,
              country: res.result.ad_info.district,
              weather:weather
            })
          }
        })
      }
     })
     that.setData({
       res: app.globalData.res
     })
}
})