<script setup>
	import Search from '@/components/Common/Search.vue'
	import PageWrap from '@/components/PageWrap.vue'
	import ProjectsWrap from '@/components/Projects/ProjectsWrap.vue'
	import { ref, watch } from 'vue'
	import { RouterLink, useRouter } from 'vue-router'
	const router = useRouter()
	const searchRef = ref('')
	watch(
		() => searchRef.value,
		() => {
			if (searchRef.value.length > 0) {
				router.push(`/search?query=${searchRef.value}`)
			}
		}
	)
</script>
<template>
	<PageWrap>
		<ProjectsWrap>
			<template #default="{userName, role, years, activeYear, yearOnChange}">
				<div :class="['sec-top projects__top', `projects__top--${role}` ]">
					<div class="sec-top__left">
						<h1 v-if="role === 'workingGroup'">Рабочая группа</h1>
						<h1 v-else-if="role === 'manager'">Проектный офис</h1>
						<h1 v-else>{{ userName }}</h1>
						<div class="projects__years" v-if="years && years.length">
							<button :class="['btn', activeYear == item.value ? 'main-btn' : 'stroke-btn']" v-for="(item,idx) in years" :key="idx" @click="() => yearOnChange(item.value)"><span>{{item.value}}</span></button>
						</div>
						<p class="h5" v-if="role === 'workingGroup'">Это финальный шаг в рассмотрении проекта, и теперь наша задача - оценить все аспекты и принять окончательное решение.</p>
					</div>
					<div class="sec-top__right">
						<RouterLink to="/project" class="btn main-btn" v-if="role === 'user'"><span>Подать проект</span></RouterLink>
						<Search placeholder="Поиск по тексту проекта" :icon="true" :reset="true" v-model="searchRef" />
					</div>
				</div>
			</template>
		</ProjectsWrap>
	</PageWrap>
</template>