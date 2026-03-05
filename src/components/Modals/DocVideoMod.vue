<script setup>
	import Modal from '../Common/Modal.vue'
	import VideoLazy from '../Common/VideoLazy.vue'
	const props = defineProps({
		imageURL: Object,
		videoURL: Object,
	})
	const emit = defineEmits(['closeModal'])
</script>

<template>
	<Modal @closeModal="emit('closeModal')" class="video-mod">
		<div class="video-mod__inner">
			<VideoLazy :poster="imageURL" :videoURL="videoURL" />
		</div>
	</Modal>
</template>