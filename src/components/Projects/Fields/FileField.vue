<script setup>
    import { computed, ref } from 'vue'
    import FileForm from '@/components/Common/FileForm.vue'

    const props = defineProps({
        item: Object,
        initialValues: Object || null
    })
    const file = {
        types: ['application/pdf'],
        format: '.pdf',
        size: 5 * 1024 * 1024,
    }
    const formats = computed(() => String(props.item.validate?.format || file.format).split(", ").map(ext => ext.replace(/^\./, "")).join(", ").toUpperCase())
    function setFile(name,value) {
        props.item.value = value.length > 0 ? [...value] : []
    }
    function setError(name, value) {
        if (props.item.required) {
            props.item.error = value
        }
    }
    const fileForm = ref(null)
    function resetForm() {
        fileForm.value?.resetForm?.()
    }
    function abort() {
        fileForm.value?.abort?.()
    }
    defineExpose({ resetForm, abort })
</script>
<template>
    <div class="info-project__file">

        <FileForm
            :class="`info-project__file--${item.type}`"
            ref="fileForm"
            :name="item.translitName"
            :isMultiple="item.isMultiple"
            :types="item.validate?.types || file.types"
            :format="item.validate?.format || file.format"
            :maxSize="item.validate?.size || file.size"
            :maxWidth="item.validate?.width ? Number(item.validate.width) : null"
            :maxHeight="item.validate?.height ? Number(item.validate.height) : null"
            :emptyError="item.error"
            :initValue="initialValues"
            @setFileFieldValue="setFile"
            @fileFieldIsError="setError" />

        <div class="info-project__file-info" v-if="item.type === 'image'">
            <p>Желательный размер не менее {{ item.validate?.width }}x{{ item.validate?.height }}&nbsp;px, не более {{ item.validate?.size / 1024 / 1024 }}&nbsp;Мб</p>
            <p>Допустимые форматы изображения: {{ formats }}</p>
            <p>Важно! На фото не должно быть надписей и водяных знаков</p>
        </div>
        <div class="info-project__file-info" v-else>
            <p>Допустимые форматы: {{ formats }}</p>
            <p>Размер файла не более {{ (item.validate?.size || file.size) / 1024 / 1024 }}&nbsp;мб</p>
        </div>
    </div>
</template>
