<script setup>
	import LoginWrap from '@/components/Login/LoginWrap.vue'
	import PageWrap from '@/components/PageWrap.vue'
	import { RouterLink } from 'vue-router'
</script>
<template>
	<PageWrap>
		<LoginWrap>
			<template #header>
				<h1>Доступ ограничен</h1>
				<p>Вы не имеете доступа к данной странице</p>
			</template>
			<div class="log-p__btns">
				<RouterLink to="/projects" class="btn main-btn"><span>Вернуться к проектам</span></RouterLink>
			</div>
		</LoginWrap>
	</PageWrap>
</template>


