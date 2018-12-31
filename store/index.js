import Vue from 'vue'
import Vuex from 'vuex'
import menuData from './menuData'
import * as actions from './requestAction'

Vue.use(Vuex)

const hasPermission = permission => {
	// 过滤路由
	const filterRouter = filterAsyncRouter(menuData, permission)
	// 添加路由的时候排除掉dashboard
	// router.addRoutes(filterRouter)
	return filterRouter
}

function filterAsyncRouter(AsyncRouterMap, permission) {
	const routerMap = AsyncRouterMap.filter(item => {
		if (typeof item.permission === 'string') {
			return permission.indexOf(item.permission) > -1
		} else if (item.permission instanceof Array) {
			const filter = item.permission.filter(
				items => permission.indexOf(items) > -1
			)
			if (filter.length && item.children) {
				item.children = filterAsyncRouter(item.children, permission)
			}
			return filter.length
		} else {
			return item
		}
		// return item.permission
		// return item
	})
	return routerMap
}

const store = () =>
	new Vuex.Store({
		state: {
			spinning: true,
			menuData: [], // 存储菜单路由数据
			userName: ''
		},
		mutations: {
			LOADING: (state, loading) => {
				state.spinning = loading
			},
			SAVE_USER: (state, userName) => {
				state.userName = userName
			},
			SAVE_MENU: (state, resolve) => {
				const menuDataFilter = hasPermission([])
				state.menuData = menuDataFilter
				!!resolve && resolve()
				// const list: string[] = [];
				// menuData.map(item => list.push(item.name ? item.name : ''));
				// state.keepList = list; // 菜单列表的页面都需要缓存
			}
		},
		actions
		// actions: {
		// 	GetMenuData: context => {
		// 		const menuDataFilter = hasPermission([])
		// 		context.commit('SAVE_MENU', menuDataFilter)
		// 	},

		// 	SaveUsername: (context, userInfo) => {
		// 		context.commit('SAVE_USER', userInfo)
		// 	}
		// }
	})

export default store
