Component({
	data: {
		active: 0,
		list: [
			{
				icon: 'home-o',
				text: '天气',
				url: '/pages/weather/weather'
			},
			{
				icon: 'setting-o',
				text: '设置',
				url: '/pages/setting/setting'
			}
		]
	},

	methods: {
		onChange(event) {
			this.setData({ active: event.detail });
			wx.switchTab({
				url: this.data.list[event.detail].url
			});
		},

		init() {
			const page = getCurrentPages().pop();
			this.setData({
				active: this.data.list.findIndex(item => item.url === `/${page.route}`)
			});
		}
	}
});
