<template>
    <div>
        <v-parallax :src="img" cover width="100%" :height="height" @dragstart.prevent>
            <v-container class="fill-height" fluid>
                <v-row no-gutters class="text-white fill-height">
                    <!-- 标题和介绍 -->
                    <v-col align-self="center" :cols="4" offset="1">
                        <h1 class="text-left text-h2 font-weight-bold text-uppercase ">
                            {{ title }}
                        </h1>
                        <v-divider></v-divider>
                        <br>
                        <p class="text-left text-h5 ">
                            {{ content }}
                        </p>
                    </v-col>

                    <!-- 登录/注册 -->
                    <v-col align-self="center" v-show="show" :cols="4" offset="1">
                        <LoginBox v-if="(type=='Login')"/>
                        <RegisterBox v-else/>
                    </v-col>
                </v-row>
            </v-container>
        </v-parallax>
    </div>
</template>

<script setup>
import RegisterBox from '@/components/register&login/RegisterBox.vue';
import LoginBox from '@/components/register&login/LoginBox.vue';

defineProps({
    title: {
        type: String,
        default: '这是一个标题'
    },
    content: {
        type: String,
        default: '这是内容'
    },
    img: {
        type: String,
        default: '/static/test.png'
    },
    routes: {
        type: Array,
        default: () => []
    },
    show: {
        type: Boolean,
        default: true
    },
    type: {
        type: String,
        default: 'Login'
    }
})

//获取当前窗口高度
const height = window.innerHeight

</script>

<style lang="scss" scoped></style>