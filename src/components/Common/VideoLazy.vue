<script setup>
	import { getImageURL, getVideoURL } from '@/functions/getURL'
	import { onMounted, ref } from 'vue'

	const props = defineProps({
		poster: Object,
		videoURL: Object,
		muted: Boolean,
	})
	const videoRef = ref(null)
	const loaded = ref(false)
	onMounted(() => {
		videoRef.value.addEventListener('loadeddata', () => {
			loaded.value = true
			videoRef.value.setAttribute('autoplay', '')
			videoRef.value.play()
		})
	})
</script>
<template>
	<div class="video-lazy media-cover" :class="[loaded && 'loaded', !loaded && 'loading']">
		<video controls="" :src="getVideoURL(videoURL)" :muted="muted || true" playsinline="" loop="" ref="videoRef"></video>
		<img :src="getImageURL(poster)" :alt="poster.name" loading="lazy" />
	</div>
</template>