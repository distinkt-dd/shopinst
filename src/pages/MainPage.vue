<template>
	<section class="section showcase">
		<div class="showcase__container section__container container">
			<ContentTitle />
			<p v-if="isLoad">Загрузка</p>
		</div>
	</section>
</template>

<script lang="ts" setup>
import ContentTitle from '@ui/contentTitle/ContentTitle.vue'
import { useProductsStore } from '@/stores/products'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import {watch} from 'vue'

const productsStore = useProductsStore()

const { isLoad, productsInfo } = storeToRefs(productsStore)

async function getFirstProducts() {
	productsStore.setIsLoadTrue()
	console.log('Начало загрузки...')
	await productsStore.setProductsInfo(1, 1)
	productsStore.setIsLoadFalse()
	console.log('Загрузка завершена')
	
	// Данные теперь загружены
	console.log('productsInfo:', productsInfo.value)
	console.log('Развернутый productsInfo:', JSON.parse(JSON.stringify(productsInfo.value)))
}

onMounted(() => {
	getFirstProducts()
})
</script>
