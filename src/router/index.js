
import LoginPage from '@/pages/LoginPage.vue';
import { useAuthStore } from '@/store/auth';
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', name: 'home', component: LoginPage, meta: { requiresAuth: true } },
        { path: '/registry', name: 'registry', component: () => import('../pages/RegistryPage.vue'), meta: { title: 'Регистрация - Команда Креативных Практик' } },
        { path: '/login', name: 'login', component: LoginPage, meta: { title: 'Вход - Команда Креативных Практик' } },
        { path: '/forgot-password', name: 'forgot-password', component: () => import('../pages/ForgotPassPage.vue'), meta: { title: 'Сброс пароля - Команда Креативных Практик' } },
        { path: '/recovery', name: 'recovery', component: () => import('../pages/RecoveryPage.vue') },
        { path: '/recovery-success', name: 'recovery-success', component: () => import('../pages/RecoverySuccessPage.vue') },
        { path: '/account', name: 'account', component: () => import('../pages/AccountPage.vue'), meta: { title: 'Настройки - Команда Креативных Практик', requiresAuth: true } },
        { path: '/projects', name: 'projects', component: () => import('../pages/ProjectsPage.vue'), meta: { title: 'Проектный офис - Команда Креативных Практик', requiresAuth: true } },
        { path: '/projects/:id', name: 'project-view', component: () => import('../pages/ProjectsPage.vue'), meta: { title: 'Проектный офис - Команда Креативных Практик', requiresAuth: true } },
        { path: '/project', name: 'project', component: () => import('../pages/ProjectPage.vue'), meta: { title: 'Новый проект - Команда Креативных Практик', requiresAuth: true, requiresUser: true } },
        { path: '/documents', name: 'documents', component: () => import('../pages/DocsPage.vue'), meta: { title: 'Документы - Команда Креативных Практик', requiresAuth: true } },
        { path: '/waves', name: 'waves', component: () => import('../pages/WavesPage.vue'), meta: { title: 'Волны - Команда Креативных Практик', requiresAuth: true, requiresManager: true } },
        { path: '/search', name: 'search', component: () => import('../pages/SearchPage.vue'), meta: { title: 'Результаты поиска - Команда Креативных Практик', requiresAuth: true } },
        { path: '/register', name: 'register', component: () => import('../pages/RegisterPage.vue'), meta: { title: 'Реестр - Команда Креативных Практик', requiresAuth: true, requiresManager: true } },
        { path: '/notifications', name: 'notifications', component: () => import('../pages/NotificationsPage.vue'), meta: { title: 'Уведомления - Команда Креативных Практик', requiresAuth: true } },
        { path: '/verify', name: 'verify', component: () => import('../pages/VerifyPage.vue'), meta: { title: 'Верификация - Команда Креативных Практик' } },
        { path: '/verify-success', name: 'verify-success', component: () => import('../pages/VerifySuccessPage.vue'), meta: { title: 'Верификация - Команда Креативных Практик' } },
        { path: '/forbidden', name: 'forbidden', component: () => import('../pages/ForbiddenPage.vue'), meta: { title: 'Доступ ограничен - Команда Креативных Практик' } },
        { path: '/access-denied', name: 'access-denied', component: () => import('../pages/AccessDeniedPage.vue'), meta: { title: 'Доступ ограничен - Команда Креативных Практик', requiresAuth: true } },
        { path: '/:pathMatch(.*)*', name: 'notfound', component: () => import('../pages/NotFoundPage.vue'), meta: { title: 'Страница не найдена - Команда Креативных Практик', requiresAuth: true } }
    ],
    linkActiveClass: 'current',
    linkExactActiveClass: 'current'
})
router.beforeEach(async (to, from) => {
    if (to.meta.requiresAuth && !useAuthStore().isAuthorized) {
        try {
            await useAuthStore().authMe()
            if (!useAuthStore().isAuthorized) {
                if (!['home', 'login', 'notfound'].includes(to.name)) {
                    return {
                        path: '/login',
                        query: { redirect: to.fullPath },
                    }
                } else {
                    return {
                        path: '/login'
                    }
                }
            } else if (useAuthStore().isAuthorized && to.name === 'home') {
                return {
                    path: '/projects'
                }
            }
        } catch (err) {
            console.log(err)
            return {
                path: '/login'
            }
        }
    }
    if (to.meta.requiresAuth && useAuthStore().isAuthorized) {
        if (to.name != 'verify' && !useAuthStore().userData.emailVerified) {
            return {
                path: '/verify',
                query: { email: useAuthStore().userData.email }
            }
        }
        if (to.name === 'verify' && useAuthStore().userData.emailVerified) {
            return {
                path: '/projects'
            }
        }
        if (to.name != 'forbidden' && useAuthStore().userData.disable) {
            return {
                path: '/forbidden'
            }
        }
        if (to.meta.requiresManager && useAuthStore().userData.userRole !== 'manager') {
            return {
                path: '/access-denied'
            }
        }
        if (to.meta.requiresUser && useAuthStore().userData.userRole !== 'user') {
            return {
                path: '/access-denied'
            }
        }
        if (to.name === 'notifications' && !['user', 'manager'].includes(useAuthStore().userData.userRole)) {
            return {
                path: '/access-denied'
            }
        }
    }
    if (to.name === 'recovery' && !to.query.token) {
        return {
            path: '/forgot-password'
        }
    }
    if (to.name === 'verify-success' && (!to.query.email || !to.query.token)) {
        if (to.query.email) {
            return {
                path: '/verify',
                query: { email: to.query.email}
            }
        } else {
            return {
                path: '/login'
            }
        }
    }
});
router.afterEach((to) => {
    document.title = to.meta.title || 'Команда Креативных Практик';
});
export default router
