<script setup>
	import Modal from '../Common/Modal.vue'
	const props = defineProps({
		loading: Boolean,
	})
	const emit = defineEmits(['closeModal', 'closeProject'])
</script>

<template>
	<Modal @closeModal="emit('closeModal')">
		<template #header>
			<h2>Закрыть проект</h2>
		</template>
		<p>Несохраненные изменения будут потеряны. Вы уверены, что хотите продолжить?</p>
		<div class="modal__btns">
			<button class="btn main-btn" :disabled="loading" :class="loading && 'loading'" @click="emit('closeProject')"><span>Да, закрыть</span></button>
			<button class="btn stroke-btn" @click="emit('closeModal')"><span>Отменить</span></button>
		</div>
	</Modal>
</template>