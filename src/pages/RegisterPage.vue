<script setup>
	import { onBeforeMount, provide, ref } from 'vue'
	import { useRouter } from 'vue-router'
	import { registerApi } from '@/api/api'
	import Search from '@/components/Common/Search.vue'
	import Status from '@/components/Common/Status.vue'
	import RegisterCard from '@/components/Register/RegisterCard.vue'
	import { useTableModule } from '@/module/tableModule'
	import RadioDropdown from '@/components/Common/RadioDropdown.vue'
	import PageWrap from '@/components/PageWrap.vue'
	import Pagination from '@/components/Common/Pagination.vue'
	import simplebar from 'simplebar-vue'
	import ArrTop from '@/components/Icons/ArrTop.vue'
	import ArrBottom from '@/components/Icons/ArrBottom.vue'
	import { useProjectModule } from '@/module/projectModule'
	import { useCommonStore } from '@/store/common'
	const storeCommon = useCommonStore()
	const router = useRouter()
	const registerItems = ref([])
	const totalCount = ref(null)
	const loading = ref(false)
	const fetchItems = async () => {
		try {
			loading.value = true
			const { data } = await registerApi.getItems({
				...params.value,
			})
			registerItems.value = [...data.items]
			totalCount.value = data.meta.total_items
			if (isMounted.value) {
				router.push({ query: queryParams.value })
			}
		} catch (err) {
			console.log(err)
			storeCommon.checkServerError(err.status)
		} finally {
			setTimeout(() => {
				loading.value = false
			}, 100)
		}
		return registerItems.value.length
	}
	const {
		isMounted,
		years,
		filterWavesArr,
		filters,
		params,
		queryParams,
		locationSearch,
		filterStatusArr,
		filterDirectionArr,
		filterBooleanArr,
		yearOnChange,
		setOrder,
		waveOnChange,
		statusOnChange,
		directionOnChange,
		expertSeenOnChange,
		wgSeenOnChange,
		setPage,
		checkSortParam,
	} = useTableModule(false, fetchItems)
	const addComment = async (id, data, reset, callback) => {
		try {
			await registerApi.editComment(id, data)
			fetchItems()
			reset()
		} catch (err) {
			console.log(err)
			storeCommon.checkServerError(err.status)
		} finally {
			callback()
		}
	}
	onBeforeMount(() => {
		useProjectModule()
	})
	provide('addComment', addComment)
</script>
<template>
	<PageWrap>
		<section class="section register-p">
			<div class="container">
				<div class="sec-top">
					<h1>Реестр</h1>
				</div>
				<div class="register-p__years" v-if="years && years.length">
					<button :class="['btn', filters.year == item.value ? 'main-btn' : 'stroke-btn']" v-for="(item, idx) in years" :key="idx" @click="() => yearOnChange(item.value)"><span>{{ item.value }}</span></button>
				</div>
				<div v-if="isMounted && !locationSearch && totalCount === 0" class="register-p__empty">
					<p>Проектов не найдено</p>
				</div>
				<div class="register-p__wrapper" v-else>
					<div v-if="!isMounted || loading" class="page-loading loading"></div>
					<simplebar v-else class="table-block table-block-register">
						<table>
							<thead>
								<tr>
									<td class="center pointer item-order" @click="setOrder('id')">
										<span>Id</span>
										<span>
											<ArrTop :class="checkSortParam('id') && 'active'" />
											<ArrBottom :class="checkSortParam('-id') && 'active'" />
										</span>
									</td>
									<td class="center pointer item-order" @click="setOrder('wave')">
										<span>Волна</span>
										<span>
											<ArrTop :class="checkSortParam('wave') && 'active'" />
											<ArrBottom :class="checkSortParam('-wave') && 'active'" />
										</span>
									</td>
									<td class="center">
										Дата Модерации
									</td>
									<td class="center">
										Сроки доработки
									</td>
									<td class="pointer item-order" @click="setOrder('status')">
										<span>Статус</span>
										<span>
											<ArrTop :class="checkSortParam('status') && 'active'" />
											<ArrBottom :class="checkSortParam('-status') && 'active'" />
										</span>
									</td>
									<td class="pointer item-order" @click="setOrder('direction')">
										<span>Направление</span>
										<span>
											<ArrTop :class="checkSortParam('direction') && 'active'" />
											<ArrBottom :class="checkSortParam('-direction') && 'active'" />
										</span>
									</td>
									<td class="pointer item-order" @click="setOrder('title')">
										<span>Наименование</span>
										<span>
											<ArrTop :class="checkSortParam('title') && 'active'" />
											<ArrBottom :class="checkSortParam('-title') && 'active'" />
										</span>
									</td>
									<td class="pointer item-order" @click="setOrder('author')">
										<span>Автор</span>
										<span>
											<ArrTop :class="checkSortParam('author') && 'active'" />
											<ArrBottom :class="checkSortParam('-author') && 'active'" />
										</span>
									</td>
									<td class="pointer item-order" @click="setOrder('sum')">
										<span>Сумма</span>
										<span>
											<ArrTop :class="checkSortParam('sum') && 'active'" />
											<ArrBottom :class="checkSortParam('-sum') && 'active'" />
										</span>
									</td>
									<td class="pointer item-order" @click="setOrder('sum')">
										<span>Софинансирование</span>
									</td>
									<td>Телефон</td>
									<td class="center">Рассмотрен ЭК</td>
									<td class="center">Рассмотрен РГ</td>
									<td>Комментарий</td>
								</tr>
								<tr>
									<td>
										<Search type="number" v-model="filters.id" />
									</td>
									<td>
										<RadioDropdown v-if="filterWavesArr.length > 1" :items="filterWavesArr" :selected="filters.wave" @onChange="waveOnChange" :isMobModal="true" title="Волна">
											<span :class="filters.wave && 'selected'">{{ filters.wave ? filterWavesArr.find(item => item.value === filters.wave).name : "Фильтр" }}</span>
										</RadioDropdown>
									</td>
									<td></td>
									<td></td>
									<td>
										<Status :items="filterStatusArr" :selected="filters.status" @onChange="statusOnChange" :isMobModal="true" title="Статус" />
									</td>
									<td>
										<RadioDropdown :items="filterDirectionArr" :selected="filters.direction" @onChange="directionOnChange" :isMobModal="true" title="Направление">
											<span :class="filters.direction && 'selected'">{{ filters.direction ? filterDirectionArr.find(item => item.value === filters.direction).name : "Фильтр" }}</span>
										</RadioDropdown>
									</td>
									<td>
										<Search v-model="filters.title" />
									</td>
									<td>
										<Search v-model="filters.author" />
									</td>
									<td></td>
									<td></td>
									<td></td>
									<td>
										<RadioDropdown :items="filterBooleanArr" :selected="filters.isExpertSeen" @onChange="expertSeenOnChange" :isMobModal="true" title="Рассмотрен экспертной комиссией" />
									</td>
									<td>
										<RadioDropdown :items="filterBooleanArr" :selected="filters.isWgSeen" @onChange="wgSeenOnChange" :isMobModal="true" title="Рассмотрен рабочей группой" />
									</td>
									<td></td>
								</tr>
							</thead>
							<tbody v-if="totalCount > 0">
								<RegisterCard v-for="item in registerItems" :key="item.id" :data="{...item,status:filterStatusArr.find(el=>el.value === item.status),direction:filterDirectionArr.find(el=>el.value === item.direction), wave:filterWavesArr.find(el=>item.wave ? el.value === item.wave : null) }" />
							</tbody>
						</table>
					</simplebar>
					<Pagination v-if="totalCount && !loading" :currPage="filters.page" :totalCount="totalCount" @setPage="setPage" />
				</div>
			</div>
		</section>
	</PageWrap>
</template>