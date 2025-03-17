<script lang="ts" setup>
const props = defineProps<{
    showItemsList: boolean
    selectedItemName: string
    selectedItemTitle: string
}>()

const emit = defineEmits<{
    'update-show-items-list': [void]
}>()

</script>

<template>
    <div class="selected-item" @click="emit('update-show-items-list')">
        <div class="selected-item__title">
            {{ props.selectedItemTitle }}
        </div>
        <div class="selected-country__name">
            {{ props.selectedItemName }}
        </div>
        <img :src="!showItemsList ? '/down_icon_1.svg' : '/up_icon_1.svg'" alt="">
    </div>
</template>

<style lang="scss" scoped>
.selected-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: 16px;
    border: 1px solid #DFDFDF;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 40px;

    &__title {
        position: absolute;
        top: -13px;
        left: 20;
        background: white;
        padding: 4px;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        letter-spacing: 0.4px;
        color: #9E9E9E;
    }
}
</style>
