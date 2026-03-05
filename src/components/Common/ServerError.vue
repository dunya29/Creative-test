<script setup>
	import { onMounted, onUnmounted } from 'vue'
	import { useCommonStore } from '@/store/common'
	const storeCommon = useCommonStore()
	let timeOut
	onMounted(() => {
		setTimeout(() => {
			storeCommon.unShowServerError()
		}, 6000)
	})
	onUnmounted(() => {
		clearTimeout(timeOut)
	})
</script>
<template>
	<div class="js-lbl error-noty">
		<div class="js-lbl__txt">
			<h4>Ошибка</h4>
			<p class="h6">К сожалению, произошла ошибка сервера, и мы не можем обработать ваш запрос в данный момент. Пожалуйста, попробуйте повторить попытку позже.</p>
		</div>
	</div>
</template>