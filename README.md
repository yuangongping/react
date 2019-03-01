## 安装

 ```js
yarn

// or

npm i

 ```
## 开始

```js
// run
yarn start
// or
npm run start

// build
yarn build
// or
npm run build
```

## 目录结构:

* react-router @4.x 默认采用 hashHistory 的单页应用
* 入口文件: `src/index.js`
* 导航配置: `src/menuConfig.js`
* 路由配置: `src/routerConfig.js`
* 路由入口: `src/router.jsx`
* 布局文件: `src/layouts`
* 通用组件: `src/components`
* 页面文件: `src/pages`
* 请求配置: `src/utils/_http.js`
* 配置cookie: `src/utils/processCookie.js`

## 使用

关于使用飞冰桌面端一键添加区块物料等功能，建议（不是必须）在添加后做小量格式当面的修改，飞冰中我常看到的写法其实是一种对于初识者更方面认知react组件结构的文件布局方式。如：
```

├── src
│   ├── components   // 公共组件
│   ├── layouts      // 通用布局
│   ├── pages        // 页面
        ├── Test
            ├── index.js // 引入'/pages/Test'会直接加载index.js
            ├── test.jsx // jsx语法的布局组件，通过index.js引入后导出

```
其实这里我们会多写一步引入导出操作，并没有真正意义上的解构（当然也可以在index中写class，倒入jsx文件中的render），所以这样的写法更意指react的结构体系说明；但是我们这里默认规定自己添加组件的时候保持一下的结构：
```

├── src
│   ├── components   // 公共组件
│   ├── layouts      // 通用布局
│   ├── pages        // 页面
        ├── Test
            ├── index.js // 组件内容
            ├── components // 此pages的组件
            ├── scss // 此pages的样式
```
### 关于mockData的使用

```js
// /mock/test.js
module.exports = {
	// test mock
	'POST /api/test': (req, res) => {
		res.send({
			status: 200,
			message: 'success',
			data: {
				info: '大家好，我是吴彦祖'
			},
		})
	}
}

// /mock/index.js
const login = require('./login')
const test = require('./test')
const xxx = require('./xxx')

module.exports = Object.assign({}, test, login, xxx)

// /src/pages/Home/index.js
import request from '../../utils/_http'

class Home extends Component {
  state = {
  	info: ''
  }
  getInfo = () => {
  	request.post('/api/test', {})
  		.then(e => {
  			this.setState({
  				info: e.data.info
  			})
  		})
  }
  render () {
  	return (
  		<div className='baseStyle'>
        我的信息是：{this.state.info}
  			<br />
  			<button onClick={this.getInfo}>click get info</button>
  		</div>
  	)
  }
}
export default Home
```
### 关于路由的配置

* 同vue配置路由很像，见下：变量名 routerConfig 为 iceworks 检测关键字，请不要修改文件名称

```js
import AsideLayout from './layouts/AsideLayout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const routerConfig = [
	{
		path: '/',
		layout: AsideLayout,
		component: Home,
	},
	{
		path: '*',
		layout: AsideLayout,
		component: NotFound,
	},
]
```
### 关于菜单的配置

* name配置菜单名称、path配置路由、icon配置图标、children配置子菜单

```js
// 菜单配置
// asideMenuConfig：侧边导航配置
const asideMenuConfig = [
	{
		name: '数据管理',
		path: '/',
		icon: 'home',
		children: [
			{
				name: '管理列表',
				path: '/',
			},
			{
				name: '数据监控',
				path: '/monitor',
			},
		],
	}
]

export { asideMenuConfig }
```
### 关于图片的资源的存放和公共css的存放

```

├── src
│   ├── assets // 资源文件夹
        ├── images // 图片文件
        ├── styles // css文件

```
### 关于面包屑

* 首先，面包屑封装在components/Breadcrumb/index.js中，引用在layouts/AsideLayout/index.js。
* 参数主要有三个，route（require）/fristTitle/hasFristTitle（require）
* route固定传入this.props.location, 为必选
* fristTitle传入固定第一级的名称, 非必选
* hasFristTitle是否存在第一级面包屑, 为必选

**关于配置面包屑路由名称在文件src/breadcrumbConfig.js中**
参数val为路由pathname
例如：路由为'/a/b', 此时val会分别传入a和b, 这里需要自己来自定义a的面包屑名称和b的面包屑名称
```js
const breadcrumbConfig = (val) => {
	switch (val) {
	case '' : return '爬虫运行状态'
	case 'user' : return '个人中心'
	case 'server': return '服务器管理'
	case 'project': return '爬虫项目管理'
	case 'all': return '所有项目'
	case 'add': return '添加项目'
	}
}

export default breadcrumbConfig

```

## 结束
* 此后如有需要新加入一些依赖，如redux等会更新此readme，有错误请指正；
* **注：之后会加入redux或者mobx，现在可以做一些了解以便需要使用的时候能快速上手**
