module.exports = {
	// 登录mock
	'POST /api/login': (req, res) => {
		const { password, username } = req.body
		if (username === 'admin' && password === 'admin') {
			res.send({
				status: 200,
				statusText: 'ok',
				currentAuthority: 'admin',
			})
		} else if (username === 'user' && password === 'user') {
			res.send({
				status: 200,
				statusText: 'ok',
				currentAuthority: 'user',
			})
		} else {
			res.send({
				status: 401,
				statusText: 'unauthorized',
				currentAuthority: 'guest',
			})
		}
	},
	// 注册mock
	'POST /api/register': (req, res) => {
		res.send({
			status: 200,
			statusText: 'ok',
			currentAuthority: 'user',
		})
	},
	// 安全退出mock
	'POST /api/logout': (req, res) => {
		res.send({
			status: 200,
			statusText: 'ok',
			currentAuthority: 'guest',
		})
	},
}
