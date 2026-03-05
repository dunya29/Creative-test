<script setup>
	import simplebar from 'simplebar-vue'
	import { wavesApi } from '@/api/api'
	import Plus from '@/components/Icons/Plus.vue'
	import AddEditWaveMod from '@/components/Modals/AddEditWaveMod.vue'
	import ErrorMod from '@/components/Modals/ErrorMod.vue'
	import SuccessMod from '@/components/Modals/SuccessMod.vue'
	import PageWrap from '@/components/PageWrap.vue'
	import WavesCard from '@/components/Waves/WavesCard.vue'
	import { useCommonStore } from '@/store/common'
	import { useTableModule } from '@/module/tableModule'
	import { useRouter } from 'vue-router'
	import { ref } from 'vue'
	const router = useRouter()
	const storeCommon = useCommonStore()
	const success = ref(false)
	const successTitle = ref('')
	const error = ref(false)
	const errorTitle = ref('')
	const fetchItems = () => {
		if (isMounted.value) {
			router.push({ query: queryParams.value })
		}
		return waves.value.length
	}
	const {
		isMounted,
		filters,
		queryParams,
		wavesLoading,
		waves,
		years,
		yearOnChange,
	} = useTableModule(false, fetchItems)
	const addWaveModal = ref(false)
	const addWave = async (data, callback) => {
		try {
			await wavesApi.postItem(filters.value.year, data)
			fetchItems()
			success.value = true
			successTitle.value = 'Новая волна успешно добавлена'
			addWaveModal.value = false
		} catch (err) {
			console.log(err)
			error.value = true
			errorTitle.value = 'Что-то пошло не так'
		} finally {
			callback()
		}
	}
	const delWave = async (id, callback) => {
		try {
			await wavesApi.delItem(filters.value.year, id)
			fetchItems()
		} catch (err) {
			console.log(err)
			storeCommon.checkServerError(err.status)
		} finally {
			callback()
		}
	}
	const editWave = async (id, data, callback) => {
		try {
			await wavesApi.editItem(filters.value.year, id, data)
			fetchItems()
		} catch (err) {
			console.log(err)
			storeCommon.checkServerError(err.status)
		} finally {
			callback()
		}
	}
</script>
<template>
	<PageWrap>
		<section class="section waves-p">
			<div class="container">
				<div class="sec-top">
					<h1>Волны</h1>
					<button class="btn main-btn" @click="() => addWaveModal = true">
						<span>Добавить волну</span>
						<Plus />
					</button>
				</div>
				<div class="waves-p__years" v-if="years && years.length">
					<button :class="['btn', filters.year == item.value ? 'main-btn' : 'stroke-btn']" v-for="(item, idx) in years" :key="idx" @click="() => yearOnChange(item.value)"><span>{{ item.value }}</span></button>
				</div>
				<div v-if="isMounted && !wavesLoading && waves.length === 0" class="waves-p__empty">
					<p>Данные за {{ filters.year }} год отсутствуют</p>
				</div>
				<div class="waves-p__wrapper" v-else>
					<div v-if="!isMounted || wavesLoading" class="page-loading loading"></div>
					<simplebar class="table-block table-block-waves" v-else>
						<table>
							<thead>
								<tr>
									<td>Название волны</td>
									<td>Начало</td>
									<td>Конец</td>
									<td></td>
								</tr>
							</thead>
							<tbody v-if="waves">
								<WavesCard v-for="item in waves" :key="item.id" :disabledDates="waves.filter(el => el.id !== item.id)" :id="item.id" :name="item.name" :start="item.start" :end="item.end" @delWave="delWave" @editWave="editWave" />
							</tbody>
						</table>
					</simplebar>
				</div>
			</div>
			<Teleport to="body">
				<transition name="fadeUp">
					<AddEditWaveMod v-if="addWaveModal" title="Добавление волны" :waves="waves" @editWave="addWave" @closeModal="() => addWaveModal = false" />
				</transition>
			</Teleport>
			<Teleport to="body">
				<transition name="fadeUp">
					<SuccessMod v-if="success" @closeModal="() => success = false" :title="successTitle" />
				</transition>
			</Teleport>
			<Teleport to="body">
				<transition name="fadeUp">
					<ErrorMod v-if="error" @closeModal="() => error = false" :title="errorTitle" />
				</transition>
			</Teleport>
		</section>
	</PageWrap>
</template>