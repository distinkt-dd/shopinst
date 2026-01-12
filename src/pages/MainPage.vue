<template>
	<section class="section showcase">
		<div class="showcase__container section__container container">
			<ContentTitle />
			<div class="showcase__buttons">
				<AppButton
					class="button showcase__button button-accent"
					v-for="cat in categories"
					:key="cat.id"
					:id="cat.id"
					@Click="handleClick(cat.id)"
					:class="activeCat.includes(cat.id) ? 'active' : ''"
					:disabled="isLoad"
				>
					{{ cat.name }}
				</AppButton>
			</div>
			<ProductsList
				:content="products"
				:categoryId="activeCat[0]"
				:categories="categories"
			/>
			<div class="showcase__pagination pagination">
				<AppSubstrate
					class="showcase__pagination-substrate pagination__substrate"
				>
					<AppButton
						class="button pagination-prev"
						@click="handlePaginationPrev"
						:disabled="page === 1"
					>
						<LeftArrowIcon />
					</AppButton>
				</AppSubstrate>
				<AppSubstrate
					class="showcase__pagination-substrate pagination__substrate"
				>
					<AppButton
						class="button pagination-next"
						@click="handlePaginationNext"
						:disabled="page === pages"
					>
						<RightArrowIcon />
					</AppButton>
				</AppSubstrate>
				<p class="pagination__info">Страница {{ page }} из {{ pages }}</p>
			</div>
			<p v-if="isLoad">Загрузка</p>
		</div>
	</section>
</template>

<script lang="ts" setup>
import ProductsList from '@/components/products-list/ProductsList.vue'
import { useProductsStore } from '@/stores/products'
import ContentTitle from '@ui/contentTitle/ContentTitle.vue'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

import AppButton from '@/ui/button/AppButton.vue'
import LeftArrowIcon from '@/ui/icons/LeftArrowIcon.vue'
import RightArrowIcon from '@/ui/icons/RightArrowIcon.vue'
import AppSubstrate from '@/ui/substrate/AppSubstrate.vue'

const productsStore = useProductsStore()

const activeCat = ref([1])
const { isLoad, products, pages, page, categories } =
	storeToRefs(productsStore)

const handlePaginationPrev = async () => {
	productsStore.setPage(false)
	if (activeCat.value.length > 0 && activeCat.value[0] !== undefined) {
		await productsStore.setProductsInfo(page.value, activeCat.value[0])
	} else {
		productsStore.pageClear()
		await productsStore.setProductsInfo(page.value, 1)
	}
}

const handlePaginationNext = async () => {
	productsStore.setPage(true)
	if (activeCat.value.length > 0 && activeCat.value[0] !== undefined) {
		await productsStore.setProductsInfo(page.value, activeCat.value[0])
	} else {
		productsStore.pageClear()
		await productsStore.setProductsInfo(page.value, 1)
	}
}

const handleClick = async (id: number) => {
	activeCat.value = [id]

	productsStore.setIsLoadTrue()
	if (activeCat.value.length > 0 && activeCat.value[0] !== undefined) {
		productsStore.pageClear()
		await productsStore.setProductsInfo(page.value, activeCat.value[0])
	} else {
		await productsStore.setProductsInfo(1, 1)
		activeCat.value = [1]
	}
	productsStore.setIsLoadFalse()
}

async function getAllCategories() {
	productsStore.setIsLoadTrue()
	await productsStore.setCategories()
	productsStore.setIsLoadFalse()
}

async function getFirstProductsPage() {
	productsStore.setIsLoadTrue()
	if (activeCat.value.length > 0 && activeCat.value[0] !== undefined) {
		await productsStore.setProductsInfo(page.value, activeCat.value[0])
	} else {
		await productsStore.setProductsInfo(1, 1)
		activeCat.value = [1]
	}
	productsStore.setIsLoadFalse()
}

onMounted(async () => {
	await getAllCategories()
	await getFirstProductsPage()
})
</script>

<style lang="scss" scoped>
@use '../components/showcase/Showcase.scss';
@use '../components/pagination/Pagination.scss';
</style>
