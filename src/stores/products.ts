import type {
	TCategory,
	TProductInProducts,
	TProductResult,
	TProductsResult,
} from '@/types/responseTypes'
import { Api } from '@/utils/api'
import { API_KEY, API_URL } from '@/utils/constants'
import { projectApi } from '@/utils/projectApi'
import { defineStore } from 'pinia'

const api = new Api(API_URL)
const projectAPI = new projectApi(api)

interface IProductsStore {
	productsInfo: TProductsResult | {}
	currentProduct: TProductResult | {}
	pages: number
	page: number
	basket: TProductInProducts[]
	isLoad: boolean
	counter: number
	categories: TCategory[] | []
	products: TProductInProducts[] | []
}

export const useProductsStore = defineStore('productsStore', {
	state: (): IProductsStore => ({
		productsInfo: {},
		currentProduct: {},
		pages: 1,
		page: 1,
		basket: [],
		isLoad: false,
		counter: 0,
		categories: [],
		products: [],
	}),

	getters: {
		getPages: state => state.pages,
		getBasket: state => state.basket,
		getCurrentProduct: state => state.currentProduct,
		getProductsInfo: state => state.productsInfo,
		getData: state => {
			state.basket, state.currentProduct, state.pages, state.productsInfo
		},
		getIsLoad: state => state.isLoad,
		getCounter: state => state.counter,
		getCategories: state => state.categories,
	},

	actions: {
		clearAll() {
			this.productsInfo = {}
			this.basket = []
			this.pages = 1
			this.currentProduct = {}
			this.isLoad = false
			this.counter = 0
			this.products = []
			this.categories = []
		},

		setBasketPlus(product: TProductInProducts, categoryId: number) {
			if (product) {
				const prodInBasket =
					this.basket.find(prod => prod.id === product.id) !== undefined
				if (!prodInBasket) {
					this.basket.push(product)
					this.counter += 1

					localStorage.setItem(
						'basketData',
						JSON.stringify({
							basket: this.basket.map(item => ({
								...item,
								categoryId: categoryId,
							})),
							counter: this.counter,
						})
					)
				}
			}
		},

		setPage(operator: boolean) {
			if (operator) {
				this.page += 1
			} else {
				this.page -= 1
			}
		},

		pageClear() {
			this.page = 1
		},

		setIsLoadTrue() {
			this.isLoad = true
		},

		setIsLoadFalse() {
			this.isLoad = false
		},

		async setProductsInfo(page: number, category_id: number) {
			try {
				if (page <= this.pages) {
					const productsInfo = await projectAPI.getProductInfo({
						apiKey: API_KEY,
						page: page,
						categoryId: category_id,
					})
					this.productsInfo = productsInfo
					this.pages = productsInfo.total_pages
					this.products = productsInfo.items
				} else {
					console.error('Ошибка в указании page!')
				}
			} catch (err) {
				console.error(err)
			}
		},

		async setCategories() {
			try {
				const categories = await projectAPI.getCategories({
					apiKey: API_KEY,
				})
				this.categories = categories
			} catch (err) {
				console.dir(err)
			}
		},
	},
})
