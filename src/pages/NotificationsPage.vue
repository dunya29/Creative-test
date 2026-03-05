<script setup>
	import { ref } from 'vue'
	import PageWrap from '@/components/PageWrap.vue'
	import Pagination from '@/components/Common/Pagination.vue'
	import { useTableModule } from '@/module/tableModule'
	import { useRouter } from 'vue-router'
	import NotificationCard from '@/components/Notifications/NotificationCard.vue'
	import { notificationsApi } from '@/api/api'
	const router = useRouter()
	const notifications = ref([])
	const readNotifications = ref([])
	const unReadNotifications = ref([])
	const totalCount = ref(null)
	const loading = ref(false)
	const getItems = async () => {
		try {
			loading.value = true
			const { data } = await notificationsApi.getItems(
				{
					...params.value,
				}
			)
			notifications.value = [...data.items]
			readNotifications.value = [...data.items].filter(item => item.isRead)
			unReadNotifications.value = [...data.items].filter(item => !item.isRead)
			totalCount.value = data.meta.total_items
			if (isMounted.value) {
				router.push({ query: queryParams.value })
			}
		} catch (err) {
			console.log(err)
		} finally {
			setTimeout(() => {
				loading.value = false
			}, 100);
		}
		return notifications.value.length
	}
	const { filters, params, queryParams, isMounted, setPage } = useTableModule(
		false,
		getItems
	)
	const onRead = async id => {
		try {
			await notificationsApi.editItem(id, {
				isRead: true,
			})
		} catch (err) {
			console.log(err)
		}
	}
</script>
<template>
	<PageWrap>
		<section class="section notifications-p">
			<div class="container">
				<div class="sec-top">
					<h1>Уведомления</h1>
				</div>
				<div v-if="isMounted && totalCount === 0" class="notifications-p__empty">
					<p>У вас нет пока уведомлений</p>
				</div>
				<div class="notifications-p__wrapper" v-else>
					<div v-if="totalCount === null || loading" class="page-loading loading"></div>
					<div class="notifications-p__items" v-else>
						<template v-if="unReadNotifications">
							<NotificationCard v-for="item in unReadNotifications" :key="item.id" :item="item"  @onRead="onRead" />
						</template>
						<template v-if="readNotifications.length">
							<p class="notifications-p__lbl">Просмотренные</p>
							<NotificationCard v-for="item in readNotifications" :key="item.id" :item="item" @onRead="onRead" />
						</template>
					</div>
					<Pagination v-if="totalCount && !loading" :currPage="filters.page" :totalCount="totalCount" @setPage="setPage" />
				</div>
			</div>
		</section>
	</PageWrap>
</template>