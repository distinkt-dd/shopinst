import { defineStore } from 'pinia'
import type { TProductsResult, TProductResult } from '@/types/responseTypes'
import type { TProducts } from '@/types/requestTypes'
import { Api } from '@/utils/api'
import { projectApi } from '@/utils/projectApi'
import { API_URL, API_KEY } from '@/utils/constants'

const api = new Api(API_URL)
const projectAPI = new projectApi(api)

interface IProductsStore {
	productsInfo: TProductsResult | {}
	currentProduct: TProductResult | {}
	pages: number
	basket: TProducts[] | []
	isLoad: boolean
	counter: number
}

export const useProductsStore = defineStore('productsStore', {
	state: (): IProductsStore => ({
		productsInfo: {},
		currentProduct: {},
		pages: 1,
		basket: [],
		isLoad: false,
		counter: 0
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
		getCounter: state => state.counter 
	},

	actions: {
		clearAll() {
			this.productsInfo = {}
			this.basket = []
			this.pages = 1
			this.currentProduct = {}
			this.isLoad = false
			this.counter = 0
		},

		setIsLoadTrue() {
			this.isLoad = true
		},

		setIsLoadFalse() {
			this.isLoad = false
		},

		async setProductsInfo(page: number, category_id: number) {
			try {
				const productsInfo = await projectAPI.getProductInfo({
					apiKey: API_KEY,
					page: page,
					categoryId: category_id,
				})
				this.productsInfo = productsInfo
			} catch (err) {
				console.error(err)
			}
		},
	},
})
