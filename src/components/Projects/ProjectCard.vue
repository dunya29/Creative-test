<script setup>
	import { getImageURL } from '@/functions/getURL'
	import Edit from '../Icons/Edit.vue'
	import Eye from '../Icons/Eye.vue'
	import Star from '../Icons/Star.vue'
	import Tippy from '../Common/Tippy.vue'
	import { useDateModule } from '@/module/dateModule'

	const props = defineProps({
		role: String,
		data: Object,
	})
	const emit = defineEmits(['openProject'])
	const { formatDateValue } = useDateModule()
</script>
<template>
	<tr>
		<td class="center">{{ data.id }}</td>
		<td>
			<div :class="['media-cover', !data.imageURL.length && 'no-photo']">
				<img v-if="data.imageURL.length" :src="getImageURL(data.imageURL[0])" :alt="data.title" loading="lazy">
			</div>
		</td>
		<td>
			<h5>{{ data.title }}</h5>
		</td>
		<td class="center" v-if="['manager', 'expert', 'expertSpecComp'].includes(role)">
			{{ data.wave ? data.wave.name : '-'}}
		</td>
		<td v-if="['expert', 'expertSpecComp'].includes(role)">
			<span v-if="data.direction">{{ data.direction.name }}</span>
		</td>
		<td class="center" v-if="['manager', 'expert','expertSpecComp'].includes(role)">{{ data.point || '-'}}</td>
		<td v-if="['manager','user'].includes(role)">
			<div :class="['status', role === 'user' && 'item-tippy']">
				<template v-if="data.status">
					<span class="status__bg" :style="`background-color: ${data.status.color}`"></span>
					{{ data.status.name }}
					<Tippy v-if="role === 'user'">
						{{ data.status.desc }}<br>
						{{ ['1','2'].includes(data.status.value) ? data.deadline ? `Дедлайн: ${formatDateValue(data.deadline)}` : null : null}}
					</Tippy>
				</template>
			</div>
		</td>
		<td class="page-icons">
			<button class="page-icon" @click="() => emit('openProject', data.id,'view')">
				<Eye />
				<span class="page-icon__desc">Просмотр</span>
			</button>
			<button v-if="role === 'manager' || (role === 'user' && data.status && ['1', '2', '9'].includes(data.status.value))" class="page-icon" @click="() => emit('openProject', data.id,'edit')">
				<Edit />
				<span class="page-icon__desc">Редактировать</span>
			</button>
			<button v-if="role === 'manager'" class="page-icon" @click="() => emit('openProject', data.id,'rating')">
				<Star />
				<span class="page-icon__desc">Оценки</span>
			</button>
		</td>
	</tr>
</template>