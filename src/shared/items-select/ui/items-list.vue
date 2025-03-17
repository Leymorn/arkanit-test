<script lang="ts" setup>
import { IClientChanel } from '../../client-chanels';
import { useI18n } from 'vue-i18n';
import { ICountry } from '../../countries';

const props = defineProps<{
    itemsList: [IClientChanel | ICountry]
}>()

const emit = defineEmits<{
    'update-selected-item': [IClientChanel | ICountry]
}>()

const { t } = useI18n();
</script>
<template>
    <div class="items-list">
        <div v-if="props.itemsList?.length" 
                class="items-list__item" 
                v-for="item in props.itemsList" 
                :key="item.name"
                @click="emit('update-selected-item', item)">
            <img v-if="'code' in item"
                class="items-list__item__flag"
                :src="`https://flagcdn.com/w40/${item.code.toLowerCase()}.png`" 
                :alt="item.code" />
            <div class="items-list__item__name">{{ item.name }}</div>
            <div v-if="'dial_code' in item" class="items-list__item__code">{{ item.dial_code }}</div>
        </div>
        <div v-else class="items-list__no-matches">
            {{ t('noMatches') }}
        </div>
    </div>
</template>
<style lang="scss" scoped>
.items-list {
    display: flex;
    flex-direction: column;
    max-height: 240px;
    overflow: auto;

    &__item {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        height: 48px;
        padding: 14px 16px;

        &__flag {
            border-radius: 4px;
            height: 100%;
        }

        &__name {
            font-weight: 400;
            font-size: 16px;
            letter-spacing: -0.41px;
        }

        &__code {
            margin-left: auto;
            font-weight: 700;
            font-size: 16px;
            line-height: 120%;
            letter-spacing: -0.41px;
            text-align: right;
        }
    }

    &__no-matches {
        padding: 14px 16px;
        color: #9E9E9E;
        text-align: center;
        font-weight: 400;
        font-size: 16px;
        line-height: 120%;
        letter-spacing: -0.41px;
    }
}
</style>