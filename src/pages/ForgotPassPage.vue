<script setup>
	import { ref } from 'vue'
	import { useForm } from 'vee-validate'
	import { authApi } from '@/api/api'
	import { useFormModule } from '@/module/formModule'
	import LoginWrap from '@/components/Login/LoginWrap.vue'
	import PageWrap from '@/components/PageWrap.vue'
	import SuccessMod from '@/components/Modals/SuccessMod.vue'
	import ErrorMod from '@/components/Modals/ErrorMod.vue'

	const { onError, errorTitle, emailValidate, formOnError } = useFormModule()
	const schema = {
		email: val => emailValidate(val),
	}
	const {
		errors,
		handleSubmit,
		isSubmitting,
		handleReset,
		defineField,
		setFieldError,
	} = useForm({
		validationSchema: schema,
	})
	const [email, emailAttrs] = defineField('email')

	const onSuccess = ref(false)
	const onSubmit = handleSubmit(async values => {
		try {
			await authApi.forgotPassword(values.email)
			onSuccess.value = true
			handleReset()
		} catch (err) {
			console.log(err)
			formOnError(err, values, setFieldError)
		}
	})
</script>
<template>
	<PageWrap>
		<LoginWrap>
			<template #header>
				<h1>Сброс пароля</h1>
				<p>Для сброса вашего пароля необходимо ввести ваш e-mail ниже, и мы вышлем ссылку для сброса пароля</p>
			</template>
			<form class="form" @submit.prevent="onSubmit" novalidate>
				<div class="form__items">
					<div class="item-form">
						<input type="email" placeholder="E-mail" name="mail" v-model="email" v-bind="emailAttrs" />
						<div data-error="">{{ errors.email }}</div>
					</div>
				</div>
				<div class="form__footer">
					<div class="form__btns">
						<button class="btn main-btn" :class="isSubmitting && 'loading'" type="submit" :disabled="isSubmitting">
							<span>Сбросить пароль</span>
						</button>
					</div>
				</div>
			</form>
		</LoginWrap>
		<Teleport to="body">
			<transition name="fadeUp">
				<SuccessMod v-if="onSuccess" @closeModal="() => onSuccess = false" title="Ссылка для восстановления пароля отправлена на ваш email." />
			</transition>
		</Teleport>
		<Teleport to="body">
			<transition name="fadeUp">
				<ErrorMod v-if="onError" @closeModal="() => onError = false" :title="errorTitle"/>
			</transition>
		</Teleport>
	</PageWrap>
</template>