<script setup>
	import { useAuthStore } from '@/store/auth'
	import User from '../Icons/User.vue'
	import { RouterLink, useRouter } from 'vue-router'
	import { onMounted, onUnmounted, ref } from 'vue'
	import { scrollPos } from '@/functions/scroll'
	import Notifications from '../Notifications/Notifications.vue'
	import { BASE_URL } from '@/api/api'
	const router = useRouter()
	const storeAuth = useAuthStore()
	const header = ref(null)
	const isMobMenuOpen = ref(false)
	const isHeaderScrolled = ref(false)
	const isHeaderHidden = ref(false)
	let lastScroll = scrollPos()
	function headerShow() {
		if (!isMobMenuOpen.value) {
			if (scrollPos() > 1) {
				isHeaderScrolled.value = true
				if (
					scrollPos() > lastScroll &&
					scrollPos() > 150 &&
					!isHeaderHidden.value
				) {
					isHeaderHidden.value = true
				} else if (scrollPos() < lastScroll && isHeaderHidden.value) {
					isHeaderHidden.value = false
				}
			} else {
				isHeaderScrolled.value = false
				isHeaderHidden.value = false
			}
		}
		lastScroll = scrollPos()
	}
	const logOut = () => {
		storeAuth.logOutOnClick()
		router.push('/login')
	}
	onMounted(async () => {
		if (document.querySelector('.page-scroll .simplebar-content-wrapper')) {
			document
				.querySelector('.page-scroll .simplebar-content-wrapper')
				.addEventListener('scroll', headerShow)
		}
	})
	onUnmounted(() => {
		if (document.querySelector('.page-scroll .simplebar-content-wrapper')) {
			document
				.querySelector('.page-scroll .simplebar-content-wrapper')
				.removeEventListener('scroll', headerShow)
		}
	})
</script>
<template>
	<header :class="['header fixed-block', isHeaderScrolled && 'scroll', isHeaderHidden && 'unshow', BASE_URL === 'https://back.ufiles.ru/api' && 'test']" ref="header">
		<div class="container">
			<div class="header__inner">
				<div class="header__left">
					<div :class="['icon-menu', isMobMenuOpen && 'active']" aria-label="Открыть меню" @click="() =>isMobMenuOpen = !isMobMenuOpen">
						<div class="icon-menu__items">
							<span class="icon-menu__item"></span>
							<span class="icon-menu__item"></span>
							<span class="icon-menu__item"></span>
						</div>
					</div>
					<nav :class="['menu', isMobMenuOpen && 'show']">
						<ul>
							<li>
								<RouterLink to="/projects" class="h6" @click="() =>isMobMenuOpen = false">{{storeAuth.userData.userRole === 'manager' ? 'Проектный офис' : 'Личный кабинет'}}</RouterLink>
							</li>
							<li v-if="storeAuth.userData.userRole === 'manager'">
								<RouterLink to="/register" class="h6" @click="() =>isMobMenuOpen = false">Реестр</RouterLink>
							</li>
							<li>
								<RouterLink to="/documents" class="h6" @click="() =>isMobMenuOpen = false">Документы</RouterLink>
							</li>
							<li v-if="storeAuth.userData.userRole === 'manager'">
								<RouterLink to="/waves" class="h6" @click="() =>isMobMenuOpen = false">Волны</RouterLink>
							</li>
							<li>
								<RouterLink to="/account" class="h6" @click="() =>isMobMenuOpen = false">Настройка</RouterLink>
							</li>
						</ul>
					</nav>
				</div>
				<div class="header__right">
					<Notifications v-if="['user', 'manager'].includes(storeAuth.userData.userRole)" :isHeaderHidden="isHeaderHidden" />
					<div class="user-btn">
						<RouterLink to="/account" class="user-btn__top">
							<User />
							<span>{{ storeAuth.userData.name }}</span>
						</RouterLink>
						<div class="user-btn__logout">
							<button class="btn stroke-btn-primary" @click="() => logOut()"><span>Выйти</span></button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>
