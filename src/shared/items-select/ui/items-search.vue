<script lang="ts" setup>
import { type ICountry } from '../../countries';
import { shallowRef, watch} from 'vue';
import { useI18n } from 'vue-i18n';
import { ItemsList, ItemSelected } from '..';
import { type IClientChanel } from '../../client-chanels/model/types';

const props = defineProps<{
    selectedItem: ICountry | IClientChanel
    itemsList: [ICountry | IClientChanel]
    itemTitle: string
    searchQuery?: string
    showSearchQuery?: boolean
}>()

const emit = defineEmits<{
    'update-selected-item': [ICountry | IClientChanel]
    'update-search-query': [string]
}>()

const { t } = useI18n();

const searchQuery = shallowRef<string>(props.searchQuery ? props.searchQuery : '');
const showItemsList = shallowRef<boolean>(false);

const updateSelectedCountry = (country: ICountry) => {
    emit('update-selected-item', country)
}

watch(() => searchQuery.value, (newVal: string) => {
    emit('update-search-query', newVal)
});

</script>
<template>
    <ItemSelected :showItemsList="showItemsList" 
                :selectedItemName="props.selectedItem.name" 
                :selectedItemTitle="props.itemTitle" 
                @update-show-items-list="showItemsList = !showItemsList"></ItemSelected>
    <div v-if="showItemsList" class="items-search">
        <div v-if="props.showSearchQuery" class="items-search__input" >
            <img src="/search_icon.svg" alt="">
            <input v-model="searchQuery" 
                placeholder="Поиск"
                type="text">
        </div>
        <ItemsList :itemsList="props.itemsList" @update-selected-item="v => updateSelectedCountry(v)"></ItemsList>
    </div>
</template>
<style lang="scss" scoped>
    .items-search {
        position: absolute;
        width: 100%;
        top: 60px;
        background-color: white;
        border-radius: 4px;
        padding-block: 8px;
        box-shadow: 0px 3px 14px 2px rgba(0, 0, 0, 0.1215686275);
        z-index: 1;

        &__input {
            display: flex;
            align-items: center;
            border-radius: 4px;
            gap: 4px;
            padding: 9px 10px;
            background-color: #F8F8F8;
            margin-bottom: 16px;
            margin-inline: 16px;
            
            input {
                border: 0;
                width: 100%;
                height: 100%;
                background-color: #F8F8F8;

                &:focus-visible {
                    outline: 0;
                }
            }
        }
    }
</style>