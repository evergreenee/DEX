<template>
    <div>
        <v-sheet color="transparent">
            <v-row>
                <v-col>
                    <v-text-field clearable label="PublicKey" v-model="publicKey"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field clearable label="PrivateKey" v-model="privateKey"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn cols="4" @click="register">Register</v-btn>
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

// const userStore = useUserStore();
const privateKey = ref("");
const publicKey = ref("");
const ec = new elliptic.ec('secp256k1');

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