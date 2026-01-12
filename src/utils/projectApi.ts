import type { IApi } from '@/types/globalTypes'
import type {
	TCategotiesOptions,
	TProductOnce,
	TProducts,
} from '@/types/requestTypes'
import type {
	TCategoriesResult,
	TProductResult,
	TProductsResult,
} from '@/types/responseTypes'

export class projectApi {
	private api: IApi

	constructor(api: IApi) {
		this.api = api
	}

	async getProductInfo(options: TProducts): Promise<TProductsResult> {
		const response: TProductsResult = await this.api.get(
			`/product?api_key=${options.apiKey}&page=${options.page}&category_id=${options.categoryId}`
		)
		return response
	}

	async getProduct(options: TProductOnce): Promise<TProductResult> {
		const response: TProductResult = await this.api.get(
			`product/${options.id}?api_key=${options.apiKey}`
		)
		return response
	}

	async getCategories(options: TCategotiesOptions): Promise<TCategoriesResult> {
		const response: TCategoriesResult = await this.api.get(
			`/category?api_key=${options.apiKey}`
		)
		return response
	}
}
