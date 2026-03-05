<script setup>
	import { computed } from 'vue'
	import { useCommonStore } from '@/store/common'
	import { mediaApi } from '@/api/api'
	import { getImageURL } from '@/functions/getURL'
	import { projectFieldsArr, projectGranteeFieldsArr } from '@/module/vars'
	import Download from '../Icons/Download.vue'
	const props = defineProps({
		projectItem: Object,
		userRole: String,
	})
	const storeCommon = useCommonStore()
	const projectFields = computed(() => {
		let arr = [...projectFieldsArr].filter(item => item.translitName != 'title')
		return arr
	})
	const projectFileFields = computed(() => [...projectFields.value.filter(item => ['mixed', 'file'].includes(item.type))])
	const granteeFields = computed(() =>
		projectGranteeFieldsArr.find(
			item =>
				props.projectItem.grantee &&
				item.value === props.projectItem.grantee.value
		)
	)
	const projectAllFileFields = computed(() => {
		if (props.projectItem.grantee) {
			let granteeFiles = granteeFields.value.data.filter(
				item => item.type === 'granteeFile'
			)
			let allFiles = []
			projectFileFields.value.forEach(item => {
				let files = item.type === 'mixed' ? props.projectItem[item.translitName].files : props.projectItem[item.translitName]
				if (files.length > 0) {
					allFiles.push({
						files,
						paramName: item.translitName,
						name: item.name,
					})
				}
			})
			granteeFiles.forEach(item => {
				if (props.projectItem.grantee[item.translitName].length > 0) {
					allFiles.push({
						files: props.projectItem.grantee[item.translitName],
						paramName: item.translitName,
						name: item.name,
					})
				}
			})
			return allFiles
		} else {
			return []
		}
	})
	const filesCount = (item) => {
		const files = item.type === 'mixed' ? props.projectItem[item.translitName].files : props.projectItem[item.translitName]
		return files.length
	}
	const downloadFiles = (paramName, type = false) => {
		const files = type === 'mixed' ? props.projectItem[paramName].files : props.projectItem[paramName]
		files.forEach((el, idx) =>
			getMediaURL(props.projectItem.id, paramName, idx + 1, el.name)
		)
	}
	const downloadAllFiles = () => {
		projectAllFileFields.value.forEach(el => {
			el.files.forEach((item, idx) =>
				getMediaURL(props.projectItem.id, el.paramName, idx + 1, item.name)
			)
		})
	}
	const getMediaURL = async (project_id, paramName, file_num, filename) => {
		try {
			const { data } = await mediaApi.getItem(project_id, paramName, file_num)
			let url = window.URL.createObjectURL(
				new Blob([data], { type: data.type })
			)
			let link = document.createElement('a')
			link.href = url
			link.setAttribute('download', filename)
			document.body.appendChild(link)
			link.click()
			link.remove()
		} catch (err) {
			console.log(err)
		}
	}
</script>
<template>
	<div class="project-p__inner">
		<section class="mb-60 project-p__sec">
			<div class="sec-top">
				<h2 class="h1">{{ projectItem.title }}</h2>
				<button class="btn main-btn" v-if="userRole === 'manager' && projectAllFileFields.length > 0" @click="() => downloadAllFiles()">
					<span>Скачать все файлы</span>
					<Download />
				</button>
			</div>
			<div class="project-p__info">
				<div class="info-project" v-if="userRole !== 'manager'">
					<div class="info-project__col">
						<span class="h6 info-project__lbl">Документы</span>
					</div>
					<div class="info-project__col">
						<div class="info-project__files">
							<template v-for="(item, idx) in projectFileFields" :key="idx">
								<template v-if="projectItem[item.translitName] && (item.type === 'mixed' ? projectItem[item.translitName].files.length : projectItem[item.translitName].length)">
									<div class="btn main-btn" @click="downloadFiles(item.translitName, item.type)">
										<span>{{ item.name + (filesCount(item) > 1 ? ` (${filesCount(item)})` : '') }}</span>
										<Download />
									</div>
								</template>
							</template>
						</div>
					</div>
				</div>
				<div class="info-project" v-if="userRole !== 'user'">
					<div class="info-project__col">
						<span class="h6 info-project__lbl">Автор:</span>
					</div>
					<div class="info-project__col">
						<div class="page-conten">
							<p>{{ projectItem.author }}</p>
						</div>
					</div>
				</div>
				<div class="info-project" v-for="(item, idx) in projectFields" :key="idx">
					<div class="info-project__col">
						<span class="h6 info-project__lbl">{{ item.name }}:</span>
					</div>
					<div class="info-project__col">
						<div class="info-project__image" v-if="item.type === 'image'">
							<div :class="['media-cover', projectItem[item.translitName] && !projectItem[item.translitName].length && 'no-photo']">
								<img v-if="projectItem[item.translitName] && projectItem[item.translitName].length" :src="getImageURL(projectItem[item.translitName][0])" :alt="projectItem.title" loading="lazy">
							</div>
						</div>
						<div v-else-if="item.type === 'radio'">
							<p v-if="item.translitName === 'grantee' && projectItem['grantee'] && storeCommon.granteeArr.length">{{storeCommon.granteeArr.find(item => item.value === projectItem['grantee'].value).name}}</p>
						</div>
						<div v-else-if="['file', 'mixed'].includes(item.type)">
							<div class="mb-20 page-content" v-if="item.type === 'mixed'" v-html="projectItem[item.translitName]?.text"></div>
							<div class="info-project__files" v-if="projectItem[item.translitName] && filesCount(item)">
								<div class="btn main-btn" @click="downloadFiles(item.translitName, item.type)">
									<span>Скачать{{ filesCount(item) > 1 ? ` (${filesCount(item)})` : '' }}</span>
									<Download />
								</div>
							</div>
						</div>
						<div class="info-project__soc" v-else-if="item.type === 'social'">
							<div :class="['info-project__soc-item', `info-project__soc-item--${el.translitName}`]" v-for="(el, index) in item.data" :key="index">
								<a :href="projectItem[item.translitName][index]" target="_blank" v-if="projectItem[item.translitName] && projectItem[item.translitName][index]">{{ projectItem[item.translitName][index] }}</a>

							</div>
						</div>
						<div class="page-content" v-else-if="item.type === 'html'" v-html="projectItem[item.translitName]"></div>
						<p v-else-if="item.translitName === 'coFinancingPercent'">{{ projectItem.coFinancing && projectItem.sum ? ((projectItem.coFinancing / (+projectItem.sum + +projectItem.coFinancing)) * 100).toFixed(2).replace(/\.?0+$/, '') : 0 }}%</p>
						<div class="page-content" v-else>
							<p v-if="item.translitName === 'direction'">
								<template v-if="storeCommon.directionArr.length">
									{{storeCommon.directionArr.find(item => item.value === projectItem.direction)?.name}}
								</template>
							</p>
							<p v-else-if="['sum', 'coFinancing'].includes(item.translitName)">{{ projectItem[item.translitName] ? String(projectItem[item.translitName]).replace(/\B(?=(\d{3})+(?!\d))/g, " ").trim() : 0 }} руб.</p>
							<p v-else-if="item.translitName === 'phone'"><a :href="'tel:' + projectItem[item.translitName]">{{ projectItem[item.translitName] }}</a></p>
							<p v-else-if="item.translitName === 'email'"><a :href="'mailto:' + projectItem[item.translitName]">{{ projectItem[item.translitName] }}</a></p>
							<p v-else-if="item.type === 'link'"><a :href="projectItem[item.translitName]" target="_blank">{{ projectItem[item.translitName] }}</a></p>
							<p v-else>{{ projectItem[item.translitName] }}</p>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="mb-60 project-p__sec" v-if="projectItem['grantee']">
			<div class="sec-top">
				<h2>Грантополучатель</h2>
			</div>
			<div class="project-p__info">
				<template v-for="(item, idx) in granteeFields.data" :key="idx">
					<div class="info-project" v-if="projectItem.grantee[item.translitName]">
						<div class="info-project__col">
							<span class="h6 info-project__lbl">{{ item.name }}:</span>
						</div>
						<div class="info-project__col">
							<div class="info-project__files" v-if="item.type === 'granteeFile' && projectItem.grantee[item.translitName].length">
								<div class="btn main-btn" v-for="(el, idx) in projectItem.grantee[item.translitName]" :key="idx" @click="getMediaURL(projectItem.id, item.translitName, idx + 1, el.name)">
									<span>Скачать</span>
									<Download />
								</div>
							</div>
							<div class="page-content" v-else-if="item.type === 'html'" v-html="projectItem.grantee[item.translitName]"></div>
							<div class="page-content" v-else-if="!['granteeFile', 'html'].includes(item.type)">
								<p>{{ projectItem.grantee[item.translitName] }}</p>
							</div>
						</div>
					</div>
				</template>
			</div>
		</section>
	</div>
</template>