<script setup lang="ts">
import { useAuthModel } from '..';
import { useInputErrorModel } from '@/shared/error';
import { CodeInput, useCodeModel } from '@/shared/code';
import { useI18n } from 'vue-i18n';
import { usePhoneModel } from '@/shared/phone';
import { ItemsSearch } from '@/shared/items-select';
import { IClientChanel } from '@/shared/client-chanels';

const props = defineProps<{
    clientChannels: [IClientChanel]
    selectedChannel: IClientChanel
}>();

const emit = defineEmits<{
    'update-session-id': [string]
    'update-selected-channel': IClientChanel
    'update-auth-telegram': [boolean]
}>()

const {t} = useI18n();
const authModel = useAuthModel();
const inputErrorModel = useInputErrorModel();
const phoneModel = usePhoneModel();
const codeModel = useCodeModel();

const submitAuthFormCode = async () => {
    authModel.isLoading.value = true;
    const response = await authModel.fetchCheckCode(authModel.createPhoneData.value.session_id, codeModel.code.value);
  
    if(response.success) {
        console.log(response.data.verify_token)
    } else {
        inputErrorModel.setError(true, response.error);
    }
    authModel.isLoading.value = false;
    
}

const sendNewCode = async () => {
    authModel.isLoading.value = true;
    inputErrorModel.setError(false, '');
    const response = await authModel.fetchSendCode(authModel.createPhoneData.value.session_id, props.selectedChannel.type);

    if(response.success) {
        console.log(response)
    } else {
        inputErrorModel.setError(true, response.error);

        if(response.error === 'Пользователь не зарегистрирован в канале') {
            emit('update-auth-telegram', true);
        }
    }

    authModel.isLoading.value = false;
}

const backToPhoneInput = () => {
    emit('update-session-id', 'none');
    phoneModel.phoneNumber.value = '';
    localStorage.setItem('sessionId', 'none');
    localStorage.setItem('phone', '');
}

const updateClientCode = (code: string) => {
    codeModel.code.value = code;
    inputErrorModel.inputError.error = false;
    inputErrorModel.inputError.text = '';
} 

const updateSelectedChannel = (channel: IClientChanel) => {
    emit('update-selected-channel', channel);
    codeModel.needNewCode.value = true;
}
</script>
<template>
    <form style="width: 100%; position: relative;"
            @submit.prevent="submitAuthFormCode">
            <ItemsSearch :selected-item="props.selectedChannel"
                        :items-list="props.clientChannels"
                        :item-title="t('getCode')"
                        @update-selected-item="v => updateSelectedChannel(v)"></ItemsSearch>
            <CodeInput :client-code="codeModel.code.value"
                    :need-new-code="codeModel.needNewCode.value"
                    :input-error="inputErrorModel.inputError"
                    @send-new-code="sendNewCode"
                    @update-client-code="v => updateClientCode(v)"></CodeInput>
            <div style="display: flex; align-items: center; gap: 10px" > 
                <button class="auth-form__back" 
                        type="button"
                        @click="backToPhoneInput">
                    <img src="/left_icon_blue.svg" 
                        alt="Назад">
                    <div>
                        {{t('back')}}
                    </div>
                </button>
                <button v-if="!authModel.isLoading.value" 
                        class="auth-form__submit" 
                        type="submit">{{ t('continue') }}</button>
                <img v-else 
                    class="auth-form__loading" 
                    src="/loading.svg" 
                    alt="Загрузка">
            </div>
        </form>
</template>
<style lang="scss" scoped>
.auth-form {
    &__back {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        width: 100%;
        background-color: white;
        padding: 10px;
        color: #007AFF;
        margin-bottom: 70px;
        border: 0;
        border-radius: 4px;
        font-weight: 500;
        font-size: 16px;
        line-height: 36px;
        letter-spacing: 0px;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
    }
    &__submit {
        width: 100%;
        background-color: #007AFF;
        padding: 10px;
        color: white;
        margin-bottom: 70px;
        border: 0;
        border-radius: 4px;
        font-weight: 500;
        font-size: 16px;
        line-height: 36px;
        letter-spacing: 0px;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
    }

    &__loading {
        width: 100%;
        height: 44px;
        position: relative;
        top: -34px;
    }
}   
</style>