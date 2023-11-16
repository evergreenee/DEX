<template>
    <div>
        <v-btn :icon="copied ? icon2 : icon1" color="transparent" flat @click="copyText" />
    </div>
</template>

<script setup>
import { ref } from 'vue';

const icon1 = "mdi-content-copy";
const icon2 = "mdi-check";
const copied = ref(false);

const props = defineProps({
    textValue: {
        type: String,
    }
});

function copyText() {
    navigator.clipboard.writeText(props.textValue);

    copied.value = true;
    setTimeout(() => {
        copied.value = false;
    }, 1000);
}
</script>

<style lang="scss" scoped></style>