<script setup>
    defineProps({
        item: Object
    })
</script>
<template>
    <div :class="['item-form', item.error && 'error']">
        <input
            type="number"
            pattern="[0-9]*"
            inputmode="decimal"
            :placeholder="item.placeholder"
            v-model="item.value" />

        <span v-if="item.error" data-error>
            {{ item.errorTxt }}
        </span>

    </div>
</template>