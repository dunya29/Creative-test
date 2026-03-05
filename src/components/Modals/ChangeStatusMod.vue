<script setup>
	import Modal from '../Common/Modal.vue'
	const props = defineProps({
		loading: Boolean,
	})
	const emit = defineEmits(['closeModal', 'setStatus'])
</script>

<template>
	<Modal @closeModal="emit('closeModal')">
		<template #header>
			<slot name="header"></slot>
		</template>
		<slot></slot>
		<div class="modal__btns">
			<button class="btn main-btn" :disabled="loading" :class="loading && 'loading'" @click="emit('setStatus')"><span>Ок</span></button>
			<button class="btn stroke-btn" @click="emit('closeModal')"><span>Отменить</span></button>
		</div>
	</Modal>
</template>