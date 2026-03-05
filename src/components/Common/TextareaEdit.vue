<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';

const props = defineProps({
    placeholder: String,
    modelValue: String
})
const emit = defineEmits(['update:modelValue'])
const textRef = ref(null)
const textOnInput = () => {
    if (textRef.value) {
        textRef.value.style.height = ''; 
        textRef.value.style.height = textRef.value.scrollHeight + 'px'
    }
}
const textOnChange = async() => {
    let value = textRef.value.value.replace(/^\s*|\s*$/g, '')  
    textRef.value.value = value 
    textOnInput()  
    emit('update:modelValue', value)
}
watch(textRef, textOnInput)
onMounted(() => {
    window.addEventListener("resize", textOnInput);
})
onUnmounted(() => {
    window.removeEventListener("resize", textOnInput);
})
</script>
<template>
    <textarea class="textarea-edit" ref="textRef" :placeholder="placeholder" :value="modelValue" @input="()=>textOnInput()" @change="()=>textOnChange()"></textarea>
</template>