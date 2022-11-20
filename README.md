# weather-wx

[介绍 - Vant Weapp (gitee.io)](https://vant-contrib.gitee.io/vant-weapp/#/home)

前端代码

那个UI库应该挺不错的。

## 写界面：

主要在`.wxml`文件里面，wxml里面用到的数据在`.js`里面

调试器里面会显示有的包。

![image-20221120140015825](https://blog-1314638240.cos.ap-nanjing.myqcloud.com/image/image-20221120140015825.png)

```js
// pages/weather/weather.js
const app = getApp()
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
  },
  onLoad: function() {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'TNMBZ-ZTBWD-QTG4L-PS2WR-UK2DS-WKBP2'
    })
    var that =this;
    qqmapsdk.reverseGeocoder({
      success: function(res) {
        console.log(res);
        wx.request({
          url: 'http://localhost:12346/get.do',
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
```

![image-20221120140100624](https://blog-1314638240.cos.ap-nanjing.myqcloud.com/image/image-20221120140100624.png)

setData，可以设置页面里面data的值，可以理解为在里面设置的key值，可以在wxml里面使用，

![image-20221120140230377](https://blog-1314638240.cos.ap-nanjing.myqcloud.com/image/image-20221120140230377.png)

## 底边栏的更改

1.在index.js的data里面的list里面添加页面的路径

![image-20221120140308367](https://blog-1314638240.cos.ap-nanjing.myqcloud.com/image/image-20221120140308367.png)

2.在app.js中的list里面添加路径

![image-20221120140458696](https://blog-1314638240.cos.ap-nanjing.myqcloud.com/image/image-20221120140458696.png)

