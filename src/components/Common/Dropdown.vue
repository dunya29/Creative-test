<script setup>
	import { computed, onMounted, onUnmounted, ref, useSlots, watch } from 'vue'
	import ArrBottom from '../Icons/ArrBottom.vue'
	import Modal from './Modal.vue'

	const props = defineProps({
		selected: null,
		initValue: String,
		isDropdownVisible: Boolean,
		closeOnSelect: Boolean,
		isMobModal: Boolean,
		title: String,
		isHeaderHidden: Boolean,
	})
	const slots = useSlots()
	const isDropdownVisible = ref(props.isDropdownVisible || false)
	const dropDownRef = ref(null)
	const selected = computed(() =>
		props.selected ? props.selected : props.initValue
	)
	const windowW = ref(window.innerWidth)
	const toggleDropdownVisibility = () => {
		windowW.value = window.innerWidth
		if (!isDropdownVisible.value) {
			isDropdownVisible.value = true
			window.addEventListener('click', function clickOutside(e) {
				if (dropDownRef.value && !dropDownRef.value.contains(e.target)) {
					isDropdownVisible.value = false
					window.removeEventListener('click', clickOutside)
				}
			})
		} else {
			isDropdownVisible.value = false
		}
	}
	const closeDropdown = () => {
		isDropdownVisible.value = false
	}
	const onResize = () => {
		isDropdownVisible.value = false
	}
	onMounted(() => {
		window.addEventListener('resize', onResize)
	})
	onUnmounted(() => {
		window.removeEventListener('resize', onResize)
	})
	watch(
		() => props.isHeaderHidden,
		() => (isDropdownVisible.value = false)
	)
</script>
<template>
	<div class="dropdown" :class="isDropdownVisible && 'open'" ref="dropDownRef">
		<div :class="['dropdown__header',selected && 'selected']" @click="() => toggleDropdownVisibility()" :aria-label="isDropdownVisible ? 'Закрыть' : 'Открыть'">
			<slot name="header" v-if="slots.header"></slot>
			<span class="selected" v-else>{{ selected }}</span>
			<ArrBottom />
		</div>
		<transition name="dropdown-fade">
			<div class="dropdown__body" v-if="isDropdownVisible && (!isMobModal || windowW > 767.98)">
				<div class="custom-scroll dropdown__options">
					<slot :closeDropdown="closeOnSelect && closeDropdown" />
				</div>
			</div>
		</transition>
	</div>
	<Teleport to="body">
		<transition name="fadeUp">
			<Modal class="dropdown-mod" @closeModal="() => isDropdownVisible = false" v-if="isDropdownVisible && (isMobModal && windowW < 767.98)">
				<template #header>
					<h2>{{ title }}</h2>
				</template>
				<slot :closeDropdown="closeOnSelect && closeDropdown" />
			</Modal>
		</transition>
	</Teleport>
</template>