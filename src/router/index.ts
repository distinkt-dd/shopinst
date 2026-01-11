import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import MainPage from '@pages/MainPage.vue'
import BasketPage from '@pages/BasketPage.vue'

declare module 'vue-router' {
	interface RouteMeta {
		title?: string
		contentTitle?: string
	}
}

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'MainPage',
		component: MainPage,
		meta: {
			title: 'SHOP | Главная',
			contentTitle: 'Витрина товаров',
		},
	},
	{
		path: '/basket',
		name: 'BasketPage',
		component: BasketPage,
		meta: {
			title: 'SHOP | Корзина',
			contentTitle: 'Корзина',
		},
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
	linkActiveClass: 'active',
	linkExactActiveClass: 'active',
})

router.beforeEach((to, from, next) => {
	const title = to.meta.title as string

	if (title) {
		document.title = title
	} else {
		document.title = 'SHOP'
	}

	next()
})

export default router
