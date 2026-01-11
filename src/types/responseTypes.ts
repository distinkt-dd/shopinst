export type TProductInProducts = {
	id: number
	name: string
	price: number
	rating: number
	img: string | null
}

export type TProductsResult = {
	page: number
	total_page: number
	items: TProductInProducts[]
}

export type TProductResult = {
	id: number
	name: string
	price: number
	rating: number
	img: string | null
	description: string | null
	'rating_count': number
}