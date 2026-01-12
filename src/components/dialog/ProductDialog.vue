<template>
	<transition name="fade">
		<div v-if="isOpen" class="product-dialog-overlay" @click="close">
			<div class="product-dialog" @click.stop>
				<button class="product-dialog__close" @click="close">×</button>

				<div v-if="isLoading" class="product-dialog__loading">Загрузка...</div>

				<div v-else-if="product" class="product-dialog__content">
					<div class="product-dialog__image">
						<img v-if="product.img" :src="product.img" :alt="product.name" />
						<div v-else class="product-dialog__no-image">Нет изображения</div>
					</div>

					<div class="product-dialog__info">
						<h2 class="product-dialog__title">{{ product.name }}</h2>

						<div class="product-dialog__price">
							<strong>Цена:</strong> {{ product.price }} ₽
						</div>

						<div class="product-dialog__rating">
							<strong>Рейтинг:</strong> {{ product.rating }} ⭐
							<span class="product-dialog__rating-count">
								(оценок: {{ product.rating_count }})
							</span>
						</div>

						<div class="product-dialog__description">
							<strong>Описание:</strong>
							<p>{{ product.description || 'Описание отсутствует' }}</p>
						</div>

						<div class="product-dialog__actions">
							<AppButton
								class="button button-gradient product-dialog__add-btn"
								@click="handleAddToBasket"
								:disabled="isInBasket"
							>
								<BasketIcon />
								{{ isInBasket ? 'Уже в корзине' : 'Добавить в корзину' }}
							</AppButton>
						</div>
					</div>
				</div>

				<div v-else class="product-dialog__error">
					Не удалось загрузить информацию о товаре
				</div>
			</div>
		</div>
	</transition>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { TProductResult } from '@/types/responseTypes'
import { useProductsStore } from '@/stores/products'
import AppButton from '@/ui/button/AppButton.vue'
import BasketIcon from '@/ui/icons/BasketIcon.vue'
import { storeToRefs } from 'pinia'

interface ProductDialogProps {
	productId?: number
	categoryId?: number
}

const props = withDefaults(defineProps<ProductDialogProps>(), {
	productId: undefined,
	categoryId: undefined,
})

const emit = defineEmits<{
	close: []
	addToBasket: [product: TProductResult]
}>()

const productsStore = useProductsStore()
const { basket } = storeToRefs(productsStore)

const isOpen = ref(false)
const isLoading = ref(false)
const product = ref<TProductResult | null>(null)

const isInBasket = computed(() => {
	if (!product.value) return false
	return basket.value.items.some(item => item.id === product.value!.id)
})

const open = async (id: number) => {
	isOpen.value = true
	isLoading.value = true
	product.value = null

	try {
		await productsStore.fetchProductById(id)
		const currentProduct = productsStore.getCurrentProduct

		if (
			currentProduct &&
			typeof currentProduct === 'object' &&
			'id' in currentProduct
		) {
			product.value = currentProduct as TProductResult
		}
	} catch (error) {
		console.error('Ошибка загрузки товара:', error)
	} finally {
		isLoading.value = false
	}
}

// Закрыть диалог
const close = () => {
	isOpen.value = false
	emit('close')
}

// Добавить в корзину
const handleAddToBasket = () => {
	if (product.value && props.categoryId) {
		const productToAdd = {
			id: product.value.id,
			name: product.value.name,
			price: product.value.price,
			rating: product.value.rating,
			img: product.value.img || undefined,
		}

		productsStore.addToBasket(productToAdd, props.categoryId)
		emit('addToBasket', product.value)
	}
}

defineExpose({
	open,
	close,
})
</script>

<style lang="scss" scoped>
@use './ProductDialog.scss';
</style>
