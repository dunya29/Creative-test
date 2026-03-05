<script setup>
	import Dropdown from './Dropdown.vue'
	const props = defineProps({
		name: String,
		items: Array,
		selected: String | Boolean,
		isMobModal: Boolean,
		title: String
	})
	const emit = defineEmits(['onChange'])
</script>
<template>
	<Dropdown :closeOnSelect="true" :selected="selected" :isMobModal="isMobModal" :title="title">
		<template #header>
			<slot></slot>
		</template>
		<template #default="{closeDropdown}">
			<label class="text-radio" v-for="(item,idx) in items" :key="idx">
				<input type="radio" :value="item.value" :name="name && name" :checked="item.value === selected" @change="closeDropdown();emit('onChange',name && name, item.value)">
				<span>{{ item.name }}</span>
			</label>
		</template>
	</Dropdown>
</template>