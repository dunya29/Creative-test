<script setup>
	import { computed, onMounted, ref, watch } from 'vue'
	import { useDateModule } from '@/module/dateModule'
	const props = defineProps({
		messages: Array,
		userId: Number,
	})
	const senderId = computed(() => props.userId)
	const { formatUTCDate } = useDateModule()
	const emit = defineEmits(['sendMessage', 'onRead'])
	const scrollItemsRef = ref(null)
	const message = ref('')
	const loading = ref(false)
	const onSubmit = () => {
		if (message.value) {
			loading.value = true
			emit(
				'sendMessage',
				message.value,
				() => {
					message.value = ''
					scrollToBottom()
				},
				() => {					
					loading.value = false
				}
			)
		}
	}
	function scrollToBottom() {
		if (scrollItemsRef.value) {
			scrollItemsRef.value.scrollTo({
				top: scrollItemsRef.value.scrollHeight,
			})
		}
	}
	onMounted(() => {
		emit('onRead')
		scrollToBottom()
	})
</script>

<template>
	<div class="messages">
		<div class="messages__empty" v-if="!messages">
			<p>В чате пока нет сообщений</p>
		</div>
		<div class="messages__items" v-else>
			<div class="custom-scroll" ref="scrollItemsRef">
				<div :class="['item-message', Number(item['user_id']) === Number(senderId) ? 'is-out' : 'is-in']" v-for="(item,idx) in messages" :key="idx">
					<div class="item-message__name" v-if="item.username">{{item.username}}</div>
					<p>{{item.text}}</p>
					<div class="item-message__date">{{formatUTCDate(item.timestamp)}}</div>
				</div>
			</div>
		</div>
		<div class="messages__footer">
			<form class="form" @submit.prevent="()=> onSubmit()">
				<div class="item-form">
					<textarea placeholder="Пишите сюда" v-model="message" class="custom-scroll"></textarea>
				</div>
				<button type="submit" class="btn main-btn" :disabled="loading" :class="loading && 'loading'"><span>Отправить сообщение в чат</span></button>
			</form>
		</div>
	</div>
</template>