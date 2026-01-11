<script setup lang="ts">
import { computed, onMounted, type Component } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@components/header/Header.vue'
import Footer from '@components/footer/Footer.vue'

</script>

<template>
	<Header />
	<main class="main container-app">
		<router-view></router-view>
	</main>
	<Footer />
</template>
