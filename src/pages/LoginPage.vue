<script setup>
	import { onMounted, ref, watch } from 'vue'
	import { RouterLink, useRoute, useRouter } from 'vue-router'
	import { useForm } from 'vee-validate'
	import { authApi } from '@/api/api'
	import { useAuthStore } from '@/store/auth'
	import PageWrap from '@/components/PageWrap.vue'
	import InputPassword from '@/components/Common/InputPassword.vue'
	import LoginWrap from '@/components/Login/LoginWrap.vue'
	import { useFormModule } from '@/module/formModule'
	import ErrorMod from '@/components/Modals/ErrorMod.vue'
	import { fetchErrors } from '@/module/vars'
	import LoginNoty from '@/components/Login/LoginNoty.vue'
	const route = useRoute()
	const router = useRouter()
	const storeAuth = useAuthStore()
	const formErrEmail = ref(null)
	const formErrCount = ref(0)
	const { onError, errorTitle, emailValidate, loginPasswordValidate } =
		useFormModule()
	const schema = {
		email: val => emailValidate(val),
		password: val => loginPasswordValidate(val),
	}
	const { errors, handleSubmit, isSubmitting, defineField, setFieldError } =
		useForm({
			validationSchema: schema,
			initialValues: {
				email: storeAuth.userData.email || '',
			},
		})
	const [email, emailAttrs] = defineField('email')
	const [password] = defineField('password')
	const onSubmit = handleSubmit(async values => {
		if (storeAuth.isAuthorized) {
			storeAuth.logOut()
		}
		try {
			const { data } = await authApi.auth(
				values.email.toLocaleLowerCase(),
				values.password
			)
			storeAuth.auth(data)
			router.push(route.query.redirect || '/projects')
		} catch (err) {
			console.log(err)
			if (err.response.data.errors.validation) {
				for (let key in values) {
					if (err.response.data.errors.validation[key]) {
						setFieldError(key, err.response.data.errors.validation[key])
					}
				}
			} else if (err.response.data.errors.common) {
				errorTitle.value = err.response.data.errors.common[0]
				if (fetchErrors.forbidden === errorTitle.value) {
					router.push('/forbidden')
				} else if (fetchErrors.verify === errorTitle.value) {
					router.push(`/verify?email=${values.email}`)
				} else {
					onError.value = true
				}
			}
			if (formErrEmail.value === values.email) {
				formErrCount.value++
				if (formErrCount.value >= 10) {
					try {
						await authApi.disableUser(values.email)
						router.push('/forbidden')
					} catch (err) {
						console.log(err)
					}
				}
			} else {
				formErrEmail.value = values.email
				formErrCount.value = 0
			}
		}
	})
	watch(
		() => storeAuth.userData.email,
		() => {
			if (storeAuth.userData.email) {
				email.value = storeAuth.userData.email
			}
		},
		{ once: true }
	)
	onMounted(() => {
		if (storeAuth.isLogOutClicked) {
			storeAuth.logOut()
		}
	})
</script>
<template>
	<PageWrap>
		<LoginWrap class="log-p--log">
			<template #header>
				<h1>
					<RouterLink to="/registry">Регистрация</RouterLink>
					<span> / </span>
					<RouterLink to="/login">Вход</RouterLink>
				</h1>
			</template>
			<form class="form" @submit.prevent="onSubmit" novalidate>
				<div class="form__items">
					<div class="item-form">
						<input type="email" placeholder="E-mail" name="mail" v-model="email" v-bind="emailAttrs" />
						<div data-error="">{{ errors.email }}</div>
					</div>
					<InputPassword v-model="password" :error="errors.password" />
				</div>
				<div class="form__footer">
					<div class="form__btns">
						<button class="btn main-btn" :class="isSubmitting && 'loading'" type="submit" :disabled="isSubmitting">
							<span>Войти</span>
						</button>
						<RouterLink to="/forgot-password" class="btn text-btn">Забыли пароль?</RouterLink>
					</div>
				</div>
			</form>
			<LoginNoty />
		</LoginWrap>
		<Teleport to="body">
			<transition name="fadeUp">
				<ErrorMod v-if="onError" @closeModal="() => onError = false" :title="errorTitle" />
			</transition>
		</Teleport>
	</PageWrap>
</template>
