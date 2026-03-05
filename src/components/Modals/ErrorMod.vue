<script setup>
	import { ref } from 'vue'
	import Modal from '../Common/Modal.vue'

	const props = defineProps({
		title: String,
		errorObj: Object,
	})
	const emit = defineEmits(['closeModal'])
	const showErrorObj = ref(false)
</script>
<template>
	<Modal class="error-mod" @closeModal="emit('closeModal')">
		<template #header>
			<h2>{{ title || "Что-то пошло не так :(" }}</h2>
		</template>
		<div class="error-mod__det" v-if="errorObj && (errorObj.status || errorObj.message)">
			<button :class="['btn text-btn', showErrorObj && 'active']" @click="() => showErrorObj = !showErrorObj">
				Показать тех. информацию
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 25" fill="none">
					<path d="M8 10.5L12 14.5L16 10.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</button>
			<template v-if="showErrorObj">
				<p v-if="errorObj.status">Код статуса: {{ errorObj.status }}</p>
				<p v-if="errorObj.message">Сообщение об ошибке: {{errorObj.message}}</p>
			</template>
		</div>
		<button class="btn main-btn" @click="emit('closeModal')"><span>Закрыть</span></button>
	</Modal>
</template>