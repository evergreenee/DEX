<template>
    <div>
        <v-sheet color="transparent" :height="height">
            <v-container class="fill-height" fluid>
                <v-row>
                    <v-col cols="8" offset="2" align-self="center">
                        <v-row>
                            <v-col v-for="(card, i) in cards" :key="i" :cols="card.flex">
                                <v-card class="mx-auto" color="#36393f" theme="dark"
                                    variant="flat" :height="card.height">
                                    <v-sheet color="#202225">
                                        <v-card-item>
                                            <template v-slot:prepend>
                                                <v-card-title>
                                                    {{ card.title }}
                                                </v-card-title>
                                            </template>

                                            <v-divider vertical class="mx-2"></v-divider>

                                            <template v-slot:append>
                                                <CopyBtn :text-value="card.text" v-show="card.show"/>
                                            </template>
                                        </v-card-item>
                                    </v-sheet>

                                    <v-card class="ma-4" color="#2f3136" rounded="lg" variant="flat">
                                        <v-card-item>
                                            <div class="py-2">
                                                <div class="font-weight-light text-medium-emphasis">
                                                    {{ card.text }}
                                                </div>
                                            </div>
                                        </v-card-item>
                                    </v-card>
                                </v-card>
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
import { useUserStore } from '@/store/userStore';
import CopyBtn from '@/components/CopyBtn.vue';

const height = ref(window.innerHeight);
const userStore = useUserStore();

const cards = [
    {
        title: '当前登录',
        text: userStore.publicKey,
        // text: '0409a3b2960e782b093655cfe564d89652a7496c02a98678a7e0bd79edd484f0cc8064ef4e59a8c799736b348901fbc76ea89a33494e8940905154afg',
        flex: 12,
        height: 200,
        show: true
    },
    {
        title: 'REV地址',
        text: userStore.revAddr,
        // text: ':1111MOmaMriDi9BEYdPAy1YWaP73t69nGVancWkG1Myki1osL48vW',
        flex: 6,
        height: 200,
        show: true
    },
    {
        title: 'REV余额',
        text: userStore.balance,
        // text: '1000',
        flex: 3,
        height: 175,
        show: true
    },
    {
        title: 'Bullet余额',
        text: userStore.bulletBalance,
        flex: 3,
        height: 175,
        show: true
    },
    {
        title: 'NEC余额',
        text: userStore.necBalance,
        flex: 3,
        height: 175,
        show: true
    },
];

</script>

<style lang="scss" scoped></style>