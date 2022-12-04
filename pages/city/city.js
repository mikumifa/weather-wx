// page.js
var app = getApp();
Page({
  data: {

    city_0: {
      province:"江苏省",
      city: "南京市",
      country: "",
 
    },
    city_1: {
      province:"江苏省",
      city: "南京市",
      country: "",
  
    },
    city_2: {
      province:"江苏省",
      city: "南京市",
      country: "",
 
    }, 
    selectorVisible_0: false,
    selectorVisible_1: false,
    selectorVisible_2: false
  },
  // 当用户选择了组件中的城市之后的回调函数

  onSelectCity_0(e) {
    this.setData({
      selectorVisible_0: true
    });
    const { province, city } = e.detail;
    if(province!=null){
      this.setData({
      
        'city_0.province': province.fullname,
        '.city_0.city': city.fullname,
        'city_0.country': ""
      });
      app.globalData.city_0.province= province.fullname,
      app.globalData.city_0.city= city.fullname,
      app.globalData.city_0.country= ""
    }

  },
  onSelectCity_1(e) {
    this.setData({
      selectorVisible_1: true
    });
    const { province, city } = e.detail;
    if(province!=null)
    {
      this.setData({
        'city_1.province': province.fullname,
        'city_1.city': city.fullname,
        'city_1.country': ""
      });
      app.globalData.city_1.province= province.fullname,
      app.globalData.city_1.city= city.fullname,
      app.globalData.city_1.country= ""
    }

  },    
  onSelectCity_2(e) {
    this.setData({
      selectorVisible_2: true
    });
    const { province, city } = e.detail;
    if(province!=null)
    {
      this.setData({
        'city_2.province': province.fullname,
        'city_2.city': city.fullname,
        'city_2.country': "",
      });
      app.globalData.city_2.province= province.fullname,
      app.globalData.city_2.city= city.fullname,
      app.globalData.city_2.country= ""
    }
  }
})