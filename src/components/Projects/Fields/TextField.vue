<script setup>
    defineProps({
        item: Object
    })
</script>
<template>
    <div :class="['item-form', item.error && 'error']">

        <input
            :type="item.type || 'text'"
            :placeholder="item.placeholder"
            v-model="item.value" />

        <span v-if="item.error" data-error>
            {{ item.errorTxt }}
        </span>

    </div>
</template>
