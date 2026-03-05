<script setup>
	import { reactive, ref, useTemplateRef } from 'vue'
	import Modal from '../Common/Modal.vue'
	import FileForm from '../Common/FileForm.vue'
	const props = defineProps({
		maxOrderId: Number,
	})

	const emit = defineEmits(['closeModal', 'addVideo'])
	const posterRef = useTemplateRef('posterField')
	const videoRef = useTemplateRef('videoField')
	const loading = ref(false)
	let docFormFields = reactive([
		{
			field: 'poster',
			value: [],
			required: true,
			error: false,
		},
		{
			field: 'video',
			value: [],
			required: true,
			error: false,
		},
	])
	let filePoster = {
		types: ['image/jpg', 'image/jpeg', 'image/png'],
		format: '.jpg, .jpeg, .png',
	}
	let fileVideo = {
		types: [
			'video/mp4', //.mp4
			'video/webm', //.webm
			'video/x-msvideo', //.avi
			'video/quicktime', //.mov
			'video/mpeg', //.mpeg, .mpg
			'video/x-flv', //.flv
			'video/x-f4v', //.f4v
			'video/x-ms-wmv', //.wmv
			'video/x-matroska', //.mkv
			'video/dvd', //.vob
			'application/vnd.rn-realmedia', //.rm, .rmvb
			'video/ogg', //.ogv
			'video/mp2t', //.ts, .m2ts, .mts
			'video/3gpp', //.3gp
			'video/x-m4v', //.m4v
		],
		format: '.avi, .mp4, .3gp, .mpeg, .mov, .flv, .f4v, .wmv, .mkv, .webm, .vob, .rm, .rmvb, .m4v, .mpg, .ogv, .ts, .m2ts, .mts',
	}
	const resetForm = () => {
		docFormFields.forEach(item => (item.value = []))
	}
	const setFilePosterValue = (name,val) => {
		docFormFields[name].value = val
	}
	const setFileVideoValue = (name,val) => {
		docFormFields[name].value = val
	}
	const filePosterIsError = (name,val) => {
		docFormFields[name].error = val
	}
	const fileVideoIsError = (name,val) => {
		docFormFields[name].error = val
	}
	const docFormOnSubmit = async () => {
		docFormFields.forEach(item => {
			if (item.required) {
				item.error = item.value.length ? false : true
			}
		})
		if (!docFormFields.some(item => item.error)) {
			let newDoc = {
				imageURL: [
					{
						"name": docFormFields[0].value[0].name,
						"url": docFormFields[0].value[0].url,
					}
				],
				videoURL: [
					{
						"name": docFormFields[1].value[0].name,
						"url": docFormFields[1].value[0].url,
					}
				],
				orderId: props.maxOrderId + 1,
			}
			loading.value = true
			emit(
				'addVideo',
				newDoc,
				() => {
					resetForm()
					posterRef.value.resetForm()
					videoRef.value.resetForm()
				},
				() => {
					loading.value = false
				}
			)
		}
	}
	const closeModal = () => {
		posterRef.value.resetForm()
		videoRef.value.resetForm()
		loading.value = false
		emit('closeModal')
	}
</script>
<template>
	<Modal @closeModal="closeModal">
		<template #header>
			<h2>Загрузка видео</h2>
		</template>
		<form class="form doc-form" @submit.prevent="docFormOnSubmit" @reset.prevent="closeModal">
			<div class="form__fieldset">
				<div class="h5">Загрузить видео</div>
				<div class="h6 file-form__type">Допустимые форматы видео: {{String(fileVideo.format).split(", ").map(ext => ext.replace(/^\./, "")).join(", ").toUpperCase()}}.</div>
				<FileForm ref="videoField" :types="fileVideo.types" name="1" :emptyError="docFormFields[1].error" :format="fileVideo.format" @setFileFieldValue="setFileVideoValue" @fileFieldIsError="fileVideoIsError" />
			</div>
			<div class="form__fieldset">
				<div class="h5">Загрузите обложку</div>
				<div class="h6 file-form__type">Допустимые форматы картинки: {{String(filePoster.format).split(", ").map(ext => ext.replace(/^\./, "")).join(", ")}}.</div>
				<FileForm ref="posterField" :types="filePoster.types" name="0" :emptyError="docFormFields[0].error" :format="filePoster.format" @setFileFieldValue="setFilePosterValue" @fileFieldIsError="filePosterIsError" />
			</div>
			<div class="modal__btns">
				<button type="submit" class="btn main-btn" :disabled="loading" :class="loading && 'loading'"><span>Сохранить</span></button>
				<button type="reset" class="btn stroke-btn"><span>Отменить</span></button>
			</div>
		</form>
	</Modal>
</template>
