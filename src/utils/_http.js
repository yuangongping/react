import axios from 'axios'
import qs from 'qs'
import config from './_httpConfig'

const service = axios.create(config)

// 传参格式化
service.interceptors.request.use(
	config => {
		if (config.method === 'post') config.body = qs.stringify(config.data)
		return config
	},
	error => {
		return Promise.reject(error)
	}
)
// 返回结果处理
service.interceptors.response.use(
	res => {
		// 这里可根据实际情况做一些操作
		// if (res.status === 200) return res.data
		return res.data
	}, error => {
		if (error && error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
			return Promise.reject('请求超时')
		} else {
			return Promise.reject('服务器网络错误')
		}
	}
)

export default {
	// post function
	post (url, data) {
		// console.log('post request url', url)
		return service({
			method: 'post',
			url,
			data
		})
	},
	// get function
	get (url, data) {
		// console.log('get request url', url)
		return service({
			method: 'get',
			url,
			params: data
		})
	},
	// delete function
	delete (url, data) {
		// console.log('delete request url', url)
		return service({
			method: 'delete',
			url,
			params: data
		})
	}
}
