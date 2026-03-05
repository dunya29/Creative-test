<script setup>
	import Close from '../Icons/Close.vue'
	import RateView from '../Projects/RateView.vue'
	import Modal from '../Common/Modal.vue'

	const props = defineProps({
		rates: Array,
		userRole: String,
		title: String,
	})
	const emit = defineEmits(['closeModal'])
</script>
<template>
	<Modal :clickOutside="false" class="project-mod project-p">
		<div class="project-p__top">
			<div class="project-p__sticky">
				<div class="project-p__inner">
					<div class="project-p__actions">
					</div>
					<div class="project-p__actions">
						<button class="btn stroke-btn btn--icon" @click="() => emit('closeModal')">
							<span>Закрыть</span>
							<Close />
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="project-noty">
			<div class="project-noty__noty">
				<p>Вы уже оценивали данный проект. Автор его доработал Вам необходимо оценить его заново.</p>
				<button class="btn stroke-btn" @click="() => emit('closeModal')"><span>Вернуться к оценке</span></button>
			</div>
		</div>
		<div class="project-p__body">
			<RateView :rates="rates" :title="title" :userRole="userRole" />
		</div>
	</Modal>
</template>