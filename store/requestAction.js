import request from '~/service'

// 反向代理用
const api = '/api'

export const doLogin = async (store, params) => {
	return await request.post(`${api}/user/doLogin`, params)
}
