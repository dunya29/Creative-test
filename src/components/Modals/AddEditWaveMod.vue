<script setup>
	import { computed, reactive, ref } from 'vue'
	import Datepicker from 'vue3-datepicker'
	import Modal from '../Common/Modal.vue'
	import { useDateModule } from '@/module/dateModule'
	const props = defineProps({
		waves: Array,
		name: String,
		start: String,
		end: String,
		title: String,
		disabledDates: Array,
	})
	const emit = defineEmits(['closeModal', 'editWave'])
	const loading = ref(false)
	const {
		locale,
		format,
		placeholder,
		setEndLowerLimit,
		formatDateValue,
		parseDateValue,
		disabledDates
	} = useDateModule()
	const disabeledDatesArr = computed(() => props.disabledDates ? disabledDates(props.disabledDates) : disabledDates(props.waves))
	const endLowerLimit = computed(() => setEndLowerLimit(fields[1].value))
	const fields = reactive([
		{
			field: 'name',
			value: props.name ? props.name : '',
			required: true,
			error: false,
			errorTxt: 'Заполните поле',
		},
		{
			field: 'start',
			value: props.start ? parseDateValue(props.start) : null,
			required: true,
			error: false,
			errorTxt: 'Укажите дату',
		},
		{
			field: 'end',
			value: props.end ? parseDateValue(props.end) : null,
			required: true,
			error: false,
			errorTxt: 'Укажите дату',
		},
	])
	const onStartDateChange = () => {
		if (
			fields[2].value &&
			new Date(fields[1].value) >= new Date(fields[2].value)
		) {
			fields[2].value = endLowerLimit.value
		}
	}
	const onSubmit = async () => {
		fields.forEach(item => {
			if (item.required) {
				item.error = item.value ? false : true
			}
		})
		if (!fields.some(item => item.error)) {
			let data = {
				name: fields[0].value,
				start: formatDateValue(fields[1].value),
				end: formatDateValue(fields[2].value),
			}
			loading.value = true
			emit('editWave', data, () => {
				loading.value = false
			})
		}
	}
</script>

<template>
	<Modal @closeModal="emit('closeModal')" class="wave-mod">
		<template #header>
			<h2>{{ title }}</h2>
		</template>
		<form class="form" @submit.prevent="onSubmit" @reset.prevent="emit('closeModal')">
			<div class="form__fieldset">
				<div class="h6">Название волны</div>
				<div :class="['item-form',fields[0].error && 'error']">
					<input type="text" placeholder="Напишите название волны" name="name" v-model="fields[0].value" />
					<div data-error="" v-if="fields[0].error">{{ fields[0].errorTxt }}</div>
				</div>
			</div>
			<div class="form__fieldset">
				<div class="h6">Начало</div>
				<div :class="['item-form item-form--date',fields[1].error && 'error']">
					<Datepicker v-model="fields[1].value" :locale="locale" :inputFormat="format" :placeholder="placeholder" :lowerLimit="new Date()" :disabledDates="{ dates: disabeledDatesArr}" @closed="onStartDateChange" />
					<div data-error="" v-if="fields[1].error">{{ fields[1].errorTxt }}</div>
				</div>
			</div>
			<div class="form__fieldset">
				<div class="h6">Конец</div>
				<div :class="['item-form item-form--date',fields[2].error && 'error']">
					<Datepicker v-model="fields[2].value" :locale="locale" :inputFormat="format" :placeholder="placeholder" :lowerLimit="endLowerLimit" :disabledDates="{ dates: disabeledDatesArr }" />
					<div data-error="" v-if="fields[2].error">{{ fields[2].errorTxt }}</div>
				</div>
			</div>
			<div class="modal__btns">
				<button type="submit" class="btn main-btn" :disabled="loading" :class="loading && 'loading'"><span>Сохранить</span></button>
				<button type="reset" class="btn stroke-btn"><span>Отменить</span></button>
			</div>
		</form>
	</Modal>
</template>