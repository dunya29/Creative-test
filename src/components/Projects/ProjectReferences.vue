<script setup>
    import { projectsApi } from '@/api/api';
    import { onMounted, ref } from 'vue';
    import DocIcon from '../Icons/DocIcon.vue';
    const references = ref([])
    const isLoading = ref(true)
    onMounted(async () => {
        try {
            isLoading.value = true
            const { data } = await projectsApi.getReferences()
            references.value = [...data]
        } catch (err) {
            console.log(err)
        } finally {
            isLoading.value = false
        }
    })
</script>
<template>
    <div class="mb-60 project-p__refs">
        <transition name="fade" mode="out-in">
            <svg v-if="isLoading" key="skeleton" width="80%" height="110">
                <defs>
                    <linearGradient id="shimmer" x1="-1" x2="0" y1="0" y2="0">
                        <stop offset="0%" stop-color="#eeeeee" />
                        <stop offset="50%" stop-color="#dddddd" />
                        <stop offset="100%" stop-color="#eeeeee" />
                        <animate attributeName="x1" from="-1" to="1" dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="x2" from="0" to="2" dur="1.5s" repeatCount="indefinite" />
                    </linearGradient>
                </defs>
                <rect x="0" y="0" rx="10" width="100%" height="30" fill="url(#shimmer)" />
                <rect x="0" y="40" rx="10" width="80%" height="30" fill="url(#shimmer)" />
                <rect x="0" y="80" rx="10" width="90%" height="30" fill="url(#shimmer)" />
            </svg>
            <div v-else key="content" class="project-p__refs-list">
                <div class="sec-top">
                    <h3>Справочные материалы</h3>
                </div>
                <div v-for="item in references" :key="item.id" class="item-doc">
                    <DocIcon class="item-doc__icon" />
                    <h5><a :href="item.link.url" target="_blank">{{ item.name }}</a></h5>
                </div>
            </div>
        </transition>
    </div>
</template>
