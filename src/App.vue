<script setup lang="ts">
import { onMounted } from 'vue'
import Header from '@components/header/Header.vue'
import Footer from '@components/footer/Footer.vue'
import { useProductsStore } from './stores/products'

const productsStore = useProductsStore()

onMounted(() => {
	productsStore.initBasketFromLocalStorage()
})
</script>

<template>
	<div class="app">
		<Header />
		<main class="main container-app">
			<router-view />
		</main>
		<Footer />
	</div>
</template>
