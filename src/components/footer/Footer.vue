<template>
	<footer class="footer">
		<div class="container footer__container">
			<div class="footer__content">
				<p class="footer__subtitle">Developer info:</p>
				<a href="https://github.com/distinkt-dd" target="_blank">
					<git-hub-icon />
				</a>
				<a href="https://vk.com/id266275865" target="_blank">
					<vk-icon />
				</a>
			</div>
		</div>
	</footer>
</template>

<script lang="ts" setup>
import GitHubIcon from '@/ui/icons/GitHubIcon.vue'
import VkIcon from '@/ui/icons/VkIcon.vue'
</script>

<style scoped lang="scss">
@use './Footer.scss';
</style>
