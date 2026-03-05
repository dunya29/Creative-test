<script setup>
	import { computed } from 'vue'
import BtnPrev from '../Icons/BtnPrev.vue';
import BtnNext from '../Icons/BtnNext.vue';

	const props = defineProps({
		currPage: Number,
		totalCount: Number,
	})
	const emit = defineEmits(['setPage'])
	const pagesCount = computed(() => Math.ceil(props.totalCount / 12))
	let pagesList = computed(() => {
		let spread = '...'
		let firstPage
		let lastPage
		let pagesSiblingsList = []
		if (pagesCount.value <= 5) {
			firstPage = 1
			lastPage = pagesCount.value
		} else {
			if (props.currPage <= 3) {
				firstPage = 1
				lastPage = 4
			} else if (props.currPage + 1 === pagesCount.value) {
				firstPage = props.currPage - 2
				lastPage = props.currPage
			} else if (props.currPage === pagesCount.value) {
				firstPage = props.currPage - 3
				lastPage = props.currPage - 1
			} else {
				firstPage = props.currPage - 1
				lastPage = props.currPage + 1
			}
		}
		for (let i = firstPage; i <= lastPage; i++) {
			pagesSiblingsList.push(i)
		}
		if (pagesCount.value <= 5) {
			return [...pagesSiblingsList]
		} else {
			if (props.currPage <= 3) {
				return [...pagesSiblingsList, spread, pagesCount.value]
			} else {
				if (props.currPage + 2 < pagesCount.value) {
					return [
						1,
						spread,
						...pagesSiblingsList,
						spread,
						pagesCount.value,
					]
				} else {
					return [1, spread, ...pagesSiblingsList, pagesCount.value]
				}
			}
		}
	})
</script>
<template>
	<nav class="pagination" v-if="pagesCount > 1">
		<button @click="emit('setPage',currPage - 1)" :class="['pagination__btn pagination__btn--prev']" v-if="currPage > 1">
            <BtnPrev />
        </button>
		<span v-for="(item,idx) in pagesList" :key="idx" :class="[item != '...' ? 'pagination__link': 'pagination__item', item === currPage && 'current']" @click="emit('setPage',item)">
			{{ item < 10 ? '0' + item : item }}
		</span>
		<button @click="emit('setPage',currPage + 1)" :class="['pagination__btn pagination__btn--next']" v-if="currPage !== pagesCount">
            <BtnNext />
        </button>
	</nav>
</template>