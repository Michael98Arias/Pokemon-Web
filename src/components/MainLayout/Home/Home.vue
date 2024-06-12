<template>
    <q-page class="fullscreen-page " style="background-color: #f9f9f9;">
        
        <div class="text-h5 text-bold text-center">
            <div style="font-size: 3vh">
              <img :src="Index" style="max-width: 300px">
            </div>
            {{ $t('mainLayout.title') }}
            <div class="q-mt-md text-body1 text-center q-gutter-md q-col-gutter-md">
                <!-- {{ $t('mainLayout.text') }} -->
            </div>
            <div class="q-ma-md text-body1 text-center" style="max-width: 600px; margin-left: auto; margin-right: auto;">
                {{ $t('mainLayout.text') }}
            </div>

                <q-btn class="q-pa-md m" rounded dense color="red" :label="$t('mainLayout.labelButton')" to="/ItemList"/>

        </div>
    </q-page>
</template>

<script setup lang="ts">
import Index from '/index.jpg'

defineOptions({
    name: 'ItemList'
});


</script>

<style lang="scss">
.fullscreen-page {
    display: flex;
    justify-content: center;
    align-items: center;
}



</style>