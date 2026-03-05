<script setup>
	import { useSlots } from 'vue'
	import { onMounted, onUnmounted } from 'vue'
	const props = defineProps({
		txt: String,
		modelValue: Boolean,
		duration: Number,
	})
	const slots = useSlots()
	const emit = defineEmits(['update:modelValue'])
	let timeOut
	onMounted(() => {
		setTimeout(() => {
			emit('update:modelValue', false)
		}, props.duration || 1000)
	})
	onUnmounted(() => {
		clearTimeout(timeOut)
	})
</script>
<template>
	<div class="js-lbl">
		<div class="js-lbl__txt">
			<slot v-if="slots.default"></slot>
			<template v-else-if="txt">{{ txt }}</template>
		</div>
	</div>
</template>