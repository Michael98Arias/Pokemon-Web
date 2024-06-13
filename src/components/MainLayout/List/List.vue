<script setup lang="ts">

import bug from '/images/bug.jpg'
import fire from '/images/fire.jpg'
import grass from '/images/grass.jpg'
import normal from '/images/normal.jpg'
import water from '/images/water.jpg'
import { computed, onMounted, reactive } from 'vue';
import pokebola from '/icons/pokebola.png';
import ListApi from './ListApi';
import { ListInitial, DataList, Result, DataItem, RelevantData, StatRow } from './interfaces/List';
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar';

defineOptions({
    name: 'ItemList'
});
onMounted(() => {
    ListInitialC()
});
type PokemonType = 'bug' | 'fire' | 'grass' | 'normal' | 'water';
const dataItemListPage = reactive({
    $q: useQuasar(),
    loadingC: false,
    searchAll: '',
    searchFavorite: '',
    dataAll: [] as DataList[],
    dataFavorite: [] as DataList[],
    dataItemTemp: [] as DataList[],
    listOption: 'All' as 'All' | 'Favorite',
    dialogItem: false,
    relevantData: [] as RelevantData[],
    types: [],
    bg: 'fire' as PokemonType,
    thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#e30202',
        width: '5px',
        opacity: 0.75
    },

    barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#e30202',
        width: '9px',
        opacity: 0.2
    },
    iconType: '',
    iconColor: '',
    expandedTableStats: false,
    rowsStats: [] as StatRow[]
});

const { t } = useI18n()
const columnsStats = [
    { name: 'name', required: true, label: t('mainLayout.itemList.dataCard.columnStats.labelName'), align: 'left', field: 'name', sortable: true },
    { name: 'base_stat', align: 'center', label: t('mainLayout.itemList.dataCard.columnStats.labelBaseStat'), field: 'base_stat', sortable: true },
    { name: 'effort', align: 'center', label: t('mainLayout.itemList.dataCard.columnStats.labelEffort'), field: 'effort', sortable: true },
];
const ListInitialC = async () => {
    dataItemListPage.loadingC = true
    dataItemListPage.dataAll = []
    dataItemListPage.dataFavorite = []
    try {
        const response: ListInitial = await ListApi.ListInitialApi()
        dataItemListPage.dataAll = getListingData(response.results);
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
const DataItemC = async (dataR: DataList) => {
    dataItemListPage.loadingC = true
    dataItemListPage.dialogItem = true
    dataItemListPage.dataItemTemp = []
    dataItemListPage.dataItemTemp = dataR
    try {
        const response: DataItem = await ListApi.DataItemApi(dataR.name)
        await organizeRelevantData(response);
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
const organizeRelevantData = async (dataResponse: DataItem) => {
    dataItemListPage.relevantData.id = dataResponse.id
    dataItemListPage.relevantData.name = dataResponse.name
    dataItemListPage.relevantData.base_experience = dataResponse.base_experience
    dataItemListPage.relevantData.height = dataResponse.height
    dataItemListPage.relevantData.weight = dataResponse.weight
    dataItemListPage.relevantData.sprite = dataResponse.sprites.other?.dream_world.front_default
    dataItemListPage.relevantData.types = extractTypeNames(dataResponse.types)
    dataItemListPage.relevantData.abilities = extractAbilitiesNames(dataResponse.abilities)
    dataItemListPage.relevantData.stats = dataResponse.stats
    dataItemListPage.rowsStats = extractStatsData(dataItemListPage.relevantData.stats)
    validateType(dataResponse.types[0].type.name)
    dataItemListPage.bg = dataResponse.types[0].type.name || 'fire'
}
function extractTypeNames(data: []): string {
    if (!data || !data || !Array.isArray(data)) {
        return '';
    }
    return [...new Set(data.map(item => item.type.name))].join(',');
}
function extractAbilitiesNames(data: []): string {
    if (!data || !data || !Array.isArray(data)) {
        return '';
    }
    return [...new Set(data.map(item => item.ability.name))].join(',');
}
function extractStatsData(data: []): StatRow {
    return data.map(item => ({
        base_stat: item.base_stat,
        effort: item.effort,
        name: item.stat.name
    }));
}
function validateType(name: string) {
    switch (name) {
        case 'fire':
            dataItemListPage.iconType = 'local_fire_department';
            dataItemListPage.iconColor = 'amber';
            break;
        case 'bug':
            dataItemListPage.iconType = 'bug_report';
            dataItemListPage.iconColor = 'brown';
            break;
        case 'water':
            dataItemListPage.iconType = 'water_drop';
            dataItemListPage.iconColor = 'blue';
            break;
        case 'grass':
            dataItemListPage.iconType = 'grass';
            dataItemListPage.iconColor = 'green';
            break;
        case 'normal':
            dataItemListPage.iconType = 'forest';
            dataItemListPage.iconColor = 'green';
            break;
        default:
            dataItemListPage.iconType = 'check_circle';
            dataItemListPage.iconColor = 'green';
            break;
    }
}
const typeBackgrounds = {
    bug,
    fire,
    grass,
    normal,
    water,
};
const cardSectionStyle = computed(() => ({
    backgroundImage: `url(${typeBackgrounds[dataItemListPage.bg as PokemonType] || ''})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}));
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
const transformDataToString = (data: RelevantData) => {
    const statsString = data.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ');
    return `name: ${data.name}, abilities: ${data.abilities}, base_experience: ${data.base_experience}, height: ${data.height}, id: ${data.id}, sprite: ${data.sprite}, stats: ${statsString}, types: ${data.types}, weight: ${data.weight}`;
};
const copyToClipboard = async () => {
    const dataString = transformDataToString(dataItemListPage.relevantData);
    try {
        await navigator.clipboard.writeText(dataString);
        dataItemListPage.$q.notify({
            message: t('mainLayout.itemList.dataCard.textCopied'),
            color: 'green-4',
            textColor: 'white',
            icon: 'done',
            position: 'top-right',
            actions: [{ label: 'OK', color: 'white'}],
            timeout: 5000
        });
    } catch (err) {
        dataItemListPage.$q.notify({
            message: t('mainLayout.itemList.dataCard.textCopiedFailed'),
            color: 'red-5',
            textColor: 'white',
            icon: 'error'
        });
        console.error('Failed to copy text: ', err);
    }
};

</script>

<template>
    <q-layout view="lHh Lpr lFf">
        <q-page v-show="dataItemListPage.loadingC" class="fullscreen-page">
            <div class="charging">
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
                        <q-item clickable v-ripple v-for="(item, index) in filteredListAll" :key="index">
                            <q-item-section @click="DataItemC(item)">
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
                <div v-if="dataItemListPage.listOption == 'Favorite'" style="background-color: #ffffff;">
                    <q-input class="q-ma-lg q-pt-md" outlined debounce="400" color="red"
                        v-model="dataItemListPage.searchFavorite" :label="$t('mainLayout.itemList.labelSearch')">
                        <template v-slot:prepend>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                    <q-list separator v-if="filteredListFavorite.length > 0">
                        <q-item clickable v-ripple v-for="(item, index) in filteredListFavorite" :key="index">
                            <q-item-section @click="DataItemC(item)">
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
                <q-dialog v-model="dataItemListPage.dialogItem" persistent position="top">
                    <q-card style="top: 150px;width: 550px; height: auto">
                        <q-card-section :style="cardSectionStyle">
                            <div class="row items-center q-pb-none">
                                <q-space />
                                <q-btn icon="close" round dense color="white" text-color="black" v-close-popup />
                            </div>
                            <div class="q-ma-auto q-pa-sm" style="text-align: center;">
                                <img class="items-center" :src="dataItemListPage.relevantData.sprite" alt=""
                                    style="width: 200px; height: 200px;">
                            </div>
                        </q-card-section>
                        <q-card-section>
                            <q-scroll-area :thumb-style="dataItemListPage.thumbStyle"
                                :bar-style="dataItemListPage.barStyle" style="height: 200px; max-width: 550px;">
                                <q-list class="text-capitalize">
                                    <q-item>
                                        <q-item-section>
                                            <q-item-label>{{ $t('mainLayout.itemList.dataCard.labelName')
                                                }}</q-item-label>
                                            <q-item-label caption lines="2">
                                                {{ dataItemListPage.relevantData.name }}
                                            </q-item-label>
                                        </q-item-section>

                                        <q-item-section side top>
                                            <q-icon name="badge" color="red" />
                                        </q-item-section>
                                    </q-item>

                                    <q-separator spaced inset />

                                    <q-item>
                                        <q-item-section>
                                            <q-item-label>{{ $t('mainLayout.itemList.dataCard.labelBaseExperience')
                                                }}</q-item-label>
                                            <q-item-label caption lines="2">
                                                {{ dataItemListPage.relevantData.base_experience }}
                                            </q-item-label>
                                        </q-item-section>

                                        <q-item-section side top>
                                            <q-icon name="bolt" color="amber" />
                                        </q-item-section>
                                    </q-item>

                                    <q-separator spaced inset />

                                    <q-item>
                                        <q-item-section>
                                            <q-item-label>{{ $t('mainLayout.itemList.dataCard.labelHeight')
                                                }}</q-item-label>
                                            <q-item-label caption lines="2">
                                                {{ dataItemListPage.relevantData.height }}
                                            </q-item-label>
                                        </q-item-section>

                                        <q-item-section side top>
                                            <q-icon name="height" color="black" />
                                        </q-item-section>
                                    </q-item>

                                    <q-separator spaced inset />

                                    <q-item>
                                        <q-item-section>
                                            <q-item-label>{{ $t('mainLayout.itemList.dataCard.labelWeight')
                                                }}</q-item-label>
                                            <q-item-label caption lines="2">
                                                {{ dataItemListPage.relevantData.weight }}
                                            </q-item-label>
                                        </q-item-section>

                                        <q-item-section side top>
                                            <q-icon name="scale" color="black" />
                                        </q-item-section>
                                    </q-item>

                                    <q-separator spaced inset />

                                    <q-item>
                                        <q-item-section>
                                            <q-item-label>{{ $t('mainLayout.itemList.dataCard.labelTypes')
                                                }}</q-item-label>
                                            <q-item-label caption lines="2">
                                                {{ dataItemListPage.relevantData.types }}
                                            </q-item-label>
                                        </q-item-section>

                                        <q-item-section side top>
                                            <q-icon :name="dataItemListPage.iconType"
                                                :color="dataItemListPage.iconColor" />
                                        </q-item-section>
                                    </q-item>

                                    <q-separator spaced inset />

                                    <q-item>
                                        <q-item-section>
                                            <q-item-label>{{ $t('mainLayout.itemList.dataCard.labelAbilities')
                                                }}</q-item-label>
                                            <q-item-label caption lines="10">
                                                {{ dataItemListPage.relevantData.abilities }}
                                            </q-item-label>
                                        </q-item-section>

                                        <q-item-section side top>
                                            <q-icon name="self_improvement" color="green" />
                                        </q-item-section>
                                    </q-item>

                                    <q-separator spaced inset />

                                    <q-item>
                                        <q-item-section>
                                            <q-item-label>{{ $t('mainLayout.itemList.dataCard.labelStats')
                                                }}</q-item-label>
                                            <q-item-label caption>
                                                <q-expansion-item popup default-opened
                                                    v-model="dataItemListPage.expandedTableStats" icon="bar_chart"
                                                    header-class="text-green">
                                                    <q-card>
                                                        <q-card-section>
                                                            <q-table :rows="dataItemListPage.rowsStats"
                                                                :columns="columnsStats" row-key="name" />
                                                        </q-card-section>
                                                    </q-card>
                                                </q-expansion-item>
                                            </q-item-label>
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </q-scroll-area>
                        </q-card-section>
                        <q-card-actions align="around">
                            <q-btn class="q-mx-lg" rounded icon="share" color="red"
                                :label="$t('mainLayout.itemList.dataCard.labelButtonShare')"
                                @click="copyToClipboard()" />

                            <q-btn class="gt-xs" size="12px" flat dense round icon="star"
                                :color="getFavoriteColor(dataItemListPage.dataItemTemp.favorite)"
                                @click="toggleFavorite(dataItemListPage.dataItemTemp)"> </q-btn>
                        </q-card-actions>

                    </q-card>
                </q-dialog>
                <q-footer v-if="filteredListAll.length > 0 || filteredListFavorite.length > 0"
                    style="background-color: #ffffff;">
                    <div class="row q-ma-md justify-center ">
                        <div class="col-12 col-md-2">
                        </div>
                        <div class="col-12 col-md-auto">
                            <q-btn class="q-mx-lg" rounded icon="list"
                                :color="dataItemListPage.listOption == 'All' ? 'red' : 'grey'"
                                :label="$t('mainLayout.itemList.labelButtonAll')" @click="updateListOption('All')"
                                style="width: 232px;" />
                            <q-btn class="q-mx-lg" rounded icon="star"
                                :color="dataItemListPage.listOption == 'Favorite' ? 'red' : 'grey'"
                                :label="$t('mainLayout.itemList.labelButtonFavorite')"
                                @click="updateListOption('Favorite')" style="width: 232px;" />
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

.charging {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
    margin: 0 auto;
}

.balls {
    width: 30px;
    height: 30px;
    animation: leap .5s alternate infinite;
    border-radius: 50%;
    margin: 0 30px;

    &:nth-child(2) {
        animation-delay: .18s;
    }

    &:nth-child(3) {
        animation-delay: .37s;
    }
}

@keyframes leap {
    from {
        transform: scaleX(1.25);
    }

    to {
        transform: translateY(-50px) scaleX(1);
    }
}
</style>
