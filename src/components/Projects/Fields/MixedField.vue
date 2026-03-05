<script setup>
    import { ref } from 'vue';
    import FileField from './FileField.vue';
    import HtmlField from './HtmlField.vue';
    const props = defineProps({
        item: Object,
        initialValues: Object || null
    })
    const innerField = ref(null)
    function resetForm() {
        innerField.value?.resetForm?.()
    }
    function abort() {
        innerField.value?.abort?.()
    }
    defineExpose({ resetForm, abort })
</script>
<template>
    <div>
        <FileField :item="item.fields.files" class="mb-20" ref="innerField" :initialValues="initialValues" />
        <HtmlField :item="item.fields.text" />
        <span v-if="item.error" data-error>
            {{ item.errorTxt }}
        </span>
    </div>
</template>
