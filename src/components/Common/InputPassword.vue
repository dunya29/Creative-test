<script setup>
	const props = defineProps({
		error: String,
		modelValue: String,
		formErrCount: Number,
		formPassErr: String,
		placeholder: String,
		name: String,
	})
	const emit = defineEmits(['update:modelValue'])
	import { ref } from 'vue'
	import EyeSlash from '../Icons/EyeSlash.vue'
	import Eye from '../Icons/Eye.vue'
	const passwordTextType = ref(false)

	const togglePassVisibility = () => {
		passwordTextType.value = !passwordTextType.value
	}
</script>
<template>
	<div class="item-form item-form--password" :class="(error || formErrCount) && 'error'">
		<input :type="passwordTextType ? 'text' : 'password'" autocomplete="off" :placeholder="placeholder || 'Пароль'" :name="name || 'password'" :value="modelValue" @input="e => emit('update:modelValue', e.target.value)" />
		<div data-error="" v-if="formErrCount">{{ formPassErr }}</div>
		<div data-error="" v-else>{{ error }}</div>
		<button type="button" class="btn-reset item-form__eye" @click="()=>togglePassVisibility()" v-if="modelValue">
			<EyeSlash v-if="passwordTextType" />
			<Eye v-else />
		</button>
	</div>
</template>