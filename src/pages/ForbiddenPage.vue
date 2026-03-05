<script setup>
	import LoginWrap from '@/components/Login/LoginWrap.vue'
	import PageWrap from '@/components/PageWrap.vue'
</script>
<template>
	<PageWrap>
		<LoginWrap>
			<template #header>
				<h1>Доступ ограничен</h1>
				<p>Ваш доступ к сайту ограничен из-за того, что вы ввели неверный email или пароль 10 раз подряд. Для разблокировки и восстановления доступа свяжитесь с нами <a href="tel:89999999999">+7 (999) 999-99-99</a>.</p>
			</template>
		</LoginWrap>
	</PageWrap>

</template>