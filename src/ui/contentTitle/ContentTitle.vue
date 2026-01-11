<template>
  <h1 class="h1 page-content__title">{{ pageTitle }}</h1>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
const route = useRoute()

const pageTitle = route.meta?.contentTitle as string
</script>