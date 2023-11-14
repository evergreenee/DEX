<template>
    <div>
        <v-sheet color="transparent">
            <v-container class="fill-height" fluid>
                <v-row class="pa-0 mt-n4" no-gutters>
                    <v-col cols="8" offset="2" align-self="center">
                        <v-card :height="height*0.3" color="transparent" flat/>
                        <v-card width="100%" color="transparent" flat>
                            <v-hover v-slot="{ isHovering, props }">
                                <v-card v-bind="props" :elevation="isHovering ? 24 : 12" class="mx-auto pa-6 mb-16">
                                    当前登录：{{ publicKey }}
                                </v-card>
                                <v-card v-bind="props" :elevation="isHovering ? 24 : 3" v-for="(item, i) in items" :key="i"
                                    class="mx-auto my-3 pa-6">
                                    {{ item.headline + ": " + item.value }}
                                </v-card>
                            </v-hover>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-sheet>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/store/userStore';

const height = ref(window.innerHeight);
const userStore = useUserStore();
const publicKey = ref(userStore.publicKey);

const items = [
    {
        headline: 'REV地址',
        value: userStore.revAddr
    },
    {
        headline: 'REV余额',
        value: userStore.balance
    },
    {
        headline: 'Bullet余额',
        value: userStore.bulletBalance
    }
];

</script>

<style lang="scss" scoped></style>