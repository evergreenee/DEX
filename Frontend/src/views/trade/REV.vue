<template>
    <div>
        <v-sheet :height="height" color="transparent">
            <v-container class="fill-height">
                <v-row>
                    <v-col align-self="center" cols="4" offset="4">
                        <v-row no-gutters>
                            <v-col cols="12">
                                <!-- <v-text-field clearable label="REV地址"></v-text-field> -->
                                <v-text-field clearable label="REV地址" v-model="revAddr"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols="12">
                                <!-- <v-text-field clearable label="数量"></v-text-field> -->
                                <v-text-field clearable label="数量" v-model="amount"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <!-- <v-btn block>交易</v-btn> -->
                                <v-btn block @click="trade">交易</v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </v-sheet>
    </div>
</template>

<script setup>

import { ref } from 'vue';
import { post } from '@/utils/request';
import { useUserStore } from '@/store/userStore';
const height = window.innerHeight;
const userStore = useUserStore();
const fromRevAddr = ref(userStore.revAddr);
const revAddr = ref('');
const amount = ref('');

function trade(){
    post(
        '/trans',
        {
            from: fromRevAddr.value,
            to: revAddr.value,
            amount: amount.value
        },
    ).then(res => {
        alert("交易已完成!");
    })
}

</script>

<style lang="scss" scoped></style>