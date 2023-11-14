<template>
    <div>
        <v-card color="transparent">
            <v-row dense>
                <v-col v-for="(route, index) in routes" :key="index" cols="12" sm="6" md="4">
                    <v-hover>
                        <template v-slot:default="{ isHovering, props }">
                            <v-card v-bind="props" 
                            :color="isHovering ? 'primary' : 'secondary'" 
                            :elevation="isHovering ? 2 : 16"
                            class="pt-2">
                                <v-card-title class="text-center">
                                    {{ route.name }}
                                </v-card-title>
                                <v-card-actions>
                                    <v-btn block size="small" variant="outlined" :to="route.path">Learn more</v-btn>
                                </v-card-actions>
                            </v-card>
                        </template>
                    </v-hover>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script setup>
    defineProps({
        routes: {
            type: Array,
            default: () => []
        }
    })
</script>

<style lang="scss" scoped>

</style>