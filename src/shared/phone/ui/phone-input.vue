<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { ref, watch, computed } from 'vue';
import type { InputError } from "@/shared/types/error";

const props = defineProps<{
    phoneNumber: number | ''
    phoneCode: string
    inputError: InputError
}>()

const emit = defineEmits<{
    'update-phone-number': [number | '']
}>()

const {t} = useI18n();

const phone = ref(props.phoneNumber);
const color = computed(() => props.inputError.error ? '#EB4036' : '#808080');
const borderColor = computed(() => props.inputError.error ? '#EB4036' : '#DFDFDF');

watch(() => phone.value, (newVal: number | '') => {
    emit('update-phone-number', newVal)
});

</script>
<template>
    <div class="phone-input">
        <div class="phone-input__title">
            {{ t('phonePlaceholder') }}
        </div>
        <div class="phone-input__code">
            {{ props.phoneCode }}
        </div>
        <input v-model="phone"
                type="number">
        <div v-if="props.inputError.error" class="phone-input__error">
            {{ props.inputError.text }}
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .phone-input {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        padding: 16px;
        border: 1px solid v-bind(borderColor);
        border-radius: 4px;
        margin-bottom: 50px;
        gap: 4px;

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
            color: v-bind(color);
        }

        input[type="number"] {
            border: 0;
            width: 100%;
            height: 100%;
            font-size: 16px;
            appearance: textfield;
            -moz-appearance: textfield;
            -webkit-appearance: textfield;


            &:focus-visible {
                outline: 0;
            }
        }

        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        &__error {
            position: absolute;
            top: 52px;
            font-weight: 400;
            font-size: 12px;
            line-height: 16px;
            letter-spacing: 0.4px;
            color: #EB4036;
        }
    }
</style>