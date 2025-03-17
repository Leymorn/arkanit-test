<script lang="ts" setup>
import { LangSwitch } from '@/shared/lang';
import { useI18n } from 'vue-i18n';
import { useCounriesModel } from '@/shared/countries';
import { useAuthModel, CreatePhone, SendCode, type CreatePhoneResponseData, AuthTelegram } from '..';
import { usePhoneModel } from '@/shared/phone';
import { useClientsChannelModel } from '@/shared/client-chanels/model';
import {  watch } from 'vue';
import { IClientChanel } from '@/shared/client-chanels';

const {t} = useI18n();
const counrtiesModel = useCounriesModel();
counrtiesModel.fetchCountires();
const authModel = useAuthModel();
const phoneModel = usePhoneModel();
const clientsChannelModel = useClientsChannelModel();

watch(() => authModel.createPhoneData.value , (newData: CreatePhoneResponseData ) => {
    clientsChannelModel.selectedChannel.value = newData.client_channels.find(x => x.type === newData.sent_to);
    localStorage.setItem('clientChannels', JSON.stringify(newData.client_channels));
});

const updateSelectedChannel = (newChannel: IClientChanel) => {
    clientsChannelModel.selectedChannel.value = newChannel;
    localStorage.setItem('selectedChannel', JSON.stringify(newChannel));
}

</script>
<template>
    <div v-if="!authModel.authInTelegram.value" class="auth-form">
        <div class="auth-form__logo">{{ t('logo') }}</div>
        <header class="auth-form__title">{{ authModel.createPhoneData.value.session_id === 'none' ? t('authFormTitle') : t('enterCode')}}</header>
        <div class="auth-form__subtitle">{{ authModel.createPhoneData.value.session_id === 'none' ? t('authFormSubtitle') : t('sentByNumber') + ' ' + `${phoneModel.phoneNumber.value}` }}</div>
        <CreatePhone v-if="authModel.createPhoneData.value.session_id === 'none'" 
                    @update-create-phone-data="v => authModel.createPhoneData.value = v"></CreatePhone>
        <SendCode v-else 
                @update-session-id="v => authModel.createPhoneData.value.session_id = v"
                :client-channels="authModel.createPhoneData.value.client_channels"
                :selected-channel="clientsChannelModel.selectedChannel.value"
                @update-selected-channel="v => updateSelectedChannel(v)"
                @update-auth-telegram="v => authModel.authInTelegram.value = v"></SendCode>
        <div class="auth-form__footer">
            <LangSwitch></LangSwitch>
            <div class="auth-form__footer__links">
                <a href="/">Условия</a>
                <a href="/">Конфиденциальность</a>
            </div>
        </div>
    </div>
    <AuthTelegram v-else @update-auth-telegram="v => authModel.authInTelegram.value = v"></AuthTelegram>
</template>
<style lang="scss" scoped>
.auth-form {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 500px;
    padding: 50px 30px 24px 30px;
    border: 1px solid #DFDFDF;
    border-radius: 8px;

    &__logo {
        max-width: 300px;
        width: 100%;
        height: 40px;
        padding: 12px 20px;
        background-color: #F8F8F8;
        color: #989898;
        font-size: 14px;
        text-align: center;
        margin-bottom: 30px;
    }

    &__title {
        font-weight: 500;
        font-size: 32px;
        margin-bottom: 14px;
    }

    &__subtitle {
        font-weight: 400;
        font-size: 16px;
        color: #666666;
        margin-bottom: 24px;
    }

    &__footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        width: 100%;
        
        &__links {
            display: flex;
            align-items: center;
            gap: 24px;
            font-weight: 400;
            font-size: 12px;           

            a {
                color: #666666;
            }
        }
    }
}
</style>