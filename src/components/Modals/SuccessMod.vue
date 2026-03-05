<script setup>
	import Modal from '../Common/Modal.vue'

	const props = defineProps({
		title: String,
		successText: String
	})
	const emit = defineEmits(['closeModal'])
</script>
<template>
	<Modal class="success-mod" @closeModal="emit('closeModal')">
		<template #header>
			<h2>{{ title }}</h2>
		</template>
		<p v-if="successText">{{ successText }}</p>
		<button class="btn main-btn" @click="emit('closeModal')"><span>Ок</span></button>
	</Modal>
</template>