<script setup>
	import Modal from '../Common/Modal.vue'
	const props = defineProps({
		loading: Boolean,
	})
	const emit = defineEmits(['closeModal', 'delWave'])
</script>

<template>
	<Modal @closeModal="emit('closeModal')" class="videoDel-mod">
		<template #header>
			<h2>Удаление волны</h2>
		</template>
		<p>Волна будет удалена безвозвратно, Вы действительно хотите удалить эту волну?</p>
		<div class="modal__btns">
			<button class="btn main-btn" :disabled="loading" :class="loading && 'loading'" @click="emit('delWave')"><span>Да, удалить</span></button>
			<button class="btn stroke-btn" @click="emit('closeModal')"><span>Отменить</span></button>
		</div>
	</Modal>
</template>