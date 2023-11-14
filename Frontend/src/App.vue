<template>
      <div>
        <!-- 所有vuetify布局要放在v-app/v-layout里面 -->
        <v-app class="bg-cyan-lighten-4">
            <!-- v-main需要放在最后 -->
            <v-main>
                <router-view />
            </v-main>
        </v-app>
    </div>
</template>

<script setup>
</script>
