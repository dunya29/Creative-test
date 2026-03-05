<script setup>
	import LoginWrap from '@/components/Login/LoginWrap.vue'
	import PageWrap from '@/components/PageWrap.vue'
	import { RouterLink } from 'vue-router'
</script>
<template>
	<PageWrap>
		<LoginWrap>
			<template #header>
				<h1>Пароль изменен</h1>
				<p>Ваш пароль был изменен, и теперь вы можете использовать его для входа в свой аккаунт</p>
			</template>
			<RouterLink to="/login" class="btn main-btn"><span>Войти</span></RouterLink>
		</LoginWrap>
	</PageWrap>
</template>