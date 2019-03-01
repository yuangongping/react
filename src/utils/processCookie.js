import Cookies from 'js-cookie'

const TOKEN_KEY = 'Token'

const COOKIE_EXPIRES = 7

export const setToken = (token) => {
	Cookies.set(TOKEN_KEY, token, { expires: COOKIE_EXPIRES || 1 })
}

export const getToken = () => {
	const token = Cookies.get(TOKEN_KEY)
	if (token) return token
	return false
}

