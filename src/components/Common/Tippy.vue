<script setup>
	import { onMounted, onUnmounted, ref } from 'vue'
	import TippyIcon from '../Icons/TippyIcon.vue'
	const tippy = ref(null)
	const tippyContent = ref(null)
	const showTippy = ref(false)
	function handleMouseOver() {
		let top = tippy.value.getBoundingClientRect().top
		let left = tippy.value.getBoundingClientRect().left
		if (left - tippyContent.value.clientWidth / 2 + tippy.value.clientWidth / 2 < 0) {
			tippyContent.value.style.left = '15px'
			tippyContent.value.style.right = 'auto'
		} else if (
			left + tippyContent.value.clientWidth / 2 + tippy.value.clientWidth / 2 >
			window.innerWidth
		) {
			tippyContent.value.style.left = 'auto'
			tippyContent.value.style.right = '15px'
		} else {
			tippyContent.value.style.left = Math.max(15,
				left -
				tippyContent.value.clientWidth / 2 +
				tippy.value.clientWidth / 2) +
				'px'
			tippyContent.value.style.right = 'auto'
		}
		tippyContent.value.style.top = top + 2 + 'px'
		if (tippyContent.value.querySelector(".tippy__chevron")) {
			tippyContent.value.querySelector(".tippy__chevron").style.left = left - tippyContent.value.getBoundingClientRect().left + tippy.value.clientWidth / 2 + "px"
		}
		showTippy.value = true
		if (tippy.value.closest('.table-block')) {
			if (document.querySelector('.table-block .simplebar-content-wrapper')) {
				document
					.querySelector('.table-block .simplebar-content-wrapper')
					.addEventListener('scroll', handleMouseOut)
			}
			if (document.querySelector('.table-block .custom-scroll')) {
				document
					.querySelector('.table-block .custom-scroll')
					.addEventListener('scroll', handleMouseOut)
			}
		}
	}
	function handleMouseOut() {
		showTippy.value = false
	}
	onMounted(() => {
		window.addEventListener('resize', handleMouseOut)
		window.addEventListener('scroll', handleMouseOut)
		if (document.querySelector('.page-scroll .simplebar-content-wrapper')) {
			document
				.querySelector('.page-scroll .simplebar-content-wrapper')
				.addEventListener('scroll', handleMouseOut)
		}
	})
	onUnmounted(() => {
		window.removeEventListener('resize', handleMouseOut)
		window.removeEventListener('scroll', handleMouseOut)
		if (document.querySelector('.page-scroll .simplebar-content-wrapper')) {
			document
				.querySelector('.page-scroll .simplebar-content-wrapper')
				.removeEventListener('scroll', handleMouseOut)
		}
	})
</script>

<template>
	<div class="tippy">
		<div class="tippy__icon" ref="tippy" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
			<TippyIcon />
		</div>
		<div :class="['tippy__content', showTippy && 'show']" ref="tippyContent">
			<div class="tippy__chevron">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 12">
					<path d="M10.5 -2.18557e-06L0.499997 12L20.5 12L10.5 -2.18557e-06Z" />
				</svg>
			</div>
			<div class="page-content">
				<slot></slot>
			</div>
		</div>
	</div>
</template>