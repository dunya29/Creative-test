<script setup>
	import { ref } from 'vue'
	import { DragHandle } from 'vue-slicksort'
	import DelDocMod from '../Modals/DelDocMod.vue'
	import Bin from '../Icons/Bin.vue'
	import Eye from '../Icons/Eye.vue'
	import Handle from '../Icons/Handle.vue'
	import DocIcon from '../Icons/DocIcon.vue'
	const props = defineProps({
		id: Number,
		name: String,
		docURL: Object,
		userRole: String,
	})
	const emit = defineEmits(['delDoc'])
	const delModal = ref(false)
	const loading = ref(false)
	const closeDelModal = () => {
		delModal.value = false
	}
	const delDoc = () => {
		loading.value = true
		emit('delDoc', props.id, () => {
			loading.value = false
			closeDelModal()
		})
	}
</script>
<template>
	<td>
		<DocIcon class="item-doc__icon" />
		<h5>{{ name }}</h5>
	</td>
	<td class="page-icons">
		<a class="page-icon" :href="docURL.url" target="_blank">
			<Eye />
		</a>
		<button class="page-icon" @click="() => delModal = true" v-if="userRole === 'manager'">
			<Bin />
		</button>
		<DragHandle class="page-icon item-doc__handle" v-if="userRole === 'manager'">
			<Handle />
		</DragHandle>
	</td>
	<Teleport to="body">
		<transition name="fadeUp">
			<DelDocMod v-if="delModal" :loading="loading" @delDoc="delDoc" @closeModal="closeDelModal">
				<template #header>
					<h2>Удаление документа</h2>
				</template>
				<p>Документ будет удалён безвозвратно, Вы действительно хотите удалить ?</p>
			</DelDocMod>
		</transition>
	</Teleport>
</template>