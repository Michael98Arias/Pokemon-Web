<script setup lang="ts">
import Index from '/images/index.jpg'
import { useAuthStore } from '../../../stores/data-store';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const authStore = useAuthStore();
defineOptions({
    name: 'HomeC'
});
const router = useRouter();
// Update authenticated store to protect route
onMounted(() => {
    deauthenticateStore(false)
});
const authenticatedStore = async (state: boolean) => {
    authStore.authenticated(state);
    router.push('/ItemList');
}
const deauthenticateStore = async (state: boolean) => {
    authStore.deauthenticate(state);
}
</script>

<template>
    <q-page class="fullscreen-page " style="background-color: #f9f9f9;">

        <div class="text-h5 text-bold text-center">
            <div style="font-size: 3vh">
                <img :src="Index" style="max-width: 300px">
            </div>
            {{ $t('mainLayout.home.title') }}
            <div class="q-ma-md text-body1 text-center"
                style="max-width: 600px; margin-left: auto; margin-right: auto;">
                {{ $t('mainLayout.home.text') }}
            </div>

            <q-btn class="q-pa-sm" rounded dense color="red" :label="$t('mainLayout.home.labelButton')"
                @click="authenticatedStore(true)" />

        </div>
    </q-page>
</template>

<style lang="scss">
.fullscreen-page {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>