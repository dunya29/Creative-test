<script setup>
	import { inject, reactive, ref } from 'vue'
	import Modal from '../Common/Modal.vue'
	import TextareaEdit from '../Common/TextareaEdit.vue'
	const props = defineProps({
		id: Number,
		title: String,
		comment: String,
	})
	const emit = defineEmits(['closeModal', 'addComment'])
	const addComment = inject('addComment')
	const loading = ref(false)
	const field = reactive({
		value: props.comment,
		required: false,
		error: false,
		errorTxt: 'Заполните поле',
	})
	const onSubmit = async () => {
		if (field.required) {
			field.error = field.value ? false : true
		}		
		if (!field.error) {
			let data = {
				comment: field.value,
			}
			loading.value = true
			addComment(
				props.id,
				data,
				() => {
					emit('closeModal')
				},
				() => {
					loading.value = false
				}
			)
		}
	}
	const edit = ref(false)
</script>
<template>
	<Modal @closeModal="emit('closeModal')">
		<template #header>
			<h2>{{ title }}</h2>
		</template>
		<form class="form comment-form" @submit.prevent="()=> !comment || edit ? onSubmit() : emit('closeModal')">
			<div class="form__fieldset">
				<p v-if="comment && !edit">{{ comment }}</p>
				<div class="item-form" v-else>					
					<TextareaEdit v-model="field.value" placeholder="Напишите сюда комментарий" />
					<div data-error="" v-if="field.error">{{ field.errorTxt }}</div>
				</div>
			</div>
			<div class="modal__btns">
				<button type="submit" class="btn main-btn" :disabled="loading" :class="loading && 'loading'"><span>{{!comment || edit ? 'Сохранить' : 'Ок'}}</span></button>
				<button type="button" class="btn stroke-btn" @click="!edit ? edit = true : edit ? edit = false : emit('closeModal')"><span>{{!comment || edit ? 'Отменить' : 'Редактировать'}}</span></button>
			</div>
		</form>
	</Modal>
</template>
