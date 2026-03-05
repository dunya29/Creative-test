<script setup>
	import { computed, ref, useSlots } from 'vue'
	import simplebar from 'simplebar-vue'
	import Close from '../Icons/Close.vue'
	const props = defineProps({
		loading: Boolean,
		clickOutside: null | Boolean
	})
	const slots = useSlots()
	const modalRef = ref(null)
	const isClickOutside = computed(() => (props.clickOutside === null || props.clickOutside === undefined) ? true : props.clickOutside);
	const emit = defineEmits(['closeModal'])
	const handleClickOutside = event => {
		if (isClickOutside.value && modalRef.value && !modalRef.value.contains(event.target)) {
			emit('closeModal')
		}
	}
</script>
<template>
	<div class="modal" @click="handleClickOutside" :class="loading && 'loading'">
		<simplebar class="modal__overlay">
			<div class="modal__content" ref="modalRef">
				<button @click="()=> emit('closeModal')" class="btn-close modal__close" aria-label="Закрыть всплывающее окно" v-if="isClickOutside">
					<Close />
				</button>
				<div class="modal__scroll">
					<div class="modal__top" v-if="slots.header">
						<slot name="header"></slot>
					</div>
					<slot></slot>
				</div>
			</div>
		</simplebar>
	</div>
</template>