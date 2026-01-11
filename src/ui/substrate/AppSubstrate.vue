<template>
	<div class="substrate">
		<slot />
	</div>
</template>

<style scoped lang="scss">
.substrate {
	background-color: var(--background-elements);
	border: var(--border-width-md) solid var(--color-border-main);
}
</style>
