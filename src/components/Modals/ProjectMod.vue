<script setup>
	import { computed, inject, onMounted, provide, ref, useTemplateRef } from 'vue'
	import ProjectForm from '../Projects/ProjectForm.vue'
	import { projectsApi, rateApi, ratingApi, ratingArchiveApi } from '@/api/api'
	import ProjectTop from '../Projects/ProjectTop.vue'
	import ProjectView from '../Projects/ProjectView.vue'
	import { useAuthStore } from '@/store/auth'
	import { projectFieldsArr, projectGranteeFieldsArr } from '@/module/vars'
	import RateView from '../Projects/RateView.vue'
	import Modal from '../Common/Modal.vue'
	import RateForm from '../Projects/RateForm.vue'
	import ProjectNoty from './ProjectNoty.vue'
	import SuccessMod from './SuccessMod.vue'
	import ProjectAgree from '../Projects/ProjectAgree.vue'
	const props = defineProps({
		id: Number,
		tabs: String,
	})
	const closeProjectMod = inject('closeProjectMod')
	const projectForm = useTemplateRef('projectForm')
	const storeAuth = useAuthStore()
	const fields = ref([
		[...projectFieldsArr],
		[...projectGranteeFieldsArr[0].data],
	])
	const rateArr = ref([])
	const rates = ref([])
	const archiveRates = ref([])
	const expertRates = ref({})
	const archiveExpertRates = ref([])
	const rateSuccess = ref(false)
	const rateSuccessTitle = ref('Оценки сохранены')
	const agree = ref([
		{
			translitName: 'policy',
			val: false,
			required: true,
			error: false,
			errorTxt: 'Требуется согласие',
		},
		{
			translitName: 'agree',
			val: false,
			required: true,
			error: false,
			errorTxt: 'Требуется согласие',
		},
	])
	const setAgreeError = (name = false) => {
		if (name) {
			let findItem = agree.value.find(item => item.translitName === name)
			if (findItem) {
				findItem.error = findItem.val ? false : true
			}
		} else {
			agree.value.forEach(item => {
				item.error = item.val ? false : true
			})
		}
	}
	const setFields = obj => {
		fields.value = obj
	}
	const projectItem = ref({})
	const fetchProject = async () => {
		try {
			const { data } = await projectsApi.getItem(
				storeAuth.userData.userRole,
				storeAuth.userData.id,
				props.id
			)
			projectItem.value = data
		} catch (err) {
			console.log(err)
			closeProjectMod()
		}
	}
	const fetchRateArr = async () => {
		if (
			['manager', 'expert', 'expertSpecComp'].includes(
				storeAuth.userData.userRole
			)
		) {
			try {
				const { data } = await rateApi.getItems(projectItem.value.year)
				const yearData = Array.isArray(data) ? data[0] : data
				rateArr.value = yearData ? [...yearData.metrics] : []

			} catch (err) {
				console.log(err)
			}
		}
	}
	const fetchRates = async () => {
		if (
			['manager', 'expert', 'expertSpecComp'].includes(
				storeAuth.userData.userRole
			)
		) {
			try {
				if (storeAuth.userData.userRole === 'manager') {
					const { data } = await ratingApi.getItems(props.id)
					rates.value = data
				} else {
					const { data } = await ratingApi.getItem(
						props.id,
						storeAuth.userData.id
					)
					expertRates.value = data[0]
				}
			} catch (err) {
				console.log(err)
			}
			try {
				if (storeAuth.userData.userRole === 'manager') {
					const { data } = await ratingArchiveApi.getItems(props.id)
					archiveRates.value = data
				} else {
					const { data } = await ratingArchiveApi.getItem(
						props.id,
						storeAuth.userData.id
					)
					archiveExpertRates.value = data
				}
			} catch (err) {
				console.log(err)
			}
		}
	}
	const statusOnChange = async (data, callback, onError) => {
		if (projectItem.value.status === '3') {
			data = { ...data, moderateDate: new Date().toISOString() }
		}
		try {
			await projectsApi.changeStatus(props.id, data)
			callback()
			fetchProject()
		} catch (err) {
			console.log(err)
			onError()
		}
	}
	const sendRate = async (obj, callback) => {
		try {
			if (!expertRates.value) {
				await ratingApi.postItem(props.id, obj)
			} else {
				await ratingApi.editItem(props.id, expertRates.value.id, obj)
			}
			rateSuccess.value = true
		} catch (err) {
			console.log(err)
		} finally {
			callback()
		}
	}
	const projectOnExpertSeen = async () => {
		if (
			props.id &&
			['expert', 'expertSpecComp'].includes(storeAuth.userData.userRole) &&
			projectItem.id &&
			!projectItem.isExpertSeen
		) {
			try {
				await projectsApi.editItem(props.id, { isExpertSeen: true })
			} catch (err) {
				console.log(err)
			}
		}
	}
	const projectOnWgSeen = async () => {
		if (
			props.id &&
			storeAuth.userData.userRole === 'workingGroup' &&
			projectItem.id &&
			!projectItem.isWgSeen
		) {
			try {
				await projectsApi.editItem(props.id, { isWgSeen: true })
			} catch (err) {
				console.log(err)
			}
		}
	}
	onMounted(async () => {
		await fetchProject()
		projectOnExpertSeen()
		projectOnWgSeen()
		fetchRateArr()
		fetchRates()
	})
	provide('rateArr', rateArr)
</script>
<template>
	<Modal :clickOutside="false" class="project-mod project-p">
		<ProjectTop :id="id" :fields="fields" :projectForm="projectForm" :projectItem="projectItem" :tabs="tabs" :archiveExpertRates="archiveExpertRates" @statusOnChange="statusOnChange" :agree="agree" @setAgreeError="setAgreeError" />
		<ProjectNoty v-if="['expert', 'expertSpecComp'].includes(storeAuth.userData.userRole) && archiveExpertRates.length" :title="projectItem.title" :userRole="storeAuth.userData.userRole" :rates="archiveExpertRates" />
		<div class="project-p__body">
			<ProjectView v-if="tabs === 'view'" :projectItem="projectItem" :userRole="storeAuth.userData.userRole" />
			<template v-if="tabs === 'edit'">
				<ProjectForm ref="projectForm" :projectItem="projectItem" @setFields="setFields" />
				<ProjectAgree :agree="agree" @setAgreeError="setAgreeError" v-if="storeAuth.userData.userRole === 'user'" />
			</template>
			<RateView v-if="tabs === 'rating' && (rates || archiveRates)" :title="projectItem.title" :rates="rates" :archiveRates="archiveRates" :userRole="storeAuth.userData.userRole" />
		</div>
		<RateForm v-if="['expert', 'expertSpecComp'].includes(storeAuth.userData.userRole) && rateArr.length" :rateArr="rateArr" :expertRates="expertRates" @sendRate="sendRate" />
		<Teleport to="body">
			<transition name="fadeUp">
				<SuccessMod v-if="rateSuccess" @closeModal="closeProjectMod" :title="rateSuccessTitle" />
			</transition>
		</Teleport>
	</Modal>
</template>