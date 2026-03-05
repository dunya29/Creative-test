<script setup>
	import { provide, ref, useTemplateRef, onBeforeMount } from 'vue'
	import { useRouter } from 'vue-router'
	import ProjectForm from '@/components/Projects/ProjectForm.vue'
	import ProjectTop from '@/components/Projects/ProjectTop.vue'
	import { projectFieldsArr, projectGranteeFieldsArr } from '@/module/vars'
	import PageWrap from '@/components/PageWrap.vue'
	import { useProjectModule } from '@/module/projectModule'
	import ProjectAgree from '@/components/Projects/ProjectAgree.vue'
	const fields = ref([
		[...projectFieldsArr],
		[...projectGranteeFieldsArr[0].data],
	])
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
	const router = useRouter()
	const projectForm = useTemplateRef('projectForm')
	const setFields = obj => {
		fields.value = obj
	}
	const closeProjectMod = () => {
		router.push('/projects')
	}
	onBeforeMount(() => {
		useProjectModule()
	})
	provide('closeProjectMod', closeProjectMod)
</script>
<template>
	<PageWrap>
		<section class="project-p project-p--main">
			<ProjectTop :fields="fields" :projectForm="projectForm" :agree="agree" @setAgreeError="setAgreeError" />
			<div class="project-p__body">
				<ProjectForm ref="projectForm" @setFields="setFields" />
				<ProjectAgree :agree="agree" @setAgreeError="setAgreeError" />
			</div>
		</section>
	</PageWrap>
</template>