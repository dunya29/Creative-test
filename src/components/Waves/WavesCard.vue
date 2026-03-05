<script setup>
	import { computed, ref } from 'vue'
	import DelWaveMod from '../Modals/DelWaveMod.vue'
	import AddEditWaveMod from '../Modals/AddEditWaveMod.vue'
	import Edit from '../Icons/Edit.vue'
	import Bin from '../Icons/Bin.vue'

	const props = defineProps({
		id: Number,
		name: String,
		start: String,
		end: String,
		disabledDates: Array,
	})

	const emit = defineEmits(['delWave', 'editWave'])
	const delModal = ref(false)
	const delLoading = ref(false)
	const editModal = ref(false)
	const closeDelModal = () => {
		delModal.value = false
	}
	const delWave = () => {
		delLoading.value = true
		emit('delWave', props.id, () => {
			delLoading.value = false
			closeDelModal()
		})
	}
	const closeEditModal = () => {
		editModal.value = false
	}
	const editWave = (data, callback) => {
		emit('editWave', props.id, data, () => {
			callback()
			closeEditModal()
		})
	}
</script>
<template>
	<tr>
		<td>
			<h5>{{ name }}</h5>
		</td>
		<td>{{ start }}</td>
		<td>
			{{end}}
		</td>
		<td class="page-icons">
			<div class="page-icon" @click="() => editModal = true">
				<Edit />
			</div>
			<div class="page-icon" @click="() => delModal = true">
				<Bin />
			</div>
		</td>
		<Teleport to="body">
			<transition name="fadeUp">
				<DelWaveMod v-if="delModal" :loading="delLoading" @delWave="delWave" @closeModal="closeDelModal" />
			</transition>
		</Teleport>
		<Teleport to="body">
			<transition name="fadeUp">
				<AddEditWaveMod v-if="editModal" :name="name" :start="start" :end="end" title="Редактирование волны" @editWave="editWave" @closeModal="closeEditModal" :disabledDates="disabledDates" />
			</transition>
		</Teleport>
	</tr>
</template>