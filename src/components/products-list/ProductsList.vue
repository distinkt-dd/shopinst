<template>
	<div class="products">
		<ul class="products__list">
			<li v-for="prod in content" :key="prod.id" class="products__list-item">
				<article class="products__card" @click="handleCardClick">
					<app-substrate class="products__substrate">
						<div class="products__imgbox">
							<img :src="prod.img" :alt="prod.name" v-if="prod.img" />
							<p v-else class="proudcts__imgerror">Изображение отсутствует</p>
						</div>
						<div class="products__textcontent">
							<h2 class="h2 products__title">{{ prod.name }}</h2>
							<p class="products__subtitle">
								<span>Цена: </span>{{ prod.price }}р.
							</p>
							<p class="products__subtitle">
								<span>Категория: </span
								>{{ searchCategory(categories, categoryId ?? 1)?.name }}
							</p>
							<p class="products__subtitle">
								<span>Оценка товара: </span>{{ prod.rating }}
							</p>
						</div>
						<div class="products__manipulation">
							<AppButton
								class="button products__button"
								@click="(e: Event) => handleBtnBasketClick(e, prod, categoryId)"
								:disabled="
									basket.find(product => prod.id === product.id) !== undefined
								"
							>
								<BasketIcon />
							</AppButton>
						</div>
					</app-substrate>
				</article>
			</li>
		</ul>
	</div>
</template>

<script lang="ts" setup>
import { useProductsStore } from '@/stores/products'
import type { TCategory, TProductInProducts } from '@/types/responseTypes'
import AppButton from '@/ui/button/AppButton.vue'
import BasketIcon from '@/ui/icons/BasketIcon.vue'
import AppSubstrate from '@/ui/substrate/AppSubstrate.vue'
import { storeToRefs } from 'pinia'
const props = defineProps<{
	content: TProductInProducts[]
	categoryId: number | undefined
	categories: TCategory[]
}>()

const productsStore = useProductsStore()

const { basket } = storeToRefs(productsStore)

const handleBtnBasketClick = (
	e: Event,
	product: TProductInProducts,
	catId: number | undefined
) => {
	e.stopPropagation()
	if (catId) {
		productsStore.setBasketPlus(product, catId)
	}
}

const handleCardClick = () => {
	console.dir('карточка')
}

const searchCategory = (
	categories: TCategory[],
	id: number
): TCategory | undefined => {
	const catTarget = categories.find(cat => cat.id === id)
	if (catTarget) {
		return catTarget
	}
	return undefined
}
</script>

<style lang="scss" scoped>
@use './ProductsList.scss';
</style>
