<script setup>
	import { booleanArr } from '@/module/vars'
	import { ref } from 'vue'
	import CommentMod from '../Modals/CommentMod.vue'
	import Plus from '../Icons/Plus.vue'
	import Eye from '../Icons/Eye.vue'
	import { useDateModule } from '@/module/dateModule'
	const props = defineProps({
		data: Object,
	})
	const { formatDateValue } = useDateModule()
	const commentModal = ref(false)
	const closeCommentModal = () => {
		commentModal.value = false
	}
</script>
<template>
	<tr>
		<td class="center">{{ data.id }}</td>
		<td class="center">{{ data.wave ? data.wave.name : '-'}}</td>
		<td class="center">{{ data.moderateDate ? formatDateValue(data.moderateDate) : '-' }}</td>
		<td class="center">{{ data.deadline ? formatDateValue(data.deadline) : '-' }}</td>
		<td>
			<span class="status" v-if="data.status">
				<span class="status__bg" :style="`background-color: ${data.status.color}`"></span>
				{{ data.status.name }}</span>
		</td>
		<td><span v-if="data.direction">{{ data.direction.name }}</span></td>
		<td>
			<h5>{{ data.title }}</h5>
		</td>
		<td>{{ data.author }}</td>
		<td class="center">{{ String(data.sum).replace(/\B(?=(\d{3})+(?!\d))/g, " ").trim() }}</td>
		<td class="center">{{ data.sum && +data.sum > 0 && data.coFinancing ? ((data.coFinancing / (+data.coFinancing + +data.sum)) * 100 ).toFixed(2).replace(/\.?0+$/, '') : 0 }}%</td>
		<td class="center">{{ data['contact_phone'] && data['contact_phone']}}</td>
		<td class="center">{{ booleanArr.find(el => el.value === data.isExpertSeen).name }}</td>
		<td class="center">{{ booleanArr.find(el => el.value === data.isWgSeen).name }}</td>
		<td class="page-icons">
			<div class="page-icon" @click="() => commentModal = true" v-if="data.comment">
				<Eye />
			</div>
			<div class="page-icon" @click="() => commentModal = true" v-else>
				<Plus />
			</div>
		</td>
	</tr>
	<Teleport to="body">
		<transition name="fadeUp">
			<CommentMod v-if="commentModal" :id="data.id" :title="data.title" :comment="data.comment" @closeModal="closeCommentModal" />
		</transition>
	</Teleport>
</template>