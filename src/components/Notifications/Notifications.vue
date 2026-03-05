<script setup>
	import { onMounted, onUnmounted, ref, watch } from 'vue'
	import { RouterLink, useRoute } from 'vue-router'
	import NotificationsIcon from '../Icons/NotificationsIcon.vue'
	import NotificationCard from './NotificationCard.vue'
	import { notificationsApi } from '@/api/api'

	const props = defineProps({
		isHeaderHidden: Boolean,
	})
	const route = useRoute()
	const showNotifications = ref(false)
	const readNotifications = ref([])
	const unReadNotifications = ref([])
	const notificationsRef = ref(null)
	const getNotifications = async () => {
		try {
			const { data } = await notificationsApi.getItems()
			readNotifications.value = [...data.items].filter(item => item.isRead)
			unReadNotifications.value = [...data.items].filter(item => !item.isRead)
		} catch (err) {
			console.log(err)
		}
	}
	const onRead = async id => {
		await getNotifications()
		try {
			await notificationsApi.editItem(id, {
				isRead: true,
			})
			getNotifications()
		} catch (err) {
			console.log(err)
		}
	}
	const handleClickOutside = event => {
		if (
			showNotifications.value &&
			notificationsRef.value &&
			!notificationsRef.value.contains(event.target)
		) {
			showNotifications.value = false
		}
	}
	onMounted(async () => {
		getNotifications()
		window.addEventListener('click', handleClickOutside)
	})
	onUnmounted(() => {
		window.removeEventListener('click', handleClickOutside)
	})
	watch(
		() => props.isHeaderHidden,
		() => {
			showNotifications.value = false
		}
	)
	watch(
		() => route.name,
		() => getNotifications()
	)
</script>
<template>
	<div class="header-notifications" ref="notificationsRef">
		<button :class="['header-notifications__btn',unReadNotifications.length && 'unread']" @click="() => showNotifications = !showNotifications">
			<NotificationsIcon />
		</button>
		<transition name="fadeUp">
			<div class="notifications" v-if="showNotifications">
				<div class="notifications__top">
					<NotificationsIcon />
					<span>Уведомления</span>
				</div>
				<p class="notifications__empty" v-if="!readNotifications.length && !unReadNotifications.length">У вас нет пока уведомлений</p>
				<div class="notifications__items" v-else>
					<div class="custom-scroll">
						<NotificationCard v-for="(item,idx) in unReadNotifications" :key="idx" :item="item" @onRead="onRead" />
						<template v-if="readNotifications.length">
							<p class="notifications__lbl">Просмотренные</p>
							<NotificationCard v-for="(item,idx) in readNotifications" :key="idx" :item="item" @onRead="onRead" />
						</template>
					</div>
				</div>
				<div class="notifications__footer" v-if="readNotifications.length || unReadNotifications.length">
					<RouterLink to="/notifications" class="btn main-btn" @click="() => showNotifications = false"><span>Посмотреть все</span></RouterLink>
				</div>
			</div>
		</transition>
	</div>
</template>