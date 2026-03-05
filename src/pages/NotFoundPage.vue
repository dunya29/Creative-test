<script setup>
	import PageWrap from '@/components/PageWrap.vue'
	import { RouterLink } from 'vue-router'
</script>
<template>
	<PageWrap>
		<section class="notfound">
			<div class="container">
				<picture>
					<source srcset="../assets/images/content/webp/logo.webp" type="image/webp">
					<img src="../assets/images/content/logo.png" alt="Logo" class="notfound__img">
				</picture>
				<h1>404<span class="h1">Ошибка</span></h1>
				<RouterLink to="/projects" class="btn main-btn"><span>Перейти в проектный офис</span></RouterLink>
			</div>
		</section>
	</PageWrap>

</template>