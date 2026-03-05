<script setup>
</script>

<template>
	<section class="log-p">
		<div class="custom-scroll log-p__content">
			<div class="log-p__inner">
				<div class="log-p__top">
					<slot name="header"></slot>
				</div>
				<slot></slot>
			</div>
		</div>
	</section>
</template>