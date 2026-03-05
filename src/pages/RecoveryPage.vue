<script setup>
	import { ref } from 'vue'
	import { useRoute, useRouter } from 'vue-router'
	import { authApi } from '@/api/api'
	import InputPassword from '@/components/Common/InputPassword.vue'
	import LoginWrap from '@/components/Login/LoginWrap.vue'
	import { useFormModule } from '@/module/formModule'
	import { useForm } from 'vee-validate'
	import PageWrap from '@/components/PageWrap.vue'
	import ErrorMod from '@/components/Modals/ErrorMod.vue'
	const router = useRouter()
	const route = useRoute()
	const { passwordValidate, passwordConfirmValidate } = useFormModule()
	const schema = {
		password: val => passwordValidate(val),
		passwordConfirm: val => passwordConfirmValidate(val, password),
	}
	const { errors, handleSubmit, isSubmitting, defineField } = useForm({
		validationSchema: schema,
	})
	const [password] = defineField('password')
	const [passwordConfirm] = defineField('passwordConfirm')

	const onError = ref(false)
	const onSubmit = handleSubmit(async values => {
		const token = route.query.token
		try {
			await authApi.recoveryPassword(token, values.password)
			router.push('/recovery-success')
		} catch (err) {
			console.log(err)
			onError.value = true
		}
	})
</script>
<template>
	<PageWrap>
		<LoginWrap>
			<template #header>
				<h1>Новый пароль</h1>
				<p>Придумайте новый пароль для входа в свой аккаунт</p>
			</template>
			<form class="form" @submit.prevent="onSubmit" novalidate>
				<div class="form__items">
					<InputPassword v-model="password" :error="errors.password" />
					<InputPassword v-model="passwordConfirm" :error="errors.passwordConfirm" placeholder="Повторите пароль" name="confirmPass" />
				</div>
				<div class="form__footer">
					<div class="form__btns">
						<button class="btn main-btn" :class="isSubmitting && 'loading'" type="submit" :disabled="isSubmitting">
							<span>Поменять пароль</span>
						</button>
					</div>
				</div>
			</form>
		</LoginWrap>
		<Teleport to="body">
			<transition name="fadeUp">
				<ErrorMod v-if="onError" @closeModal="() => onError = false"/>
			</transition>
		</Teleport>
	</Pagewrap>
</template>