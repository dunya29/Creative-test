<script setup>
	import { inject} from 'vue'
	import ReadMore from '../Common/ReadMore.vue'
	import simplebar from 'simplebar-vue'
	const props = defineProps({
		rates: Array,
		userRole: String,
	})
	const rateArr = inject('rateArr')
</script>
<template>
	<simplebar>
		<table>
			<thead>
				<tr>
					<td class="center" v-for="(item, idx) in rateArr" :key="idx">{{ item.name }}</td>
					<td class="center">Сумма баллов</td>
					<td>Имя эксперта</td>
					<td v-if="userRole === 'manager'">Комментарий</td>
				</tr>
			</thead>
			<tbody>
				<template v-for="(arr, idx) in rates" :key="idx">
					<tr>
						<td class="center" v-for="(item, idx) in rateArr" :key="idx">{{ userRole === 'manager' ? (arr[item.translitName] * item.coefficient).toFixed(2).replace(/\.?0+$/, '') : arr[item.translitName] }}</td>
						<td class="center">{{ arr['finalTotal'] && userRole === 'manager' ? arr['finalTotal'] : arr['total'] }}</td>
						<td>{{ arr['expertName'] }}</td>
						<td v-if="userRole === 'manager'">
							<ReadMore :isMobModal="true" title="Комментарий">
								<template #modHeader>
									<h4>{{ arr['expertName'] }}</h4>
								</template>
								<div class="page-content" v-html="arr['comment']"></div>
							</ReadMore>
						</td>
					</tr>
				</template>
			</tbody>
		</table>
	</simplebar>
</template>