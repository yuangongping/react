const breadcrumbConfig = (val) => {
	switch (val) {
	case '' : return '爬虫运行状态'
	case 'user' : return '个人中心'
	case 'server': return '服务器管理'
	case 'project': return '爬虫项目管理'
	case 'all': return '所有项目'
	case 'add': return '添加项目'
	case 'info': return '项目详情'
	}
}

export default breadcrumbConfig
