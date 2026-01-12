import type {
	TCategory,
	TProductInProducts,
	TProductInBasket,
	TProductResult,
	TProductsResult,
} from '@/types/responseTypes'
import { Api } from '@/utils/api'
import { API_KEY, API_URL } from '@/utils/constants'
import { projectApi } from '@/utils/projectApi'
import { defineStore } from 'pinia'

const api = new Api(API_URL)
const projectAPI = new projectApi(api)

export type TBasket = {
	items: TProductInBasket[]
	counter: number
}

interface IProductsStore {
	productsInfo: TProductsResult | null
	currentProduct: TProductResult | null
	pages: number
	page: number
	basket: TBasket
	isLoad: boolean
	categories: TCategory[]
	products: TProductInProducts[]
}

export const useProductsStore = defineStore('productsStore', {
	state: (): IProductsStore => ({
		productsInfo: null,
		currentProduct: null,
		pages: 1,
		page: 1,
		basket: {
			items: [],
			counter: 0,
		},
		isLoad: false,
		categories: [],
		products: [],
	}),

	getters: {
		getPages: state => state.pages,
		getBasket: state => state.basket,
		getBasketItems: state => state.basket.items,
		getCurrentProduct: state => state.currentProduct,
		getProductsInfo: state => state.productsInfo,
		getIsLoad: state => state.isLoad,
		getCategories: state => state.categories,
	},

	actions: {
		clearAll() {
			this.productsInfo = null
			this.basket = {
				items: [],
				counter: 0,
			}
			this.pages = 1
			this.currentProduct = null
			this.isLoad = false
			this.products = []
			this.categories = []
		},

		initBasketFromLocalStorage() {
			try {
				const localStorageBasket = localStorage.getItem('basketData')
				if (localStorageBasket) {
					const parsed = JSON.parse(localStorageBasket)
					if (
						parsed &&
						Array.isArray(parsed.items) &&
						typeof parsed.counter === 'number'
					) {
						this.basket = parsed
					}
				}
			} catch (err) {
				console.error('Ошибка при загрузке корзины:', err)
				this.basket = {
					items: [],
					counter: 0,
				}
			}
		},

		addToBasket(product: TProductInProducts, categoryId: number) {
			const exists = this.basket.items.find(item => item.id === product.id)

			if (!exists) {
				const basketItem: TProductInBasket = {
					...product,
					categoryId,
				}

				this.basket.items.push(basketItem)
				this.basket.counter += 1
				this.saveBasketToLocalStorage()
			}
		},

		removeFromBasket(productId: number) {
			const index = this.basket.items.findIndex(item => item.id === productId)
			if (index !== -1) {
				this.basket.items.splice(index, 1)
				this.basket.counter = Math.max(0, this.basket.counter - 1)
				this.saveBasketToLocalStorage()
			}
		},

		clearBasket() {
			this.basket = {
				items: [],
				counter: 0,
			}
			localStorage.removeItem('basketData')
		},

		saveBasketToLocalStorage() {
			localStorage.setItem('basketData', JSON.stringify(this.basket))
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

		async setCurrentProduct(prodId: string) {
			try {
				const product = await projectAPI.getProduct({
					apiKey: API_KEY,
					id: prodId,
				})
				this.currentProduct = product
			} catch (err) {
				console.error(err)
			}
		},

		async fetchProductById(productId: number) {
			try {
				this.setIsLoadTrue()
				const product = await projectAPI.getProduct({
					apiKey: API_KEY,
					id: String(productId),
				})
				this.currentProduct = product
				return product
			} catch (error) {
				console.error('Ошибка загрузки товара:', error)
				this.currentProduct = null
				throw error
			} finally {
				this.setIsLoadFalse()
			}
		},
	},
})
