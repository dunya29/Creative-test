<script setup>
	import politikaPdf from '/static/files/politika-obrabotki-personalnyh-dannyh-nn-creative.pdf'
	import agreePdf from '/static/files/soglashenie_ob_usloviyah_razmeshheniya_informacii.pdf'
	const props = defineProps({
		agree: Array,
	})
	const emit = defineEmits(['setAgreeError'])
</script>
<template>
	<div class="project-p__bottom">
		<label class="item-checkbox" :data-name="agree[0].translitName">
			<input :name="agree[0].translitName" type="checkbox" @click="()=>{agree[0].val = !agree[0].val;emit('setAgreeError',agree[0].translitName)}" />
			<span>
				Я согласен на <a :href="politikaPdf" target="_blank">обработку персональных данных в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ</a>
				<svg>
					<path d="M2 6.15L4.4 8.6L10.1 3" />
				</svg>
			</span>
			<div data-error="" v-if="agree[0].error">{{agree[0].errorTxt}}</div>
		</label>
		<label class="item-checkbox" :data-name="agree[1].translitName">
			<input :name="agree[1].translitName" type="checkbox" @click="()=>{agree[1].val = !agree[1].val;emit('setAgreeError',agree[1].translitName)}" />
			<span>Я согласен с <a :href="agreePdf" target="_blank">условиями размещения информации, изображений, объектов авторского права и иных результатов интеллектуальной деятельности</a>
				<svg>
					<path d="M2 6.15L4.4 8.6L10.1 3" />
				</svg>
			</span>
			<div data-error="" v-if="agree[1].error">{{agree[1].errorTxt}}</div>
		</label>
	</div>
</template>