<script setup>
	const props = defineProps({
		openBtnTxt: String,
		closeBtnTxt: String,
		moreActive: Boolean,
		isMobModal: Boolean,
		title: String,
	})
	import {
		getCurrentInstance,
		nextTick,
		onMounted,
		onUnmounted,
		ref,
		useSlots,
		watch,
	} from 'vue'
	import ArrBottom from '../Icons/ArrBottom.vue'
	import Modal from './Modal.vue'
    const slots = useSlots()
	const contentRef = ref(null)
	const moreHidden = ref(true)
	const moreBtn = ref(false)
	const moreActive = ref(props.moreActive || false)
	const moreBtnText = ref('')
	const currWinW = ref(window.innerWidth)
	const lessH = ref(0)
	const fullH = ref(0)
	const modContentOpen = ref(false)
	const onClick = () => {
		currWinW.value = window.innerWidth
		if (!props.isMobModal || currWinW.value > 767.98) {
			if (!moreActive.value) {
				moreActive.value = true
				moreHidden.value = false
				contentRef.value.style.height = lessH.value + 'px'
				setTimeout(function () {
					contentRef.value.style.height = fullH.value + 'px'
					moreBtnText.value = props.closeBtnTxt || 'Свернуть'
				}, 0)
			} else {
				moreActive.value = false
				contentRef.value.style.height = fullH.value + 'px'
				setTimeout(function () {
					contentRef.value.style.height = lessH.value + 'px'
					moreBtnText.value = props.openBtnTxt || 'Развернуть'
					setTimeout(() => (moreHidden.value = true), 500)
				}, 0)
			}
			setTimeout(() => {
				if (contentRef.value) {
					contentRef.value.style.height = null
				}
			}, 500)
		} else {
            modContentOpen.value = !modContentOpen.value
        }
	}
	const showMoreBtn = async () => {
		await setH()
		if (fullH.value > lessH.value) {
			moreBtn.value = true
			moreBtnText.value = props.openBtnTxt || 'Развернуть'
		} else {
			moreBtn.value = false
		}
	}
	const onResize = () => {
		if (currWinW.value != window.innerWidth) {
			moreActive.value = false
			showMoreBtn()
			currWinW.value = window.innerWidth
		}
	}
	const setH = async () => {
		moreHidden.value = true
		lessH.value = contentRef.value.clientHeight
		moreHidden.value = false
		await nextTick()
		fullH.value = contentRef.value.clientHeight
		moreHidden.value = true
	}
	const instance = getCurrentInstance()

	watch(() => instance?.slots.default?.(), showMoreBtn)
	onMounted(() => {
		showMoreBtn()
		window.addEventListener('resize', onResize)
	})
	onUnmounted(() => {
		window.removeEventListener('resize', onResize)
	})
</script>
<template>
	<div class="read-more" :class="[moreHidden && 'more-hidden', moreActive && 'show']">
		<div class="read-more__content" ref="contentRef">
			<slot></slot>
		</div>
		<button class="btn text-btn read-more__btn" v-if="moreBtn" @click="()=> onClick()">
			<span>{{ moreBtnText }}</span>
			<ArrBottom />
		</button>
	</div>
	<Teleport to="body">
		<transition name="fadeUp">
			<Modal class="readMore-mod" v-if="modContentOpen && isMobModal && (currWinW < 767.98)" @closeModal="onClick()">
				<template #header>
					<h2>{{ title }}</h2>
				</template>
                <slot name="modHeader" v-if="slots.modHeader"></slot>
				<slot></slot>
			</Modal>
		</transition>
	</Teleport>
</template>