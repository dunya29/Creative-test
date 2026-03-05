<script setup>
    defineProps({
        item: Object
    })
</script>
<template>
    <div class="info-project__grid">
        <div :class="['item-form item-form--social', `item-form--${el.translitName}`]" v-for="(el, index) in item.data" :key="index">
            <input type="text" :placeholder="el.placeholder" v-model="el.value">
        </div>
    </div>
</template>