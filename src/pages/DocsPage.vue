<script setup>
	import { computed, onBeforeMount, ref, watch } from 'vue'
	import { SlickItem, SlickList } from 'vue-slicksort'
	import { docsVideoApi, docsApi } from '@/api/api'
	import Doc from '@/components/Docs/Doc.vue'
	import DocVideo from '@/components/Docs/DocVideo.vue'
	import AddVideoMod from '@/components/Modals/AddVideoMod.vue'
	import AddDocMod from '@/components/Modals/AddDocMod.vue'
	import Plus from '@/components/Icons/Plus.vue'
	import { useAuthStore } from '@/store/auth'
	import PageWrap from '@/components/PageWrap.vue'
	import { useCommonStore } from '@/store/common'
	const storeAuth = useAuthStore()
	const storeCommon = useCommonStore()
	const videoItems = ref([])
	const docItems = ref([])
	const videoList = ref(videoItems.value)
	const docList = ref(docItems.value)
	const isDragging = ref(false)
	const maxVideoOrderId = computed(() =>
		Math.max(...videoItems.value.map(item => item.orderId))
	)
	const maxDocOrderId = computed(() =>
		Math.max(...docItems.value.map(item => item.orderId))
	)
	const addVideoModal = ref(false)
	const addDocModal = ref(false)
	const videoItemsCount = ref(null)
	const docItemsCount = ref(null)
	const closeAddVideoModal = () => {
		addVideoModal.value = false
	}
	const closeAddDocModal = () => {
		addDocModal.value = false
	}
	const update = (newIndex, oldIndex, sortItems, api) => {
		isDragging.value = false
		if (newIndex !== oldIndex) {
			let thisItem = {
				id: sortItems.value[oldIndex].id,
				orderId: sortItems.value[newIndex].orderId,
			}
			let items = [...sortItems.value]
			let changedItemsArr = []
			if (newIndex > oldIndex) {
				changedItemsArr = [...items.slice(oldIndex + 1, newIndex + 1)].map(
					item => ({
						id: item.id,
						params: { orderId: Number(item.orderId) - 1 },
					})
				)
			} else {
				changedItemsArr = [...items.slice(newIndex, oldIndex)].map(
					item => ({
						id: item.id,
						params: { orderId: Number(item.orderId) + 1 },
					})
				)
			}
			sortDocs(thisItem, changedItemsArr, api)
		}
	}
	const videoSortEnd = ({ event, newIndex, oldIndex }) => {
		update(newIndex, oldIndex, videoItems, docsVideoApi)
	}
	const docSortEnd = ({ event, newIndex, oldIndex }) => {
		update(newIndex, oldIndex, docItems, docsApi)
	}
	const fetchVideo = async () => {
		try {
			const { data } = await docsVideoApi.getItems()
			videoItems.value = [...data]
			videoItemsCount.value = videoItems.value.length
		} catch (err) {
			console.log(err)
			storeCommon.checkServerError(err.status)
		}
	}
	const addVideo = async (data, reset, callback) => {
		try {
			await docsVideoApi.postItem(data)
			fetchVideo()
			reset()
		} catch (err) {
			console.log(err)
			storeCommon.checkServerError(err.status)
		} finally {
			callback()
		}
	}
	const delVideo = async (id, callback) => {
		try {
			await docsVideoApi.delItem(id)
			fetchVideo()
		} catch (err) {
			console.log(err)
			storeCommon.checkServerError(err.status)
		} finally {
			callback()
		}
	}
	const fetchDocs = async () => {
		try {
			const { data } = await docsApi.getItems()
			docItems.value = [...data]
			docItemsCount.value = docItems.value.length
		} catch (err) {
			console.log(err)
			storeCommon.checkServerError(err.status)
		}
	}
	const addDoc = async (data, reset, callback) => {
		try {
			await docsApi.postItem(data)
			fetchDocs()
			reset()
		} catch (err) {
			console.log(err)
			storeCommon.checkServerError(err.status)
		} finally {
			callback()
		}
	}
	const delDoc = async (id, callback) => {
		try {
			await docsApi.delItem(id)
			fetchDocs()
		} catch (err) {
			console.log(err)
			storeCommon.checkServerError(err.status)
		} finally {
			callback()
		}
	}
	const sortDocs = async (thisItem, changedItemsArr, api) => {
		let orderArr = [
			{ id: thisItem.id, orderId: thisItem.orderId },
			...changedItemsArr.map(item => ({ id: item.id, ...item.params })),
		]
		try {
			await api.sort({ order: JSON.stringify(orderArr) })
			if (api === docsVideoApi) {
				fetchVideo()
			} else if (api === docsApi) {
				fetchDocs()
			}
		} catch (err) {
			console.log(err)
			storeCommon.checkServerError(err.status)
		}
	}
	onBeforeMount(() => {
		fetchVideo()
		fetchDocs()
	})
	watch(
		() => videoItems.value,
		() => {
			videoList.value = [...videoItems.value]
		}
	)
	watch(
		() => docItems.value,
		() => {
			docList.value = [...docItems.value]
		}
	)
</script>
<template>
	<PageWrap>
		<section class="docs-p">
			<div class="container">
				<div class="docs-p__empty" v-if="videoItemsCount === 0 && docItemsCount === 0 && storeAuth.userData.userRole !== 'manager'">
					<div class="sec-top">
						<h2 class="h1">Документы</h2>
					</div>
					<p>Документов не найдено</p>
				</div>
				<div v-if="videoItemsCount === null || docItemsCount === null" class="page-loading loading"></div>
				<template v-else>
					<transition name="fadeUp">
						<div class="docs-p__sec" v-if="videoItemsCount > 0 || storeAuth.userData.userRole === 'manager'">
							<div class="sec-top">
								<h2 class="h1">Видео</h2>
								<button class="btn main-btn" @click="addVideoModal = true" v-if="storeAuth.userData.userRole === 'manager'">
									<span>Загрузить новое видео</span>
									<Plus />
								</button>
							</div>
							<SlickList axis="xy" v-model:list="videoList" :class="['mb-60 docs-p__video',isDragging && 'isDragging']" @sort-start="isDragging = true" @sort-end="videoSortEnd" useDragHandle>
								<SlickItem v-for="(item, i) in videoList" :key="item.id" :index="i">
									<DocVideo :id="item.id" :imageURL="item.imageURL[0]" :videoURL="item.videoURL[0]" :userRole="storeAuth.userData.userRole" @delVideo="delVideo" />
								</SlickItem>
							</SlickList>
						</div>
					</transition>
					<transition name="fadeUp">
						<div class="docs-p__sec" v-if="docItemsCount > 0 || storeAuth.userData.userRole === 'manager'">
							<div class="sec-top">
								<h2 class="h1">Документы</h2>
								<button class="btn main-btn" @click="addDocModal = true" v-if="storeAuth.userData.userRole === 'manager'">
									<span>Загрузить новый документ</span>
									<Plus />
								</button>
							</div>
							<SlickList axis="y" v-model:list="docList" :class="['docs-p__table',isDragging && 'isDragging']" @sort-start="isDragging = true" @sort-end="docSortEnd" useDragHandle tag="table">
								<SlickItem v-for="(item, i) in docList" :key="item.id" :index="i" tag="tr" class="item-doc">
									<Doc :id="item.id" :name="item.name" :docURL="item.docURL[0]" :userRole="storeAuth.userData.userRole" @delDoc="delDoc" />
								</SlickItem>
							</SlickList>
						</div>
					</transition>
				</template>
			</div>
			<Teleport to="body">
				<transition name="fadeUp">
					<AddVideoMod v-if="addVideoModal" :maxOrderId="maxVideoOrderId" @addVideo="addVideo" @closeModal="closeAddVideoModal" />
				</transition>
			</Teleport>
			<Teleport to="body">
				<transition name="fadeUp">
					<AddDocMod v-if="addDocModal" :maxOrderId="maxDocOrderId" @addDoc="addDoc" @closeModal="closeAddDocModal" />
				</transition>
			</Teleport>
		</section>
	</PageWrap>

</template>