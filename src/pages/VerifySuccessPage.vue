<script setup>
	import { authApi } from '@/api/api'
	import { onMounted, ref } from 'vue'
	import { useRoute } from 'vue-router'
	import LoginWrap from '@/components/Login/LoginWrap.vue'
	import PageWrap from '@/components/PageWrap.vue'
	const route = useRoute()
	const loading = ref(false)
    const isSuccess = ref(false)
	const errorTxt = ref(null)
	onMounted(async () => {
		if (route.query.email && route.query.token) {
			errorTxt.value = null
			try {
				await authApi.emailVerifySuccess(
					route.query.email,
					route.query.token
				)
                isSuccess.value = true
			} catch (err) {
				console.log(err)
				errorTxt.value = err.response.data.errors.common
			} finally {
				loading.value = true
			}
		}
	})
</script>
<template>
	<PageWrap v-if="loading">
		<LoginWrap>
			<template #header>
				<h1>{{isSuccess ? 'Email успешно подтвержден' : errorTxt}}</h1>
			</template>
			<div class="log-p__btns">
				<RouterLink to="/login" class="btn main-btn">
					<span>{{isSuccess ? 'Войти' : 'На главную'}}</span>
				</RouterLink>
			</div>
		</LoginWrap>
	</PageWrap>
</template>