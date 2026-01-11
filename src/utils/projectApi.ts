import type { TProductOnce, TProducts } from '@/types/requestTypes'
import type { TProductsResult, TProductResult } from '@/types/responseTypes'
import type { IApi } from '@/types/globalTypes'

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
		const response: TProductResult = await this.api.get(`product/${options.id}?api_key=${options.apiKey}`)
		return response
	}
	
}
