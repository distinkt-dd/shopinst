<template>
	<header class="header">
		<div class="container header__container">
			<router-link to="/">
				<h2 class="h1 header__title">SHOP</h2>
			</router-link>
			<nav class="header__nav">
				<ul class="list header__list">
					<li class="header__list-item">
						<router-link to="/basket">
							<app-substrate class="header__substrate">
								<app-button class="button header__button button-square-44">
									<basket-icon />
									<span class="header__button-counter"> 1 </span>
								</app-button>
							</app-substrate>
						</router-link>
					</li>
				</ul>
			</nav>
		</div>
	</header>
</template>

<script lang="ts" setup>
import AppSubstrate from '@/ui/substrate/AppSubstrate.vue'
import AppButton from '@/ui/button/AppButton.vue'
import BasketIcon from '@/ui/icons/BasketIcon.vue'
</script>

<style scoped lang="scss">
@use './Header.scss';
</style>
