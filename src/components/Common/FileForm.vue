<script setup>
	import axios from 'axios'
	import { onMounted, onUnmounted, reactive, ref, watch } from 'vue'
	import Spinner from '../Icons/Spinner.vue'
	import Upload from '../Icons/Upload.vue'
	import Bin from '../Icons/Bin.vue'
	import { FILE_UPLOAD_URL, TOKEN_KEY } from '@/api/api'

	const props = defineProps({
		name: String,
		types: Array,
		format: String,
		maxSize: Number,
		maxWidth: Number,
		maxHeight: Number,
		emptyError: Boolean,
		isMultiple: Boolean,
		initValue: Array,
	})
	const emit = defineEmits(['setFileFieldValue', 'fileFieldIsError'])
	const fileInputRef = ref(null)
	const filesItems = ref([])
	const filesField = reactive({
		value: [],
		encodeValue: [],
		error: false,
		errorTxt: 'Выберите файл',
		progressValue: [],
	})
	let controller = ref([])
	const loading = ref(false)
	const resetForm = () => {
		filesField.value = []
	}
	const abort = () => {
		if (controller.value.length > 0) {
			controller.value.forEach(item => item.abort())
		}
	}
	defineExpose({
		resetForm,
		abort,
	})
	const resetFileValues = () => {
		filesField.encodeValue = []
		filesField.progressValue = []
		filesItems.value = []
	}
	const dataURLtoFile = (dataurl, filename) => {
		var arr = dataurl.split(','),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n)
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n)
		}

		return new File([u8arr], filename, { type: mime })
	}
	const validateFile = files => {
		filesField.value = []
		abort()
		resetFileValues()
		for (let i = 0; i < files.length; i++) {
			let file = files[i]
			if (props.maxSize && file.size > props.maxSize) {
				filesField.value = []
				filesField.error = true
				filesField.errorTxt = `Файл должен быть менее ${
					props.maxSize / 1024 / 1024
				} МБ`
				return
			} else if (props.types && !props.types.includes(file.type)) {
				filesField.value = []
				filesField.error = true
				filesField.errorTxt = 'Загрузите файл в одном из указанных форматов'
				return
			} else {
				filesField.error = false
				filesField.errorTxt = 'Выберите файл'
				if (props.maxWidth || props.maxHeight) {
					const reader = new FileReader()
					reader.onload = function (e) {
						const img = new Image()
						img.src = e.target.result
						img.onload = function () {
							let width = img.width
							let height = img.height
							if (
								(props.maxWidth && width > props.maxWidth) ||
								(props.maxHeight && height > props.maxHeight)
							) {
								const aspectRatio = width / height
								if (width > props.maxWidth) {
									width = props.maxWidth
									height = width / aspectRatio
								}

								if (height > props.maxHeight) {
									height = props.maxHeight
									width = height * aspectRatio
								}
								const imageCanvas = document.createElement('canvas')
								imageCanvas.classList.add('image-canvas')
								document.body.appendChild(imageCanvas)
								imageCanvas.width = width
								imageCanvas.height = height
								imageCanvas.style.display="none"
								let ctx = document
									.querySelector('.image-canvas')
									.getContext('2d')
								ctx.drawImage(img, 0, 0, width, height)
								const dataUrl = imageCanvas.toDataURL(file.type)
								const resizedFile = dataURLtoFile(
									dataUrl,
									file.name
								)
								filesField.value.push(resizedFile)
								document.body.removeChild(imageCanvas)
							} else {
								filesField.value.push(file)
							}
						}
					}
					reader.readAsDataURL(file)
				} else {
					filesField.value.push(file)
				}
			}
		}
	}
	const fileOnChange = e => {
		validateFile(e.target.files)
	}
	const delFile = idx => {
		if (
			controller.value[idx] &&
			filesField.value[idx].name !==
				(filesField.encodeValue[idx] && filesField.encodeValue[idx].name)
		) {
			controller.value[idx].abort()
		} else {
			filesField.encodeValue.splice(idx, 1)
		}
		const dt = new DataTransfer()
		const files = filesField.value
		for (let i = 0; i < files.length; i++) {
			let file = files[i]
			if (i !== idx) {
				dt.items.add(file)
			}
		}
		fileInputRef.value.files = dt.files
		filesField.value = dt.files
		filesItems.value.splice(idx, 1)
		filesField.progressValue.splice(idx, 1)
	}
	const dropFile = e => {
		const dt = new DataTransfer()
		if (props.isMultiple) {
			for (let i = 0; i < e.dataTransfer.files.length; i++) {
				dt.items.add(e.dataTransfer.files[i])
			}
		} else {
			dt.items.add(e.dataTransfer.files[0])
		}
		let files = Array.from(dt.files)
		fileInputRef.value.files = dt.files
		validateFile(files)
	}
	const setInitVal = () => {
		if (props.initValue && props.initValue.length > 0) {
			filesItems.value = [...props.initValue]
		}
	}
	onMounted(setInitVal)
	onUnmounted(abort)
	watch(
		() => filesField.value,
		() => {
			if (fileInputRef.value && filesField.value.length === 0) {
				abort()
				resetFileValues()
				fileInputRef.value.value = ''
				emit('setFileFieldValue', props.name && props.name, [
					...filesField.encodeValue,
				])
				emit('fileFieldIsError', props.name && props.name, false)
			}
			if (filesField.value.length > 0 && filesItems.value.length === 0) {
				filesField.value.forEach(async (item, idx) => {
					filesItems.value.push(item)
					filesField.progressValue.push(0)
					let formData = new FormData()
					formData.append('file', item)
					controller.value[idx] = new AbortController()
					const signal = controller.value[idx].signal
					emit('fileFieldIsError', props.name && props.name, false)
					loading.value = true
					try {
						const { data } = await axios.post(
							FILE_UPLOAD_URL,
							formData,
							{
								signal,
								onUploadProgress: function ({ progress }) {
									filesField.progressValue[
										filesItems.value.findIndex(
											arr => arr.name === item.name
										)
									] = Math.floor(progress * 50)
								},
								onDownloadProgress: function ({ progress }) {
									filesField.progressValue[
										filesItems.value.findIndex(
											arr => arr.name === item.name
										)
									] = 50 + Math.floor(progress * 50)
								},
								headers: {
									'Content-Type': 'multipart/form-data',
									Authorization: localStorage.getItem(TOKEN_KEY),
								},
							}
						)
						const file = {
							name: item.name,
							url: data.url,
						}
						filesField.encodeValue.push(file)
						emit('setFileFieldValue', props.name && props.name, [
							...filesField.encodeValue,
						])
						filesField.progressValue[
							filesItems.value.findIndex(
								arr => arr.name === item.name
							)
						] = 100
					} catch (err) {
						console.log(err)
						if (!signal.aborted) {
							delFile(idx)
						}
					} finally {
						controller.value.splice(idx, 1)
						if (
							filesField.value.length ===
							filesField.encodeValue.length
						) {
							loading.value = false
						}
					}
				})
			}
		},{deep: true}
	)
	watch(
		() => props.emptyError,
		() => {
			if (props.emptyError) {
				filesField.errorTxt = 'Выберите файл'
			}
		}
	)
	watch(
		() => props.initValue,
		() => setInitVal()
	)
</script>
<template>
	<div class="item-form file-form">
		<label @dragenter.prevent @dragover.prevent @drop.prevent="e => dropFile(e)" :class="(emptyError || filesField.error) && 'error'">
			<input type="file" ref="fileInputRef" :multiple="isMultiple" value="" :accept="format" @change="e => fileOnChange(e)">
			<Spinner v-if="loading" />
			<Upload v-else />
			<span v-if="loading">Добавление файла...</span>
			<span v-else>Перетащите или <span>выберите файл</span></span>
		</label>
		<div class="file-form__items" v-if="filesItems.length">
			<div class="h6" v-if="filesItems.length > 1">Загруженные файлы:</div>
			<div :class="['file-form__item', filesField.progressValue[idx] >= 100 ? 'loaded' : '']" v-for="(item,idx) in filesItems" :key="idx">
				<div class="file-form__name">{{item.name}}</div>
				<div class="file-form__size" v-if="item.size">{{Math.ceil(item.size / 1024 / 1024 * 100)/100}} Mb</div>
				<div class="file-form__del" @click="() => delFile(idx)">
					<Bin />
				</div>
				<div class="file-form__progress" v-if="filesField.progressValue[idx]">
					<div class="progress-bar"><span :style="{width: filesField.progressValue[idx] +'%'}"></span></div>
				</div>
			</div>
		</div>
		<div data-error="" v-if="filesField.error || emptyError"> {{ filesField.errorTxt }}</div>
	</div>
</template>