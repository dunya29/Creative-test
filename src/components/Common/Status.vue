<script setup>
	import { computed } from 'vue'
	import Dropdown from './Dropdown.vue'
	const props = defineProps({
		items: Array,
		selected: String,
		projectDelete: Boolean,
		isMobModal: Boolean,
		title: String,
		isHeaderHidden: Boolean
	})
	const emit = defineEmits(['onChange', 'showDelProjectMod'])
	const findSelected = computed(() =>
		props.selected
			? props.items.find(item => item.value === props.selected)
			: null
	)
</script>
<template>
	<Dropdown :closeOnSelect="true" :selected="selected" :isMobModal="isMobModal" :title="title" :isHeaderHidden="isHeaderHidden">
		<template #header>
			<span :class="selected && 'status'">
				<template v-if="selected">
					<span class="status__bg" :style="`background-color: ${findSelected.color}`"></span>
					<span>{{ findSelected.name }}</span>
				</template>
				<span v-else>Фильтр</span>
			</span>
		</template>
		<template #default="{closeDropdown}">
			<label class="text-radio" v-for="item in items" :key="item.value">
				<input type="radio" :value="item.value" @change="closeDropdown();emit('onChange',item.value)" :checked="item.value === selected">
				<span class="status"><span v-if="item.value" class="status__bg" :style="`background-color: ${item.color}`"></span>{{ item.name }}</span>
			</label>
			<button class="text-btn" v-if="projectDelete" @click="() => emit('showDelProjectMod')">Удалить проект</button>
		</template>
	</Dropdown>
</template>