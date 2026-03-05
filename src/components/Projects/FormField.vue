<script setup>
    import { ref } from 'vue';
    import FileField from './Fields/FileField.vue';
    import HtmlField from './Fields/HtmlField.vue';
    import MixedField from './Fields/MixedField.vue';
    import SocialField from './Fields/SocialField.vue';
    import NumberField from './Fields/NumberField.vue';
    import PhoneField from './Fields/PhoneField.vue';
    import TextField from './Fields/TextField.vue';

    const props = defineProps({
        item: Object,
        initialValues: Object || null
    })
    const map = {
        html: HtmlField,
        file: FileField,
        image: FileField,
        granteeFile: FileField,
        mixed: MixedField,
        social: SocialField,
        number: NumberField,
        text: TextField,
        tel: PhoneField,
        link: TextField
    }
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
    <component
        :is="map[item.type] || TextField"
        :item="item"
        ref="innerField"
        :initialValues="initialValues ? initialValues : null" />
</template>
