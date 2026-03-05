<script setup>
	import { ref } from 'vue'
	import { DragHandle } from 'vue-slicksort'
	import DocVideoMod from '../Modals/DocVideoMod.vue'
	import DelDocMod from '../Modals/DelDocMod.vue'
	import Play from '../Icons/Play.vue'
	import Bin from '../Icons/Bin.vue'
	import Handle from '../Icons/Handle.vue'
	import { getImageURL } from '@/functions/getURL'

	const props = defineProps({
		id: Number,
		imageURL: Object,
		videoURL: Object,
		userRole: String,
	})
	const emit = defineEmits(['delVideo'])
	const delLoading = ref(false)
	const imageLoading = ref(false)
	const showModal = ref(false)
	const delModal = ref(false)
	const closeShowModal = () => {
		showModal.value = false
	}
	const closeDelModal = () => {
		delModal.value = false
	}
	const delVideo = () => {
		delLoading.value = true
		emit('delVideo', props.id, () => {
			delLoading.value = false
			closeDelModal()
		})
	}
</script>
<template>
	<div class="doc-video">
		<div class="media-cover video" @click="() => showModal = true">
			<img :src="getImageURL(imageURL)" :alt="imageURL.name" loading="lazy" @load="imageLoading = true">
			<div class="play-btn" v-if="imageLoading">
				<Play />
			</div>
		</div>
		<div class="doc-video__action" v-if="userRole === 'manager'">
			<button @click="()=> delModal = true">
				<Bin />
			</button>
			<DragHandle class="doc-video__handle">
				<Handle />
			</DragHandle>
		</div>
		<Teleport to="body">
			<transition name="fadeUp">
				<DocVideoMod v-if="showModal" :imageURL="imageURL" :videoURL="videoURL" @closeModal="closeShowModal" />
			</transition>
		</Teleport>
		<Teleport to="body">
			<transition name="fadeUp">
				<DelDocMod v-if="delModal" :loading="delLoading" @delDoc="delVideo" @closeModal="closeDelModal">
					<template #header>
						<h2>Удаление видео</h2>
					</template>
					<p>Видео будет удалено безвозвратно, Вы действительно хотите удалить ?</p>
				</DelDocMod>
			</transition>
		</Teleport>
	</div>
</template>
