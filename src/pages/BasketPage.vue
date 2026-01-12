<template>
	<section class="section basket">
		<div class="basket__container section__container container">
			<ContentTitle />

			<div v-if="basket.items.length > 0" class="basket__content">
				<ProductsList :content="basket.items" :categories="categories" />
				<div class="basket__summary">
					<p>Товаров в корзине: {{ basket.counter }}</p>
					<p>Общая стоимость: {{ totalPrice }}р.</p>
					<AppButton
						@click="handleClearBasket"
						class="button basket__button button-gradient"
					>
						Очистить корзину
					</AppButton>
				</div>
			</div>

			<div v-else class="basket__empty">
				<p>Корзина пуста</p>

				<router-link to="/"
					><AppButton class="button basket__button button-gradient"
						>Вернуться к витрине</AppButton
					></router-link
				>
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products'
import ProductsList from '@/components/products-list/ProductsList.vue'
import ContentTitle from '@/ui/contentTitle/ContentTitle.vue'
import AppButton from '@/ui/button/AppButton.vue'

const productsStore = useProductsStore()
const { basket, categories } = storeToRefs(productsStore)

const totalPrice = computed(() => {
	return basket.value.items.reduce((sum, item) => sum + item.price, 0)
})

const handleClearBasket = () => {
	productsStore.clearBasket()
}

onMounted(() => {
	productsStore.initBasketFromLocalStorage()
})
</script>

<style scoped lang="scss">
@use './Basket.scss';
</style>
