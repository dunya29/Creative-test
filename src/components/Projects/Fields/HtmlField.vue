<script setup>
    import Tiptap from '@/components/Wysiwyg/Tiptap.vue';

    const props = defineProps({
        item: Object
    })
</script>
<template>
    <div :class="['item-form', item.error && 'error']">

        <Tiptap
            v-model="item.value"
            :limit="item.validate?.limit" />

        <span v-if="item.error" data-error>
            {{ item.errorTxt }}
        </span>

    </div>
</template>
