<script setup>
	import { useRouter } from 'vue-router'
	import { getImageURL } from '@/functions/getURL'
	import { useDateModule } from '@/module/dateModule'
	import { useCommonStore } from '@/store/common'

	const props = defineProps({
		item: Object,
	})
	const storeCommon = useCommonStore()
	const emit = defineEmits(['onRead'])
	const router = useRouter()
	const { formatUTCDate } = useDateModule()
	const onRead = async () => {
		if (!props.item.isRead) {
			emit('onRead', props.item.id)
		}
		storeCommon.notyOnClick()
		router.push('projects/' + props.item['project_id'])
	}
</script>
<template>
	<div :class="['item-notification', !item.isRead && 'unread']">
		<div class="item-notification__date">Сообщение {{formatUTCDate(item.timestamp)}}</div>
		<div class="item-notification__row">
			<div :class="['media-cover', !item.imageURL.length && 'no-photo' ]" @click="()=> onRead()">
				<img v-if="item.imageURL.length" :src="getImageURL(item.imageURL[0])" :alt="item.title" loading="lazy">
			</div>
			<h6 @click="() => onRead()">
				{{ item.title }}
			</h6>
		</div>
	</div>
</template>