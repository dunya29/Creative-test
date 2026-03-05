<script setup>
	import { formatDate } from 'date-fns'
	import RateTable from './RateTable.vue'
	import { monthArr } from '@/module/vars'

	const props = defineProps({
		rates: Array,
		archiveRates: Array,
		title: String,
		userRole: String,
	})
	
	const format = 'dd.MM.yyyy'
	const formatDateValue = value => {
		let formated = formatDate(value, format)
		let dateArr = formated.split('.')
		let month = monthArr[dateArr[1] - 1]
		return dateArr[0] + ' ' + month + ' ' + dateArr[2] + ' года'
	}
</script>
<template>
	<div class="project-p__inner">
		<section class="mb-80 project-p__sec" v-if="rates.length">
			<div class="sec-top">
				<div class="sec-top__left">
					<h2 class="h1">{{ title }}</h2>
					<div class="h2 project-p__date" v-if="['expert', 'expertSpecComp'].includes(userRole)">{{ rates[0].createdAt && formatDateValue(rates[0].createdAt) }}</div>
				</div>
			</div>
			<div class="project-p__rates">
				<RateTable :class="'table-block table-block-rate table-block-rate--' + userRole" :rates="rates" :userRole="userRole" />
				<div v-if="userRole === 'expert' && rates[0] && rates[0].comment" class="project-p__comm">
					<p class="project-p__comm-lbl">Комментарий:</p>
					<div class="page-content" v-html="rates[0].comment"></div>
				</div>
			</div>
		</section>
		<section class="mb-80 project-p__sec" v-if="archiveRates && archiveRates.length">
			<div class="sec-top">
				<h2>Архив оценок</h2>
			</div>
			<div class="project-p__rates">
				<RateTable :class="'table-block table-block-rate table-block-rate--' + userRole" :userRole="userRole" :rates="archiveRates" />
			</div>
		</section>
		<h3 v-if="!rates.length && archiveRates && !archiveRates.length">Оценок не найдено</h3>
	</div>
</template>