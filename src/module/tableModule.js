import { computed, onBeforeMount, ref, watch } from "vue"
import { useRoute } from "vue-router"
import { booleanArr } from "./vars"
import { projectsApi, wavesApi } from "@/api/api"
import { useCommonStore } from "@/store/common"

export const useTableModule = (userRole = false, fetchItems = false) => {
	const route = useRoute()
	const limit = 12
	const filters = ref({})
	const isMounted = ref(false)
	const count = ref(null)
	const wavesLoading = ref(false)
	const storeCommon = useCommonStore()
	if (route.name === 'notifications') {
		filters.value = {
			page: 1
		}
	} else if (['projects', 'search'].includes(route.name) && userRole) {
		filters.value = { id: '', title: '' }
		if (route.name === 'search') {
			filters.value.query = ""
		}
		switch (userRole) {
			case 'expert':
			case 'expertSpecComp':
				filters.value = {
					...filters.value,
					wave: '',
					direction: '',
					year: "",
					page: 1,
					sortBy: '-id'
				}
				break
			case 'user':
				filters.value = {
					...filters.value,
					status: '',
					page: 1,
					sortBy: '-id'
				}
			case 'manager':
				filters.value = {
					...filters.value,
					wave: '',
					status: '',
					year: "",
					page: 1,
					sortBy: '-id'
				}
				break
			case 'workingGroup':
				filters.value = {
					...filters.value,
					page: 1,
					sortBy: '-id',
				}
				break
		}
	} else if (route.name === 'register') {
		filters.value = {
			id: "",
			title: "",
			status: "",
			wave: "",
			direction: "",
			author: "",
			isWgSeen: "",
			isExpertSeen: "",
			page: 1,
			year: "",
			sortBy: '-id'
		}
	} else if (route.name === 'waves') {
		filters.value = {
			year: "",
			sortBy: '-id'
		}
	}
	const searchAll = ['title', 'author', 'query']
	const queryParams = ref({})
	const locationSearch = ref(0)//фильтр внутри таблицы
	const params = computed(() => {
		let search = {}
		Object.entries(filters.value).forEach(item => {
			if (String(item[1]).length) {
				search[item[0]] = searchAll.includes(item[0])
					? '*' + item[1]
					: item[1]
			}
		})
		if (filters.value.page) {
			search.limit = limit
		}
		return search
	})
	const waves = ref([])
	const years = ref([])
	const filterStatusArr = computed(() => [{ name: 'Все', value: '' }, ...storeCommon.statusArr])
	const filterDirectionArr = computed(() => [{ name: 'Все', value: '' }, ...storeCommon.directionArr])
	const filterBooleanArr = computed(() => [{ name: 'Все', value: '' }, ...booleanArr])
	const filterWavesArr = computed(() => [{ name: 'Все', value: '' }, ...(waves.value.length ? waves.value.map(item => ({ name: item.name, value: item.id })) : [])])
	const setQuery = (query) => {
		query.forEach(item => {
			let key = item[0]
			if (filters.value.hasOwnProperty(key)) {
				filters.value[key] = item[1]
				if (key === 'page') {
					filters.value[key] = !!parseInt(item[1]) ? parseInt(item[1]) : 1
				} else {
					filters.value[key] = item[1]
				}
			}
		})
	}
	const statusOnChange = value => {
		filters.value.status = value
		setPage(1)
	}
	const directionOnChange = (undefined, value) => {
		filters.value.direction = value
		setPage(1)
	}
	const expertSeenOnChange = (undefined, value) => {
		filters.value.isExpertSeen = value
		setPage(1)
	}
	const wgSeenOnChange = (undefined, value) => {
		filters.value.isWgSeen = value
		setPage(1)
	}
	const setOrder = value => {
		filters.value.sortBy.replace(/^-/, '') === value
			? filters.value.sortBy.startsWith('-')
				? (filters.value.sortBy = value)
				: (filters.value.sortBy = '-' + value)
			: (filters.value.sortBy = value)
		setPage(1)
	}
	const yearOnChange = value => {
		filters.value.year = value
		setPage(1)
	}
	const waveOnChange = (undefined, value) => {
		filters.value.wave = value
		setPage(1)
	}
	const fetchYears = async (userRole) => {
		try {
			if (route.name === 'projects' && ['expert','expertSpecComp'].includes(userRole)) {
				const { data } = await projectsApi.getExpertYears()
				years.value = [...data]
			} else {
				const data = await storeCommon.getYears()
				years.value = [...data]
			}
		} catch (err) {
			console.log(err)
		}
	}
	const fetchWaves = async () => {
		try {
			wavesLoading.value = true
			const { data } = await wavesApi.getItems({
				year: filters.value.year,
				sortBy: '-id'
			})
			const wavesData = Array.isArray(data) ? data[0] : data
			waves.value = wavesData ? [...wavesData.waves] : []
		} catch (err) {
			console.log(err)
		} finally {
			wavesLoading.value = false
		}
	}
	const setPage = val => {
		if (filters.value.page) {
			filters.value.page = val
		}
	}
	const checkSortParam = param => {
		return filters.value.sortBy === param ? true : false
	}
	onBeforeMount(async () => {
		if (window.location.search && ['projects', 'search', 'register', 'waves'].includes(route.name)) {
			let query = Object.entries(route.query)
			setQuery(query)
		}
		if (['waves', 'register'].includes(route.name) || (['projects'].includes(route.name) && ['manager', 'expert', 'expertSpecComp'].includes(userRole))) {
			await fetchYears(userRole)
			if (!filters.value.year && years.value.length) {
				filters.value.year = years.value[0].value
			}
		}
		if (['projects', 'search'].includes(route.name) && ['manager', 'expert', 'expertSpecComp'].includes(userRole) || ['register', 'waves'].includes(route.name)) {
			fetchWaves()
		}
		count.value = await fetchItems()
		isMounted.value = true
	})
	watch(
		() => filters.value.year,
		() => {
			if (isMounted.value) {
				fetchWaves()
			}
		}
	)
	watch(
		() => filters.value,
		() => {
			let qp = {}
			let locS = 0
			Object.entries(filters.value).forEach(item => {
				if (String(item[1]).length) {
					if (!['year', 'query', 'page', 'sortBy'].includes(item[0])) {
						locS++
					}
					qp[item[0]] = item[1]
				}
			})
			if (filters.value.page) {
				qp.limit = limit
			}
			queryParams.value = qp
			locationSearch.value = locS

			if (isMounted.value) {
				fetchItems()
			}
		},
		{ deep: true }
	)
	watch(() => count.value,
		() => {
			if (count.value === 0 && filters.value.page !== 1) {
				setPage(1)
			}
		},
		{ deep: true })
	return { isMounted, wavesLoading, waves, years, filters, params, queryParams, locationSearch, filterWavesArr, filterStatusArr, filterDirectionArr, filterBooleanArr, setQuery, statusOnChange, directionOnChange, setOrder, expertSeenOnChange, wgSeenOnChange, yearOnChange, waveOnChange, setPage, checkSortParam }
}