<script setup>
	import { onMounted } from 'vue'
	import { useRoute } from 'vue-router'
	import { useCommonStore } from '@/store/common'
	const route = useRoute()
	const storeCommon = useCommonStore()
	onMounted(() => {
		;[
			'home',
			'registry',
			'login',
			'forbidden',
			'forgot-password',
			'recovery',
			'recovery-success',
			'verify',
			'verify-success',
			'access-denied',
			'project',
		].includes(route.name)
			? storeCommon.unshowHeader()
			: storeCommon.showHeader()
		if (!storeCommon.isMounted) {
			storeCommon.pageOnMounted()
		}
	})
</script>

<template>
	<main class="main">
		<slot></slot>
	</main>
</template>
