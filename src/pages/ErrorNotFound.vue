<template>
  <div class="fullscreen bg-red text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        <img :src="Place">
      </div>

      <div class="text-h2" style="opacity:.4">
        {{ $t('error.notFound') }}
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="red"
        unelevated
        to="/"
        :label="$t('error.labelButton')"
        no-caps
      />
    </div>
  </div>
</template>

<script setup lang="ts">

import Place from '/icons/place.png'
defineOptions({
  name: 'ErrorNotFound'
});
</script>
