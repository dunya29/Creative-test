<script setup>
	import { reactive } from 'vue'
	import Datepicker from 'vue3-datepicker'
	import { useDateModule } from '@/module/dateModule'
	import Modal from '../Common/Modal.vue'
	const props = defineProps({
		loading: Boolean,
	})
	const emit = defineEmits(['closeModal', 'setDeadline'])
	const { locale, format, placeholder, setDeadline } = useDateModule()
	const field = reactive({
		value: new Date(),
		required: true,
		error: false,
		errorTxt: 'Укажите дату',
	})
	const onSubmit = async () => {	
		if (field.required) {
			field.error = field.value ? false : true
		}
		if (!field.error) {
			emit('setDeadline', setDeadline(field.value))
		}
	}
</script>

<template>
	<Modal @closeModal="emit('closeModal')">
		<template #header>
			<h2>Выберите конечный срок доработки</h2>
		</template>
		<p>Автор сможет доработать свой проект до выбранной даты. Далее проект получит статус «На модерации»</p>
		<form class="form" @submit.prevent="onSubmit" @reset.prevent="emit('closeModal')">
			<div class="form__fieldet">
				<div :class="['item-form item-form--date',field.error && 'error']">
					<Datepicker v-model="field.value" :locale="locale" :inputFormat="format" :placeholder="placeholder" :lowerLimit="new Date()" />
					<div data-error="" v-if="field.error">{{ field.errorTxt }}</div>
				</div>
			</div>
			<div class="modal__btns">
				<button type="submit" class="btn main-btn" :disabled="loading" :class="loading && 'loading'"><span>Ок</span></button>
				<button type="reset" class="btn stroke-btn"><span>Отменить</span></button>
			</div>
		</form>
	</Modal>
</template>