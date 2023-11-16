<template>
    <div>
        <v-sheet color="transparent">

            <v-row v-for="(item, index) in items" :key="index">
                <v-col>
                    <v-row>
                        <v-col cols="10">
                            <v-text-field readonly :label="item.label" v-model="item.textValue" />
                        </v-col>
                        <v-col cols="2">
                            <CopyBtn :textValue="item.textValue" />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-btn cols="4" @click="register">Generate</v-btn>
                </v-col>
                <v-col cols="4" offset="4">
                    <v-btn variant="text" to="/identify/login">
                        已有账号？跳转登录
                    </v-btn>
                </v-col>
            </v-row>

        </v-sheet>
    </div>
</template>

<script setup>
import { ref } from "vue";
// import { useUserStore } from "@/store/userStore";
import elliptic from 'elliptic';
import CopyBtn from '@/components/CopyBtn.vue';

// const userStore = useUserStore();
const publicKey = ref(null);
const privateKey = ref(null);
const ec = new elliptic.ec('secp256k1');

const items = ref([
    {
        label: "PublicKey",
        textValue: publicKey,
    },
    {
        label: "PrivateKey",
        textValue: privateKey,
    }
]);

function register() {
    try {
        const keyPair = ec.genKeyPair();
        const publicKeyString = keyPair.getPublic().encode('hex');
        const privateKeyString = keyPair.getPrivate('hex');

        publicKey.value = publicKeyString;
        privateKey.value = privateKeyString;

    } catch (error) {
        console.error("Error generating key pair:", error);
    }
}

</script>

<style lang="scss" scoped></style>