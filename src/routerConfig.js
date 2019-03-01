// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import AsideLayout from './layouts/AsideLayout'
import NotFound from './pages/NotFound'
import RunStatus from './pages/RunStatus'
import ServerManage from './pages/ServerManage'
import AllProject from './pages/AllProject'
import AddProject from './pages/AddProject'
import UserCenter from './pages/UserCenter'
import InfoPage from './pages/InfoPage'

const routerConfig = [
	{
		path: '/',
		layout: AsideLayout,
		component: RunStatus,
	},
	{
		path: '/server',
		layout: AsideLayout,
		component: ServerManage
	},
	{
		path: '/project/all',
		layout: AsideLayout,
		component: AllProject
	},
	{
		path: '/project/add',
		layout: AsideLayout,
		component: AddProject
	},
	{
		path: '/user',
		layout: AsideLayout,
		component: UserCenter
	},
	{
		path: '/project/all/info',
		layout: AsideLayout,
		component: InfoPage
	},
	{
		path: '*',
		layout: AsideLayout,
		component: NotFound,
	},
]

export default routerConfig
