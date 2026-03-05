<script setup>
	import { onMounted, onUnmounted, ref } from 'vue'
	import Chat from '../Icons/Chat.vue'
	import MessagesView from './MessagesView.vue'
	import { useAuthStore } from '@/store/auth'
	import { useCommonStore } from '@/store/common'
	import { messagesApi } from '@/api/api'

	const props = defineProps({
		projectId: Number,
		showChat: Boolean,
	})
	const emit = defineEmits(['setChat'])
	const storeAuth = useAuthStore()
	const storeCommon = useCommonStore()
	const messages = ref([])
	const unReadMessages = ref([])
	const messagesRef = ref(null)
	const getMessages = async (no_sleep = false) => {
		let params = {}
		params['project_id'] = props.projectId
		if (no_sleep) {
			params['no_sleep'] = true
		}
		try {
			const { data } = await messagesApi.getItems({...params})
			messages.value = [...data]
			unReadMessages.value = messages.value.filter(
				item =>
					Number(item['user_id']) !== Number(storeAuth.userData.id) &&
					!item.isRead
			)
		} catch (err) {
			console.log(err)
		}
	}
	const onRead = async () => {
		await getMessages("no_sleep")
		try {
			if (unReadMessages.value.length > 0) {
				let isReadArr = unReadMessages.value.map(item => ({
					id: item.id,
					isRead: true,
				}))
				await messagesApi.editItem({
					isRead: {
						user_id: storeAuth.userData.id,
						project_id: props.projectId,
						isReadArr,
					},
				})
				await getMessages("no_sleep")
			}
		} catch (err) {
			console.log(err)
		}
	}
	const sendMessage = async (message, onSuccess, callback) => {
		try {
			let messageObj = {
				project_id: props.projectId,
				message: {
					user_id: storeAuth.userData.id,
					text: message,
					isRead: false,
				},
			}
			await messagesApi.postItem(messageObj)
			await getMessages("no_sleep")
			onSuccess()
		} catch (err) {
			console.log(err)
		} finally {
			callback()
		}
	}
	const handleClickOutside = event => {
		if (
			props.showChat &&
			messagesRef.value &&
			!messagesRef.value.contains(event.target)
		) {
			emit('setChat', false)
		}
	}
	onMounted(() => {
		getMessages("no_sleep")
		if (storeCommon.isNotyClicked) {
			emit('setChat', true)
			storeCommon.notyOnSeen()
		}
		window.addEventListener('click', handleClickOutside)
	})
	onUnmounted(() => {
		window.removeEventListener('click', handleClickOutside)
	})
</script>
<template>
	<div class="project-chat" ref="messagesRef">
		<button :class="['btn stroke-btn project-chat__btn btn--icon', unReadMessages.length > 0 && 'unread']" @click="() => emit('setChat', !showChat)">
			<span>Чат{{ messages.length ? messages.length > 99 ? ' 99+' : ` (${messages.length})` : ''}}</span>
			<Chat />
		</button>
		<transition name="fadeUp">
			<MessagesView v-if="showChat" :messages="messages" :userId="storeAuth.userData.id" @sendMessage="sendMessage" @onRead="onRead" />
		</transition>
	</div>
</template>