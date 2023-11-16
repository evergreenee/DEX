<template>
    <div>
        <v-sheet color="transparent">
            <v-row>
                <v-col>
                    <v-text-field clearable label="PrivateKey" v-model="privateKey" />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    <v-btn @click="login" :loading="loading">
                        Login
                    </v-btn>
                </v-col>
                <v-col cols="4" offset="4">
                    <v-btn variant="text" to="/identify/register">
                        还没有账号？立即注册
                    </v-btn>
                </v-col>
            </v-row>
        </v-sheet>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { post } from '@/utils/request';
import router from '@/router';
import { useUserStore } from '@/store/userStore';

const userStore = useUserStore();
const privateKey = ref('');
const loading = ref(false);

function login() {
    loading.value = true;
    post(
        '/login',
        {
            privateKey: privateKey.value
        },
    ).then(res => {
        userStore.$patch({
            privateKey: privateKey.value,
            publicKey: res.data.publicKey,
            balance: res.data.balance,
            revAddr: res.data.addr,
            bulletBalance: res.data.bulletBalance,
        });

        console.log(res.data);
        router.push('/index/home');
    }).catch(err => {
        console.log(err);
    })

}

</script>

<style lang="scss" scoped></style>