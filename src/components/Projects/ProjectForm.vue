<script setup>
	import { computed, onMounted, reactive, ref, useTemplateRef, watch } from 'vue'
	import Datepicker from 'vue3-datepicker'
	import { projectFieldsArr, projectGranteeFieldsArr } from '@/module/vars'
	import RadioDropdown from '@/components/Common/RadioDropdown.vue'
	import { useDateModule } from '@/module/dateModule'
	import { isEmail, isPhone, isValidURL } from '@/functions/validation'
	import { useCommonStore } from '@/store/common'
	import { projectsApi } from '@/api/api'
	import TippyIcon from '../Icons/TippyIcon.vue'
	import Tippy from '../Common/Tippy.vue'
	import ProjectReferences from './ProjectReferences.vue'
	import { useAuthStore } from '@/store/auth'
	import FormField from './FormField.vue'
	const props = defineProps({
		projectItem: Object,
	})
	const emit = defineEmits(['setFields'])
	const storeCommon = useCommonStore()
	const storeAuth = useAuthStore()
	const fileForm = useTemplateRef('fileForm')
	const granteeFileForm = useTemplateRef('granteeFileForm')
	const selectedGrantee = ref('1')
	const execTime = reactive({
		start: null,
		end: null,
	})
	const { locale, format, placeholder, setEndLowerLimit, parseDateValue } =
		useDateModule()
	const endLowerLimit = computed(() => setEndLowerLimit(execTime.start))
	const onStartDateChange = () => {
		if (execTime.end && new Date(execTime.start) >= new Date(execTime.end)) {
			execTime.end = endLowerLimit.value
		}
	}
	const fields = ref([
		[...projectFieldsArr],
		[
			...projectGranteeFieldsArr.find(
				item => item.value === selectedGrantee.value
			).data,
		],
	])
	const conFinancPercent = computed(() => {
		let sum = 0
		let coFin = 0
		fields.value.forEach(arr => {
			arr.forEach(item => {
				if (item.translitName === 'coFinancing') {
					coFin = +item.value || 0
				}
				if (item.translitName === 'sum') {
					sum = +item.value || 0
				}
			})
		})
		let perc = sum ? (coFin / (coFin + sum)) * 100 : 0
		return perc.toFixed(2).replace(/\.?0+$/, '')
	})
	const granteeOnChange = (idx, value) => {
		granteeFileForm.value.forEach(item => {
			item.resetForm()
			item.abort()
		})
		selectedGrantee.value = value
		fields.value[0][idx].value = value
		fields.value[1] = [
			...projectGranteeFieldsArr
				.find(item => item.value === selectedGrantee.value)
				.data.map(item => ({
					...item,
					value: item.type === 'granteeFile' ? [] : '',
					error: false,
				})),
		]
	}
	const selectOnChange = (name, value) => {
		fields.value.forEach(arr => {
			arr.forEach(item => {
				if (item.translitName === name) {
					item.value = value
				}
			})
		})
	}
	const resetForm = () => {
		console.log(fileForm.value, granteeFileForm.value)
		selectedGrantee.value = '1'
		execTime.start = null
		execTime.end = null
		fileForm.value.forEach(item => {
			item.resetForm()
			item.abort()
		})
		granteeFileForm.value.forEach(item => {
			item.resetForm()
			item.abort()
		})
		fields.value.forEach(arr => {
			arr.forEach(item => {
				if (item.translitName === 'direction') {
					setInitDirectionVal()
				} else if (['radio'].includes(item.type)) {
					item.value = '1'
				} else if (['image', 'file', 'granteeFile'].includes(item.type)) {
					item.value = []
				} else if (['mixed'].includes(item.type)) {
					item.fields.text.value = ""
					item.fields.files.value = []
					item.fields.text.error = false
					item.fields.files.error = false
				} else {
					item.value = ''
					if (item.data) {
						item.data.forEach(el => {
							if (
								['image', 'file', 'granteeFile'].includes(el.type)
							) {
								el.value = []
							} else {
								el.value = ''
							}
						})
					}
				}
				item.error = false
			})
		})
	}
	const onModerate = () => {
		fields.value.forEach(arr => {
			arr.forEach(item => {
				if (item.required) {
					if (item.type === 'email' && !isEmail(item.value)) {
						item.errorTxt = item.value
							? 'Некорректный email'
							: 'Заполните поле'
						item.error = true
					} else if (item.type === 'tel' && !isPhone(item.value)) {
						item.error = true
					} else if (item.type === 'link' && !isValidURL(item.value)) {
						item.errorTxt = item.value
							? 'Некорректная ссылка'
							: 'Заполните поле'
						item.error = true
					} else if (item.type === 'mixed') {
						if (item.fields.text.required) {
							item.fields.text.error = item.fields.text.value > 0 || item.fields.text.value.length > 0 ? false : true
						}
						if (item.fields.files.required) {
							item.fields.files.error = item.fields.files.value.length > 0 ? false : true
						}
						if (item.fields.text.required || item.fields.files.required) {
							item.error = item.fields.text.error || item.fields.files.error ? true : false
						} else {
							item.error = item.fields.text.value > 0 || item.fields.text.value.length > 0 || item.fields.files.value.length > 0 ? false : true
						}
						console.log(item)
					} else {
						item.error =
							item.value > 0 || item.value.length > 0 ? false : true
					}
				}
			})
		})
	}
	const onDraft = () => {
		fields.value.forEach(arr => {
			arr.forEach(item => {
				if (item.required) {
					if (item.translitName === 'title') {
						item.error =
							item.value > 0 || item.value.length > 0 ? false : true
					} else {
						item.error = false
						if (item.type === 'mixed') {
							item.fields.text.error = false
							item.fields.files.error = false
						}
					}
				}
			})
		})
	}
	defineExpose({ resetForm, onModerate, onDraft, execTime })
	const setInitDirectionVal = () => {
		fields.value.forEach(arr => {
			arr.forEach(item => {
				if (item.translitName === 'direction') {
					item.value = storeCommon.directionArr.length
						? storeCommon.directionArr[0].value
						: ''
				}
			})
		})
	}
	let initialValues
	const setInitVal = () => {
		setInitDirectionVal()
		if (props.projectItem) {
			fields.value.forEach(arr => {
				arr.forEach((item, idx) => {
					let key = item.translitName
					if (props.projectItem.hasOwnProperty(key)) {
						switch (key) {
							case 'grantee':
								granteeOnChange(idx, props.projectItem[key].value)
								setTimeout(() => {
									fields.value[1].forEach(el => {
										let elKey = el.translitName
										if (
											props.projectItem[key].hasOwnProperty(
												elKey
											)
										) {
											el.value = props.projectItem[key][elKey]
										}
									})
								}, 0)
								break
							case 'execTime':
								let execTimeArr = props.projectItem[key].split('-')
								execTime.start = execTimeArr[0]
									? parseDateValue(execTimeArr[0])
									: null
								execTime.end = execTimeArr[1]
									? parseDateValue(execTimeArr[1])
									: null
								break
							case 'social':
								props.projectItem[key].forEach((el, i) => {
									item.data[i].value = el
								})
								break
							default:
								if (item.type === 'mixed') {
									item.fields.text.value = props.projectItem[key].text
									item.fields.files.value = props.projectItem[key].files
								} else {
									item.value = props.projectItem[key]
								}
						}
						initialValues = props.projectItem
					}
				})
			})
		}
	}
	function getFileRef(type) {
		if (type === 'granteeFile') return 'granteeFileForm'
		if (['file', 'image', 'mixed'].includes(type)) return 'fileForm'

		return null
	}
	const fieldTemplates = ref([])
	onMounted(async () => {
		setInitVal()
		try {
			const { data } = await projectsApi.getFileTemplates()
			fieldTemplates.value = [...data]
		} catch (err) {
			console.log(err)
		}
	})
	watch(
		() => fields.value,
		() => {
			fields.value.forEach(arr => {
				arr.forEach(item => {
					if (item.error) {
						if (item.type === 'mixed') {
							if (item.fields.text.value > 0 || item.fields.text.value.length > 0) {
								item.fields.text.error = false
							}
							if (item.fields.files.value.length > 0) {
								item.fields.files.error = false
							}
							if (
								(item.fields.text.required && !item.fields.files.required && !item.fields.text.error) ||
								(!item.fields.text.required && item.fields.files.required && !item.fields.files.error) ||
								(item.fields.text.required && item.fields.files.required && !item.fields.text.error && !item.fields.files.error) ||
								(item.required && !item.fields.text.required && !item.fields.files.required && (item.fields.text.value > 0 || item.fields.text.value.length > 0 || item.fields.files.value.length > 0))
							) {
								item.error = false
							}

						} else if (item.value > 0 || item.value.length > 0) {
							if (item.type === 'email') {
								if (isEmail(item.value)) {
									item.error = false
								}
							} else if (item.type === 'tel') {
								if (isPhone(item.value)) {
									item.error = false
								}
							} else if (item.type === 'link') {
								if (isValidURL(item.value)) {
									item.error = false
								}
							} else {
								item.error = false
							}
						}
					}
				})
			})
			emit('setFields', fields.value)
		},
		{ deep: true }
	)
	watch(
		() => props.projectItem,
		() => setInitVal()
	)
	watch(
		() => storeCommon.directionArr,
		() => setInitDirectionVal
	)
</script>
<template>
	<div class="project-p__inner">
		<ProjectReferences v-if="storeAuth.userData.userRole === 'user'" />
		<div class="mb-60 project-p__sec">
			<div class="project-p__info">
				<template v-for="(arr, i) in fields" :key="i">
					<div class="info-project" v-for="(item, idx) in arr" :key="idx" :data-name="item.translitName">
						<div class="info-project__col">
							<div :class="['h6 info-project__lbl', item.tippyName && 'item-tippy']">
								{{ item.name + (item.tip ? ` (${item.tip})` : '') + (item.required ? '*' : '') }}
								<Tippy v-if="item.tippyName">
									<p v-html="item.tippyName"></p>
								</Tippy>:
							</div>
							<template v-if="fieldTemplates.length">
								<template v-for="(temp, idx) in fieldTemplates" :key="idx">
									<template v-if="temp.paramName === item.translitName">
										<a class="h6" v-if="item.translitName === 'budget'" :href="temp.url" download>Шаблон сметы проекта</a>
										<a class="h6" v-else-if="item.translitName === 'calendarPlan'" :href="temp.url" download>Шаблон календарного плана</a>
									</template>
								</template>
							</template>
						</div>
						<div class="info-project__col">
							<template v-if="item.translitName === 'grantee'">
								<div class="radio__items" v-if="storeCommon.granteeArr.length">
									<label class="item-checkbox" v-for="(el, index) in storeCommon.granteeArr" :key="index">
										<input type="radio" :value="el.value" :checked="el.value === selectedGrantee" @change="() => granteeOnChange(idx, el.value)">
										<span>
											{{ el.name }}
											<svg>
												<path d="M2 6.15L4.4 8.6L10.1 3" />
											</svg>
										</span>
									</label>
								</div>
							</template>
							<template v-else-if="item.translitName === 'direction'">
								<RadioDropdown v-if="storeCommon.directionArr.length" :name="item.translitName" :items="storeCommon.directionArr" :selected="item.value" @onChange="selectOnChange">
									<span class="selected">{{storeCommon.directionArr.find(el => el.value === item.value) ? storeCommon.directionArr.find(el => el.value === item.value).name : storeCommon.directionArr[0].name}}</span>
								</RadioDropdown>
								<span data-error="" v-if="item.error">{{ item.errorTxt }}</span>
							</template>
							<p v-else-if="item.translitName === 'coFinancingPercent'">{{ conFinancPercent }}%</p>
							<div class="info-project__grid" v-else-if="item.type === 'date'">
								<div :class="['item-form item-form--date', item.error && !!execTime.start && 'error']">
									<Datepicker v-model="execTime.start" :locale="locale" :inputFormat="format" :placeholder="placeholder" :lowerLimit="new Date()" @closed="onStartDateChange" />
									<div data-error="" v-if="!!execTime.start && item.error">{{ item.errorTxt }}</div>
								</div>
								<div :class="['item-form item-form--date', item.error && !!execTime.end && 'error']">
									<Datepicker v-model="execTime.end" :locale="locale" :inputFormat="format" :placeholder="placeholder" :lowerLimit="endLowerLimit" />
									<div data-error="" v-if="!!execTime.end && item.error">{{ item.errorTxt }}</div>
								</div>
							</div>
							<FormField :item="item" :initialValues="(initialValues && ['mixed', 'granteeFile', 'image', 'file'].includes(item.type)) ? item.type === 'granteeFile' ? initialValues.grantee?.[item.translitName] : item.type === 'mixed' ? initialValues[item.translitName]?.files : initialValues[item.translitName] : null" :ref="getFileRef(item.type)" v-else />
							<div v-if="item.notyTxt" class="info-project__noty">
								<TippyIcon />
								<p>{{ item.notyTxt }}</p>
							</div>
						</div>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>