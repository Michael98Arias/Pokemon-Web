<script setup lang="ts">

import { computed, reactive, ref } from 'vue';
import pokebola from '/icons/pokebola.png'

defineOptions({
    name: 'ItemList'

});

const dataItemListPage = reactive({
    loadingC: false,
    search: ''
});
const dataList = ref([
    { name: 'Bulbasaur', icon: 'grass', favorite: true },
    { name: 'Ivysaur', icon: 'grass', favorite: false },
    { name: 'Venusaur', icon: 'grass', favorite: false },
    { name: 'Charmander', icon: 'fire', favorite: true },
])

const filteredList = computed(() => {
    return dataList.value.filter(item => {
        return item.name.toLowerCase().includes(dataItemListPage.search.toLowerCase());
    });
});
</script>

<template>
    <q-page v-show="dataItemListPage.loadingC" class="fullscreen-page">
        <div class="cargando">
            <div>
            </div>
            <div class="balls "><img :src="pokebola"></div>
            <div class="balls "><img :src="pokebola"></div>
            <div class="balls "><img :src="pokebola"></div>
        </div>
    </q-page>
    <q-page class="fullscreen-page" style="background-color: #f9f9f9;" v-show="!dataItemListPage.loadingC">

        <div class="q-ma-lg q-pt-md" style="background-color: #ffffff;">
            <q-input class="q-ma-lg q-pt-md" outlined debounce="400" color="red" v-model="dataItemListPage.search">
                <template v-slot:prepend>
                    <q-icon name="search" />
                </template>
            </q-input>
            <q-list separator v-if="filteredList.length > 0">
                <q-item v-for="(item, index) in filteredList" :key="index">
                    <q-item-section>
                        <q-item-label>{{ item.name }}</q-item-label>
                    </q-item-section>
                    <q-item-section top side>
                        <div class="text-grey-8 q-gutter-xs">
                            <q-btn class="gt-xs" size="12px" flat dense round icon="star"
                                :color="item.favorite ? 'amber' : 'grey'"></q-btn>
                        </div>
                    </q-item-section>
                </q-item>
            </q-list>
            <q-item v-else>
                <q-item-section>
                    <div class="text-h5 text-bold text-center">
                        {{ $t('mainLayout.itemList.title') }}
                        <div class="q-ma-md text-body1 text-center"
                            style="max-width: 600px; margin-left: auto; margin-right: auto;">
                            {{ $t('mainLayout.itemList.text') }}
                        </div>

                        <q-btn class="q-pa-md m" rounded dense color="red"
                            :label="$t('mainLayout.itemList.labelButton')" to="/" />
                    </div>
                </q-item-section>
            </q-item>
            <q-footer elevated class="bg-grey-8 text-white">
                <div class="buttons">
                    <q-btn color="red" label="All" flat />
                    <q-btn color="primary" label="Favorites" flat />
                </div>
            </q-footer>
        </div>
    </q-page>
</template>

<style lang="scss">
.fullscreen-page {
    display: flex;
    justify-content: center;
    align-items: center;
}

// Style of loading

.cargando {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
    margin: 0 auto;
}

.balls {
    width: 30px;
    height: 30px;
    animation: salto .5s alternate infinite;
    border-radius: 50%;
    margin: 0 30px;

    &:nth-child(2) {
        animation-delay: .18s;
    }

    &:nth-child(3) {
        animation-delay: .37s;
    }
}

@keyframes salto {
    from {
        transform: scaleX(1.25);
    }

    to {
        transform: translateY(-50px) scaleX(1);
    }
}
</style>
