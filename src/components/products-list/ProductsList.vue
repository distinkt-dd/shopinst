<template>
	<div class="products">
		<ul class="products__list">
			<li
				v-for="product in content"
				:key="product.id"
				class="products__list-item"
			>
				<article class="products__card" @click="handleCardClick(product)">
					<app-substrate class="products__substrate">
						<div class="products__imgbox">
							<img v-if="product.img" :src="product.img" :alt="product.name" />
							<p v-else class="products__imgerror">Изображение отсутствует</p>
						</div>

						<div class="products__textcontent">
							<h2 class="h2 products__title">{{ product.name }}</h2>

							<p class="products__subtitle">
								<span>Цена: </span>{{ product.price }}р.
							</p>

							<p class="products__subtitle">
								<span>Категория: </span>
								{{ getCategoryName(product) }}
							</p>

							<p class="products__subtitle">
								<span>Оценка товара: </span>{{ product.rating }}
							</p>
						</div>

						<div class="products__manipulation">
							<AppButton
								class="button products__button"
								@click.stop="handleAddToBasket(product)"
								:disabled="isProductInBasket(product.id) || !categoryId"
								:title="
									!categoryId ? 'Выберите категорию' : 'Добавить в корзину'
								"
							>
								<BasketIcon />
							</AppButton>
						</div>
					</app-substrate>
				</article>
			</li>
		</ul>
		<ProductDialog
			ref="productDialogRef"
			:categoryId="categoryId"
			@add-to-basket="handleDialogAddToBasket"
		/>
	</div>
</template>

<script lang="ts" setup>
import type {
	TCategory,
	TProductInProducts,
	TProductInBasket,
	TProductResult,
} from '@/types/responseTypes'
import { useProductsStore } from '@/stores/products'
import AppButton from '@/ui/button/AppButton.vue'
import BasketIcon from '@/ui/icons/BasketIcon.vue'
import AppSubstrate from '@/ui/substrate/AppSubstrate.vue'
import { storeToRefs } from 'pinia'
import ProductDialog from '@/components/dialog/ProductDialog.vue'
import { ref } from 'vue'

interface ProductsListProps {
	content: TProductInProducts[] | TProductInBasket[]
	categoryId?: number
	categories: TCategory[]
}

const props = defineProps<ProductsListProps>()

const productsStore = useProductsStore()
const { basket, currentProduct } = storeToRefs(productsStore)
const productDialogRef = ref<InstanceType<typeof ProductDialog> | null>(null)

const isProductInBasket = (productId: number): boolean => {
	return basket.value.items.some(item => item.id === productId)
}

const getCategoryName = (
	product: TProductInProducts | TProductInBasket
): string => {
	if ('categoryId' in product && product.categoryId) {
		const category = props.categories.find(cat => cat.id === product.categoryId)
		return category?.name || 'Неизвестно'
	}

	if (props.categoryId) {
		const category = props.categories.find(cat => cat.id === props.categoryId)
		return category?.name || 'Неизвестно'
	}

	return 'Неизвестно'
}


const handleCardClick = async (product: TProductInProducts) => {
	if (productDialogRef.value) {
		await productDialogRef.value.open(product.id)
	}
}

const handleDialogAddToBasket = (product: TProductResult) => {
	console.log('Товар добавлен в корзину из диалога:', product)
	
}

const handleAddToBasket = (product: TProductInProducts) => {
	if (props.categoryId) {
		productsStore.addToBasket(product, props.categoryId)
	}
}
</script>

<style lang="scss" scoped>
@use './ProductsList.scss';
</style>
