<script setup>
	import { onBeforeMount, provide, ref, watch } from 'vue'
	import { useAuthStore } from '@/store/auth'
	import { projectsApi } from '@/api/api'
	import Search from '@/components/Common/Search.vue'
	import { useTableModule } from '@/module/tableModule'
	import Status from '@/components/Common/Status.vue'
	import ProjectCard from '@/components/Projects/ProjectCard.vue'
	import RadioDropdown from '@/components/Common/RadioDropdown.vue'
	import { useRoute, useRouter } from 'vue-router'
	import Pagination from '../Common/Pagination.vue'
	import simplebar from 'simplebar-vue'
	import ProjectMod from '../Modals/ProjectMod.vue'
	import ArrTop from '../Icons/ArrTop.vue'
	import ArrBottom from '../Icons/ArrBottom.vue'
	import { useProjectModule } from '@/module/projectModule'
	import { useCommonStore } from '@/store/common'
	const route = useRoute()
	const router = useRouter()
	const storeAuth = useAuthStore()
	const storeCommon = useCommonStore()
	const projects = ref([])
	const totalCount = ref(null)
	const projectId = ref(null)
	const showModal = ref(false)
	const tabs = ref('view')
	const routePath = ref(null)
	const openProject = (id, activeTab = false) => {
		routePath.value = route.fullPath
		if (activeTab) {
			tabs.value = activeTab
		}
		projectId.value = id
		showModal.value = true
		window.history.pushState(history.state, '', `/projects/${id}`)
	}
	const closeProject = () => {
		projectId.value = null
		showModal.value = false
		if (routePath.value) {
			window.history.pushState(history.state, '', routePath.value)
			fetchItems()
		} else {
			router.push('/projects')
		}
		routePath.value = null
	}
	const setTab = activeTab => {
		tabs.value = activeTab
	}
	const loading = ref(false)
	const fetchItems = async () => {
		if (route.name === 'search' || route.name === 'projects') {
			try {
				loading.value = true
				const { data } = await projectsApi.getItems(
					storeAuth.userData.userRole,
					storeAuth.userData.id,
					{
						...params.value,
					}
				)
				projects.value = [...data.items]
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
				console.log(isMounted.value,
					params.value,
					queryParams.value,
					locationSearch.value)
			}
		}
		return projects.value.length
	}
	const {
		isMounted,
		filters,
		params,
		queryParams,
		locationSearch,
		filterStatusArr,
		filterDirectionArr,
		filterWavesArr,
		years,
		setOrder,
		statusOnChange,
		directionOnChange,
		yearOnChange,
		waveOnChange,
		setPage,
		checkSortParam,
	} = useTableModule(storeAuth.userData.userRole, fetchItems)
	function checkParams() {
		setTimeout(() => {
			if (route.params.id) {
				projectId.value = Number(route.params.id)
				showModal.value = true
			} else {
				projectId.value = null
				showModal.value = false
			}
		}, 0)
	}
	const redirectToProjects = () => {
		if (!filters.value.query && route.name === 'search') {
			router.push('/projects')
		}
	}
	onBeforeMount(() => {
		checkParams()
		redirectToProjects()
		useProjectModule()
	})
	watch(
		() => filters.value.query,
		() => {
			redirectToProjects()
		}
	)
	provide('setTab', setTab)
	provide('closeProjectMod', closeProject)
</script>
<template>
	<section class="section projects">
		<div class="container">
			<template v-if="route.name === 'search'">
				<div class="sec-top projects__top">
					<div class="sec-top__left">
						<h1>Результаты поиска</h1>
						<div class="projects__searchResult">
							<p class="h5">По запросу «{{filters.query}}» нашлось проектов: {{ totalCount }}</p>
							<button class="text-btn" @click="() => filters.query = ''" v-if="filters.query">Очистить условие поиска</button>
						</div>
					</div>
					<div class="sec-top__right">
						<Search placeholder="Поиск по тексту проекта" :icon="true" :reset="true" v-model="filters.query" />
					</div>
				</div>
			</template>
			<slot v-else :userName="storeAuth.userData.name" :role="storeAuth.userData.userRole" :years="years" :activeYear="filters.year" :yearOnChange="yearOnChange"></slot>
			<div v-if="isMounted && !locationSearch && totalCount === 0 && route.name === 'projects'" class="projects__empty">
				<p>Проектов не найдено</p>
			</div>
			<div v-else class="projects__wrapper">
				<div v-if="!isMounted || loading" class="page-loading loading"></div>
				<simplebar v-else :class="['table-block table-block-projects',`table-block-projects--${storeAuth.userData.userRole}`]">
					<table v-if="(route.name === 'search' && (locationSearch || totalCount > 0)) || (route.name == 'projects')">
						<thead>
							<tr>
								<td class="center pointer item-order" @click="setOrder('id')">
									<span>Id</span>
									<span>
										<ArrTop :class="checkSortParam('id') && 'active'" />
										<ArrBottom :class="checkSortParam('-id') && 'active'" />
									</span>
								</td>
								<td></td>
								<td class="pointer item-order" @click="setOrder('title')">
									<span>Наименование</span>
									<span>
										<ArrTop :class="checkSortParam('title') && 'active'" />
										<ArrBottom :class="checkSortParam('-title') && 'active'" />
									</span>
								</td>
								<td class="center pointer item-order" v-if="['expert','expertSpecComp', 'manager'].includes(storeAuth.userData.userRole)" @click="setOrder('wave')">
									<span>Волна</span>
									<span>
										<ArrTop :class="checkSortParam('wave') && 'active'" />
										<ArrBottom :class="checkSortParam('-wave') && 'active'" />
									</span>
								</td>
								<td class="pointer item-order" v-if="['expert','expertSpecComp'].includes(storeAuth.userData.userRole)" @click="setOrder('direction')">
									<span>Направление</span>
									<span>
										<ArrTop :class="checkSortParam('direction') && 'active'" />
										<ArrBottom :class="checkSortParam('-direction') && 'active'" />
									</span>
								</td>
								<td class="center pointer item-order" v-if="['expert', 'expertSpecComp', 'manager'].includes(storeAuth.userData.userRole)" @click="setOrder('point')">
									<span>Балл</span>
									<span>
										<ArrTop :class="checkSortParam('point') && 'active'" />
										<ArrBottom :class="checkSortParam('-point') && 'active'" />
									</span>
								</td>
								<td class="pointer item-order" v-if="['user', 'manager'].includes(storeAuth.userData.userRole)" @click="setOrder('status')">
									<span>Статус</span>
									<span>
										<ArrTop :class="checkSortParam('status') && 'active'" />
										<ArrBottom :class="checkSortParam('-status') && 'active'" />
									</span>
								</td>
								<td></td>
							</tr>
							<tr>
								<td>
									<Search type="number" v-model="filters.id" />
								</td>
								<td></td>
								<td>
									<Search v-model="filters.title" :reset="true" />
								</td>
								<td v-if="['expert', 'expertSpecComp', 'manager'].includes(storeAuth.userData.userRole)">
									<RadioDropdown v-if="filterWavesArr.length > 1" :items="filterWavesArr" :selected="filters.wave" @onChange="waveOnChange" :isMobModal="true" title="Волна">
										<span :class="filters.wave && 'selected'">{{ filters.wave ? filterWavesArr.find(item => item.value === filters.wave).name : "Фильтр" }}</span>
									</RadioDropdown>
								</td>
								<td v-if="['expert', 'expertSpecComp'].includes(storeAuth.userData.userRole)">
									<RadioDropdown :items="filterDirectionArr" :selected="filters.direction" @onChange="directionOnChange" :isMobModal="true" title="Направление">
										<span :class="filters.direction && 'selected'">{{ filters.direction ? filterDirectionArr.find(item => item.value === filters.direction).name : "Фильтр" }}</span>
									</RadioDropdown>
								</td>
								<td v-if="['expert', 'expertSpecComp', 'manager'].includes(storeAuth.userData.userRole)"></td>
								<td v-if="['user', 'manager'].includes(storeAuth.userData.userRole)">
									<Status :items="filterStatusArr" :selected="filters.status" @onChange="statusOnChange" :isMobModal="true" title="Статус" />
								</td>
								<td></td>
							</tr>
						</thead>
						<tbody v-if="totalCount">
							<ProjectCard v-for="item in projects" :key="item.id" :data="{...item,status:filterStatusArr.find(el=>el.value === item.status),direction:filterDirectionArr.find(el=>el.value === item.direction), wave:filterWavesArr.find(el=> item.wave ? el.value === item.wave : null) }" :role="storeAuth.userData.userRole" @openProject="openProject" />
						</tbody>
					</table>
				</simplebar>
				<Pagination v-if="totalCount && !loading" :currPage="filters.page" :totalCount="totalCount" @setPage="setPage" />
			</div>
		</div>
	</section>
	<Teleport to="body">
		<transition name="fadeUp">
			<ProjectMod v-if="showModal" :id="projectId" :tabs="tabs" />
		</transition>
	</Teleport>
</template>