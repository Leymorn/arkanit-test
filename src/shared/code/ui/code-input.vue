<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { ref, watch, computed } from 'vue';
import type { InputError } from "@/shared/types/error";

const props = defineProps<{
    clientCode: string
    inputError: InputError
    needNewCode: boolean
}>()

const emit = defineEmits<{
    'update-client-code': [string]
    'send-new-code': [void]
}>()

const {t} = useI18n();

const code = ref<string>(props.clientCode);
const color = computed(() => props.inputError.error ? '#EB4036' : '#808080');
const borderColor = computed(() => props.inputError.error ? '#EB4036' : '#DFDFDF');

watch(() => code.value, (newVal: string) => {
    emit('update-client-code', newVal)
});

</script>
<template>
    <div class="code-input">
        <div class="code-input__title">
            {{ t('enterCode') }}
        </div>
        <input v-model="code"
                type="number">
        <div v-if="props.needNewCode" 
            class="code-input__send">
            <button type="button"
                    @click="emit('send-new-code')">
                {{ t('send') }}
            </button>
        </div>
        <div v-if="props.inputError.error" class="code-input__error">
            {{ props.inputError.text }}
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .code-input {
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

        &__send {
            font-weight: 500;
            font-size: 14px;
            letter-spacing: 0.15px;

            button {
                cursor: pointer;
                background-color: white;
                border: 0;
                color: #007AFF;
            }
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