<script setup>
    defineProps({
        item: Object
    })
    const phoneMask = (event, item) => {
        let value =
            event.target.value[0] === '+'
                ? event.target.value.replace(/\D/g, '').substring(1)
                : event.target.value.replace(/\D/g, '')
        if (value.length > 0) {
            value =
                '+7 ' +
                value.substring(0, 3) +
                (value.length > 3 ? '-' : '') +
                value.substring(3, 6) +
                (value.length > 6 ? '-' : '') +
                value.substring(6, 8) +
                (value.length > 8 ? '-' : '') +
                value.substring(8, 10)
        }
        if (value.length === 0) {
            value = ''
        }
        event.target.value = value.substring(0, 16)
        item.value = value.substring(0, 16)
    }
</script>
<template>
    <div :class="['item-form', item.error && 'error']">
        <input
            type="text"
            placeholder="+7"
            :value="item.value"
            maxlength="16"
            @input="e => phoneMask(e, item)" />
        <span v-if="item.error" data-error>
            {{ item.errorTxt }}
        </span>

    </div>
</template>
