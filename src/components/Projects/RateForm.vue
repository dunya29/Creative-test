<script setup>
	import { onMounted, ref, watch } from 'vue'
	import ArrBottom from '../Icons/ArrBottom.vue'
	import Tiptap from '../Wysiwyg/Tiptap.vue'
	import Plus from '../Icons/Plus.vue'
	import Minus from '../Icons/Minus.vue'
	import { useAuthStore } from '@/store/auth'
	import simplebar from 'simplebar-vue'
	const props = defineProps({
		rateArr: Array,
		expertRates: Object,
	})
	const emit = defineEmits(['sendRate'])
	const storeAuth = useAuthStore()
	const sendRateLoading = ref(false)
	const rateFields = ref(props.rateArr)
	const showComm = ref(false)
	const expComm = ref('')
	const inpOnChange = (idx, value) => {
		if (value > 0) {
			rateFields.value[idx].value = value > 10 ? 10 : Math.round(value)
		} else {
			rateFields.value[idx].value = 0
		}
	}
	const onSubmit = async () => {
		sendRateLoading.value = true
		let obj = {}
		let total = 0
		let finalTotal = 0
		rateFields.value.forEach(item => {
			console.log(item, typeof item.value, typeof item.coefficient)
			obj[item.translitName] = item.value
			total = total + item.value
			finalTotal = finalTotal + item.value * item.coefficient
		})
		obj.total = total
		console.log(finalTotal)
		obj.finalTotal = finalTotal.toFixed(2).replace(/\.?0+$/, '')
		obj.comment = expComm.value
		obj.expertId = props.expertRates
			? props.expertRates.expertId
			: storeAuth.userData.id
		obj.expertName = props.expertRates
			? props.expertRates.expertName
			: storeAuth.userData.name
		emit('sendRate', obj, () => (sendRateLoading.value = false))
	}
	const setInitVal = () => {
		if (props.expertRates) {
			rateFields.value.forEach(item => {
				let key = item.translitName
				if (props.expertRates.hasOwnProperty(key)) {
					item.value = Number(props.expertRates[key])
				}
			})
			expComm.value = props.expertRates.comment || ''
		}
	}
	onMounted(setInitVal)
	watch(
		() => props.expertRates,
		() => setInitVal()
	)
</script>
<template>
	<div class="project-rate">
		<div class="project-rate__inner">
			<div class="project-rate__top">
				<button :class="['btn main-btn', sendRateLoading && 'loading']" :disabled="sendRateLoading" @click="() => onSubmit()"><span>Отправить</span></button>
				<button class="btn text-btn" @click="() => showComm = !showComm">{{ !showComm ? 'Открыть комментарий' : 'Скрыть комментарий'}}
					<ArrBottom />
				</button>
			</div>
			<div :class="['project-rate__info', showComm && 'show']">
				<div class="info-project">
					<div class="info-project__col">
						<span class="h6 info-project__lbl">Напишите вопросы к проекту или комментарий</span>
					</div>
					<div class="info-project__col">
						<div :class="['item-form']">
							<Tiptap v-model="expComm" />
						</div>
					</div>
				</div>
			</div>
			<simplebar class="project-rate__rates">
				<div class="project-rate__items">
					<div class="project-rate__item" v-for="(item,idx) in rateFields" :key="idx">
						<div class="item-rate">
							<div class="quantity">
								<button class="quantity__btn" :disabled="item.value <= 0" @click="() => item.value--">
									<Minus />
								</button>
								<input type="number" v-model="item.value" @change="e => inpOnChange(idx, e.target.value)">
								<button class="quantity__btn" :disabled="item.value >= 10" @click="() => item.value++">
									<Plus />
								</button>
							</div>
							<span class="h6">{{item.shortName}}</span>
						</div>
					</div>

				</div>
			</simplebar>

		</div>
	</div>
</template>