<template>
    <div>
        <v-container>
            <v-btn @click="getMyHandle">发送封装的get请求</v-btn>
            <v-btn @click="postMyHandle">发送封装的post请求</v-btn>
        </v-container>
    </div>
</template>

<script setup>
import axios from 'axios';
import { get, post } from '@/utils/request';

// 这个是测试网络请求用的  


function getMyHandle() {
    get(
        '/getTest',
        {
            // id: [1, 2, ],
        },
        {
            headers: {
                'Content-Type': 'application/plain'
            }
        },
    ).then(res => {
        console.log(res);
    })
}

function postMyHandle() {
    // 三个参数：url、data、config
    const privateKey = "your_private_key";

    post(
        '/login',
        {
            privateKey: privateKey
        },
    ).then(res => {
        if (res.data.valid) {
            console.log('Private key is valid');
        } else {
            console.log('Private key is not valid');
        }
    }).catch(err => {
        console.log(err);
    })
}

</script>

<style lang="scss" scoped></style>