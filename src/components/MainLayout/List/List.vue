<script setup lang="ts">

import { computed, onMounted, reactive } from 'vue';
import pokebola from '/icons/pokebola.png';
import ListApi from './ListApi';
import { ListInitial, DataList, Result } from './interfaces/List';

defineOptions({
    name: 'ItemList'
});
onMounted(() => {
    ListInitialC()
});
const dataItemListPage = reactive({
    loadingC: false,
    searchAll: '',
    searchFavorite: '',
    dataAll: [] as DataList[],
    dataFavorite: [] as DataList[],
    listOption: 'All' as 'All' | 'Favorite',
});
const ListInitialC = async () => {
    dataItemListPage.loadingC = true
    dataItemListPage.dataAll = []
    dataItemListPage.dataFavorite = []
    try {
        const response: ListInitial = await ListApi.ListInitialApi()
        dataItemListPage.dataAll = getListingData(response.results);
        console.log('response->', response.results)
    } catch (e) {
        if (e instanceof Error) {
            if ('statusCode' in e) {
                console.log('error', e.statusCode);
            } else {
                console.log('error', e.message);
            }
        } else {
            console.error('Unexpected error:', e);
        }
        dataItemListPage.loadingC = false
    } finally {
        dataItemListPage.loadingC = false
    }
}
function getListingData(results: Result[]): DataList[] {
    return results.map(result => ({
        name: result.name,
        url: result.url,
        favorite: false
    }));
}
function toggleFavorite(item: DataList) {
    item.favorite = !item.favorite;

    const index = dataItemListPage.dataFavorite.findIndex(fav => fav.name === item.name);

    if (item.favorite && index === -1) {
        dataItemListPage.dataFavorite.push(item);
    } else if (!item.favorite && index !== -1) {
        dataItemListPage.dataFavorite.splice(index, 1);
    }
}

function getFavoriteColor(isFavorite: boolean): string {
    return isFavorite ? 'amber' : 'grey';
}

const updateListOption = (option: 'All' | 'Favorite') => {
    dataItemListPage.listOption = option;
};
const filteredListAll = computed(() => {
    return dataItemListPage.dataAll.filter(item => {
        return item.name.toLowerCase().includes(dataItemListPage.searchAll.toLowerCase());
    });
});
const filteredListFavorite = computed(() => {
    return dataItemListPage.dataFavorite.filter(item => {
        return item.name.toLowerCase().includes(dataItemListPage.searchFavorite.toLowerCase());
    });
});
</script>

<template >
    <q-layout view="lHh Lpr lFf">
        <q-page v-show="dataItemListPage.loadingC" class="fullscreen-page">
            <div class="cargando">
                <div>
                </div>
                <div class="balls "><img :src="pokebola"></div>
                <div class="balls "><img :src="pokebola"></div>
                <div class="balls "><img :src="pokebola"></div>
            </div>
        </q-page>
        <q-page class="fullscreen-page-list " style="background-color: #f9f9f9;" v-show="!dataItemListPage.loadingC">
            <div class="q-ma-sm q-pt-sm" style="width: 50%;">
                <div v-if="dataItemListPage.listOption == 'All'" style="background-color: #ffffff;">
                    <q-input class="q-ma-lg q-pt-md" outlined debounce="400" color="red"
                        v-model="dataItemListPage.searchAll" :label="$t('mainLayout.itemList.labelSearch')">
                        <template v-slot:prepend>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                    <q-list separator v-if="filteredListAll.length > 0">
                        <q-item v-for="(item, index) in filteredListAll" :key="index">
                            <q-item-section>
                                <q-item-label class="text-capitalize">{{ item.name }}</q-item-label>
                            </q-item-section>
                            <q-item-section top side>
                                <div class="text-grey-8 q-gutter-xs">
                                    <q-btn class="gt-xs" size="12px" flat dense round icon="star"
                                        :color="getFavoriteColor(item.favorite)" @click="toggleFavorite(item)">
                                    </q-btn>
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
    
                                <q-btn class="q-pa-sm m" rounded dense color="red"
                                    :label="$t('mainLayout.itemList.labelButton')" to="/" />
                            </div>
                        </q-item-section>
                    </q-item>
                </div>
                <div v-if="dataItemListPage.listOption == 'Favorite'"
                    style="background-color: #ffffff;">
                    <q-input class="q-ma-lg q-pt-md" outlined
                        debounce="400" color="red" v-model="dataItemListPage.searchFavorite" :label="$t('mainLayout.itemList.labelSearch')">
                        <template v-slot:prepend>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                    <q-list separator v-if="filteredListFavorite.length > 0">
                        <q-item v-for="(item, index) in filteredListFavorite" :key="index">
                            <q-item-section v-if="item.favorite">
                                <q-item-label class="text-capitalize">{{ item.name }}</q-item-label>
                            </q-item-section>
                            <q-item-section top side v-if="item.favorite">
                                <div class="text-grey-8 q-gutter-xs">
                                    <q-btn class="gt-xs" size="12px" flat dense round icon="star"
                                        :color="getFavoriteColor(item.favorite)" @click="toggleFavorite(item)">
                                    </q-btn>
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
    
                                <q-btn class="q-pa-sm m" rounded dense color="red"
                                    :label="$t('mainLayout.itemList.labelButton')" to="/" />
                            </div>
                        </q-item-section>
                    </q-item>
                </div>
                <q-footer v-if="filteredListAll.length > 0 || filteredListFavorite.length > 0"
                    style="background-color: #ffffff;">
                    <div class="row q-ma-md justify-center ">
                        <div class="col-12 col-md-2">
                        </div>
                        <div class="col-12 col-md-auto">
                            <q-btn class="q-mx-lg" rounded icon="list"
                                :color="dataItemListPage.listOption == 'All' ? 'red' : 'grey'" :label="$t('mainLayout.itemList.labelButtonAll')"
                                @click="updateListOption('All')" style="width: 232px;"/>
                            <q-btn class="q-mx-lg" rounded icon="star"
                                :color="dataItemListPage.listOption == 'Favorite' ? 'red' : 'grey'" :label="$t('mainLayout.itemList.labelButtonFavorite')"
                                @click="updateListOption('Favorite')" style="width: 232px;"/>
                        </div>
                        <div class="col-12 col-md-2">
    
                        </div>
                    </div>
                </q-footer>
            </div>
        </q-page>
    </q-layout>
</template>

<style lang="scss">
.fullscreen-page {
    display: flex;
    justify-content: center;
    align-items: center;
}
.fullscreen-page-list {
    display: flex;
    justify-content: center;
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
