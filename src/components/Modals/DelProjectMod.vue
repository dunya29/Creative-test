<script setup>
	import Modal from '../Common/Modal.vue'
	const props = defineProps({
		loading: Boolean,
	})
	const emit = defineEmits(['closeModal', 'delProject'])
</script>

<template>
	<Modal @closeModal="emit('closeModal')">
		<template #header>
			<h2>Удалить проект?</h2>
		</template>
		<p>Данное действие невозможно отменить</p>
		<div class="modal__btns">
			<button class="btn main-btn" :disabled="loading" :class="loading && 'loading'" @click="emit('delProject')"><span>Да, удалить проект безвозвратно</span></button>
			<button class="btn stroke-btn" @click="emit('closeModal')"><span>Отменить</span></button>
		</div>
	</Modal>
</template>