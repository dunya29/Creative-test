<script setup>
	import { debounce } from '@/functions/debounce'
	import Loupe from '../Icons/Loupe.vue'

	const props = defineProps({
		modelValue: String,
		icon: Boolean,
		reset: Boolean,
		placeholder: String,
		type: String,
	})
	const emit = defineEmits(['update:modelValue'])
	const onInput = event => {
		emit('update:modelValue', event.target.value)
	}
	const debouncedSearch = debounce(onInput, 1000)
	const onReset = () => {
		emit('update:modelValue', '')
	}
</script>
<template>
	<div class="search-form" :class="[icon && 'has-icon', reset && 'has-reset']">
		<div class="search-form__inner">
			<Loupe class="search-form__icon" v-if="icon" />
			<div class="item-form">
				<input :type="type || 'text'" :placeholder="placeholder || 'Фильтр'" :value="modelValue" @input="debouncedSearch" />
			</div>
			<button v-if="reset && modelValue.length > 3" @click="onReset" type="button" class="text-btn search-form__reset" aria-label="Очистить поиск">Очистить фильтр</button>
		</div>
	</div>
</template>