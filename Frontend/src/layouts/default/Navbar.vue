<template>
    <div v-show="props.show">
        <v-navigation-drawer v-model="drawer" :rail="rail" @click="rail = false" permanent :elevation="6" color="primary">
            <v-list nav>
                <v-list-item prepend-icon="mdi-sprout" title="RChain-frontend" nav>
                    <template v-slot:append>
                        <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
                    </template>
                </v-list-item>
    
                <v-divider></v-divider>
    
                <v-list-item nav prepend-icon="mdi-home" title="Home" to="/index/home"></v-list-item>
    
                <v-list-item v-for="(section, index) in sections" :key="index" :prepend-icon="section.icon"
                    :title="section.title" >
                    <!-- :to="section.route" -->
                    
                    <v-menu activator="parent" location="end" open-on-hover theme="secondary">
                        <v-list>
                            <v-list-subheader v-text="section.subheader"></v-list-subheader>
    
                            <v-list-item v-for="(item, i) in section.items" :key="i" :value="item" color="primary" rounded="xl"
                                :to="item.route">
                                <v-list-item-title v-text="item.title"></v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-list-item>
            </v-list>
    
            <template v-slot:append v-if="!rail">
                <div class="pa-2">
                    <v-btn block to="/identify/login">
                        Logout
                    </v-btn>
                </div>
            </template>
    
        </v-navigation-drawer>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
    show: {
        type: Boolean,
        default: true,
    }
})

const drawer = ref(true)
const rail = ref(true)

const tradeItems = [
    //{title: 'p1', route: '/personal/p1'}
    { title: 'exchange', route: '/index/trade/exchange' },
    { title: 'REV', route: '/index/trade/REV' },
]
const visaulItems = [
    { title: 'option1', route: '/resources/fact' },
    { title: 'option2', route: '/resources/data' },
    { title: 'option3', route: '/resources/solution' },
]
const othersItems = [
    { title: 'option1', route: '/others/achievement' },
    { title: 'option2', route: '/others/compaign' },
    { title: 'option3', route: '/others/web' },
]

const sections = [
    {
        icon: 'mdi-account',
        title: 'Trade',
        route: '/trade',
        subheader: '小标题',
        items: tradeItems
    },
    {
        icon: 'mdi-database-eye-outline',
        title: 'Resources',
        route: '/resources',
        subheader: '小标题',
        items: visaulItems
    },
    {
        icon: 'mdi-account-group',
        title: 'What others do',
        route: '/others',
        subheader: '小标题',
        items: othersItems
    },
]

</script>

<style lang="scss" scoped></style>