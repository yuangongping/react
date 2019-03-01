// 菜单配置
// headerMenuConfig：头部导航配置

const headerMenuConfig = [
	// {
	// 	name: '帮助',
	// 	path: 'https://alibaba.github.io/ice',
	// 	external: true,
	// 	newWindow: true,
	// 	icon: 'bangzhu',
	// },
]

// asideMenuConfig：侧边导航配置

const asideMenuConfig = [
	{
		name: '爬虫运行状态',
		path: '/',
		icon: '#icon-ecs-status',
	},
	{
		name: '爬虫项目管理',
		path: '/project',
		icon: '#icon-manage',
		children: [
			{
				name: '所有项目',
				path: '/project/all',
			},
			{
				name: '添加项目',
				path: '/project/add',
			},
		],
	},
	{
		name: '服务器管理',
		path: '/server',
		icon: '#icon-server',
	},
	{
		name: '个人中心',
		path: '/user',
		icon: '#icon-usercenter',
	}
]

export { headerMenuConfig, asideMenuConfig }
