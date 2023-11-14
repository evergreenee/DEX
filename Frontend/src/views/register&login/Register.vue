<template>
    <div>
        <Register_Login :title="title" :content="content" :img="img" :routes="routes" :type="type" />
    </div>
</template>

<script setup>
import Register_Login from '@/components/register&login/Register&Login.vue';


const title = '注册'
const content = '生成公钥与私钥'
const routes = []
const type = 'Register'

</script>

<style lang="scss" scoped></style>