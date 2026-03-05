<script setup>
	import { reactive, ref, useTemplateRef } from 'vue'
	import Modal from '../Common/Modal.vue'
	import FileForm from '../Common/FileForm.vue'
	const props = defineProps({
		maxOrderId: Number,
	})

	const emit = defineEmits(['closeModal', 'addDoc'])
	const fileField = useTemplateRef('fileField')
	const loading = ref(false)
	let docFormFields = reactive([
		{
			field: 'name',
			value: '',
			required: true,
			error: false,
			errorTxt: 'Заполните поле',
		},
		{
			field: 'file',
			value: [],
			required: true,
			error: false,
		},
	])
	let file = {
		types: [
			'application/msword', // .doc
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
			'application/pdf', // .pdf
		],
		format: '.doc, .docx, .pdf',
	}
	const setFileValue = (name, val) => {
		docFormFields[name].value = val
	}
	const fileIsError = (name, val) => {
		docFormFields[name].error = val
	}
	const resetForm = () => {
		docFormFields.forEach(item => (item.value = ''))
	}
	const docFormOnSubmit = async () => {
		docFormFields.forEach(item => {
			if (item.required) {
				item.error = item.value > 0 || item.value.length > 0 ? false : true
			}
		})
		if (!docFormFields.some(item => item.error)) {
			let newDoc = {
				name: docFormFields[0].value,
				docURL: [
					{
					    "name": docFormFields[1].value[0].name,
					    "url": docFormFields[1].value[0].url
				    }
			    ],
				orderId: props.maxOrderId + 1,
			}
			loading.value = true
			emit(
				'addDoc',
				newDoc,
				() => {
					resetForm()
					fileField.value.resetForm()
				},
				() => {
					loading.value = false
				}
			)
		}
	}
	const closeModal = () => {
		fileField.value.resetForm()
		loading.value = false
		emit('closeModal')
	}
</script>
<template>
	<Modal @closeModal="closeModal">
		<template #header>
			<h2>Загрузка документа</h2>
		</template>
		<form class="form doc-form" @submit.prevent="docFormOnSubmit" @reset.prevent="closeModal">
			<div class="form__fieldset">
				<div class="h5">Название документа</div>
				<div class="item-form">
					<input type="text" placeholder="Напишите название" v-model="docFormFields[0].value" />
					<div data-error="" v-if="docFormFields[0].error">{{ docFormFields[0].errorTxt }}</div>
				</div>
			</div>
			<div class="form__fieldset">
				<div class="h5">Загрузите документ</div>
				<p class="h6 file-form__type">Допустимые форматы документа: {{String(file.format).split(", ").map(ext => ext.replace(/^\./, "")).join(", ")}}.</p>
				<FileForm ref="fileField" :types="file.types" :emptyError="docFormFields[1].error" name="1" :format="file.format" @setFileFieldValue="setFileValue" @fileFieldIsError="fileIsError" />
			</div>
			<div class="modal__btns">
				<button type="submit" class="btn main-btn" :disabled="loading" :class="loading && 'loading'"><span>Сохранить</span></button>
				<button type="reset" class="btn stroke-btn"><span>Отменить</span></button>
			</div>
		</form>
	</Modal>
</template>
