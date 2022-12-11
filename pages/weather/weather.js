// pages/weather/weather.js
const app = getApp()
let mythis = null;
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    active: 0,
    province:"",
    city:"",
    country:"",
    weather: "",
    res: [],
    location: '上海市',
    hasRefresh: false,
    nowBackGround: [100, 8],
    nowTemperature: '0 ℃',
    nowWind: '晴/东北风  微风',
    nowAir: '50  优',
    hourlyArr: [],
    dailyForecast: [],
    lifeStyle: [],
    week: '',
    time:{
      YY:"",
      MM:"",
      DD:""
   }
  },
  formatDate(date) {
   var date = new Date(date);
   var YY = date.getFullYear() ;
   var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) ;
   var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
   this.setData({
      'time.DD':DD,
      'time.MM':MM,
      'time.YY':YY
   })
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
   var index=event.detail.index;
   var res=app.globalData.res
   this.loadWeather();
   this.setData({
     province:res[index].province,
     city:res[index].city,
     country:res[index].country,
     weather:res[index].weather
   })
    wx.showToast({
      title: `切换成功`,
      icon: 'none',
    });
    this.loadWeather();
    mythis.setData({
      province:res[index].province,
      city:res[index].city,
      country:res[index].country,
      weather:res[index].weather
    })
    this.onShow();
  },
  onLoad() {
    // 实例化API核心类
    this.formatDate(new Date())
    qqmapsdk = new QQMapWX({
      key: 'TNMBZ-ZTBWD-QTG4L-PS2WR-UK2DS-WKBP2'
    })
    var that =this;
    qqmapsdk.reverseGeocoder({
      success: function(res) {
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
            that.setData({
              country: that.data.city,
            })
            that.setData({
               province:res.result.ad_info.province,
              city: res.result.ad_info.city,
              country: res.result.ad_info.district,
              weather:weather
            })
            console.log(weather)
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
       res: app.globalData.res,
     })

},
 onShow: function () {
   mythis = this;
   this.setData({
   })
},
})