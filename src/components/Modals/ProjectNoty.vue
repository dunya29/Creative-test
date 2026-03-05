<script setup>
	import { ref } from 'vue'
	import ExpertArchiveMod from './ExpertArchiveMod.vue'

	const props = defineProps({
		title: String,
		userRole: String,
		rates: Array,
	})
	const expArchMod = ref(false)
	const expArchLoading = ref(false)
</script>

<template>
	<div class="project-noty">
		<div class="project-noty__noty">
			<p>Вы уже оценивали данный проект. Автор его доработал Вам необходимо оценить его заново.</p>
			<button class="btn stroke-btn" @click="() => expArchMod = true"><span>Старая оценка</span></button>
		</div>
		<Teleport to="body">
			<transition name="fadeUp">
				<ExpertArchiveMod v-if="expArchMod" :loading="expArchLoading" :title="title" :userRole="userRole" :rates="rates" @closeModal="() => expArchMod = false" />
			</transition>
		</Teleport>
	</div>
</template>