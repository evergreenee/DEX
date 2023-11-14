<template>
    <div>
        <v-sheet :height="height" color="transparent">
            <v-container class="fill-height">
                <v-row>
                    <v-col align-self="center" cols="4" offset="4">
                        <v-row no-gutters>
                            <v-col cols="7">
                                <v-text-field clearable label="You pay" v-model="payAmount"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-select v-model="selectPay" clearable chips label="token" :items="filterdItems1"></v-select>
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols="7">
                                <v-text-field clearable label="You get" v-model="getAmount"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-select v-model="selectGet" clearable chips label="token" :items="filterdItems2"></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-btn block @click="exchange">兑换</v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </v-sheet>
    </div>
</template>

<script setup>
import { ref, watch, nextTick, computed } from 'vue';
import { post } from '@/utils/request';

const selectPay = ref(null);
const selectGet = ref(null);
const items = ref(['REV','Bullet']);
const payAmount = ref('');
const getAmount = ref('');

const filterdItems1 = computed(() => {
    return items.value.filter((item) => item !== selectGet.value);
});
const filterdItems2 = computed(() => {
    return items.value.filter((item) => item !== selectPay.value);
});

watch(selectPay, (val) => {
    // if (val.length > 5) {
    //     nextTick(() => model.pop());
    // }
    console.log("selectPay:" + val);
});

const height = window.innerHeight;

function exchange(){
    post(
        '/exchange',
        {
            pay: selectPay.value,
            get: selectGet.value,
            amount: payAmount.value
        },
    ).then(res => {
        alert("兑换已完成!");
    })
}

</script>

<style lang="scss" scoped></style>