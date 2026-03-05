<script setup>
import { ref } from 'vue';

const props = defineProps({
    title: String
})
const dropDownRef = ref(null)
const isDropdownVisible = ref(false)
const toggleDropdownVisibility = () => {
    if (!isDropdownVisible.value) {
        isDropdownVisible.value = true
        window.addEventListener("click", function clickOutside(e) {
            if (dropDownRef.value &&!dropDownRef.value.contains(e.target)) {
                isDropdownVisible.value = false
                window.removeEventListener("click", clickOutside)
            }
        })
    } else {
        isDropdownVisible.value = false
    } 
}
</script>
<template>
    <div class="tiptap-drop" :class="isDropdownVisible && 'open'" ref="dropDownRef">
        <div class="tiptap-drop__header" @click="() => toggleDropdownVisibility()">
            <span v-if="title"> {{ title }}</span>
            <span v-else><slot name="header"></slot></span>             
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.83398 8.3335L10.0007 12.5002L14.1673 8.3335H5.83398Z"/>
            </svg>                     
        </div>
        <transition name="fade">
            <div class="tiptap-drop__body" v-if="isDropdownVisible">
                <div class="custom-scroll">
                    <slot></slot>
                </div>           
            </div>
        </transition>
    </div>
</template>