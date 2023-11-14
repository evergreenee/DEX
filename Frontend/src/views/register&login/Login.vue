<template>
    <div>
        <Register_Login :title="title" :content="content" :img="img" :routes="routes" :type="type" />
    </div>
</template>

<script setup>
import Register_Login from '@/components/register&login/Register&Login.vue';


const title = '登录'
const content = '使用私钥连接交易所'
const routes = []
const type = 'Login'

</script>

<style lang="scss" scoped></style>