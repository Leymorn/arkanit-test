<script setup lang="ts">
import { useAuthModel } from '..';
import { useI18n } from 'vue-i18n';
import { useCounriesModel } from '@/shared/countries';
import { PhoneInput, usePhoneModel } from '@/shared/phone';
import { useInputErrorModel } from '@/shared/error';
import { ItemsSearch } from '@/shared/items-select';
import type { CreatePhoneResponseData } from '../model/types';

const {t} = useI18n();
const authModel = useAuthModel();
const counrtiesModel = useCounriesModel();
counrtiesModel.fetchCountires();
const phoneModel = usePhoneModel();
const inputErrorModel = useInputErrorModel();

const emit = defineEmits<{
    'update-create-phone-data': [CreatePhoneResponseData]
    'update-phone-number': [string]
}>()

const submitAuthFormPhone = async () => {
    authModel.isLoading.value = true;
    
    const phone = counrtiesModel.selectedCountry.value.dial_code + phoneModel.phoneNumber.value.toString();
    if(!phoneModel.isValidPhoneNumber(phone, counrtiesModel.selectedCountry.value.code)) {
        inputErrorModel.setError(true, t('invalidNumberFormat'));
        authModel.isLoading.value = false;
        return
    }

    const response = await authModel.fetchCreatePhone(phone);
    emit('update-phone-number', phone);
    
    if(response.success) {
        emit('update-create-phone-data', response.data);
        localStorage.setItem('sessionId', response.data.session_id);
    } else {
        inputErrorModel.setError(true, response.error);
    }
    authModel.isLoading.value = false;
}

const updatePhoneNumber = (number: string) => {
    phoneModel.phoneNumber.value = number;
   
    inputErrorModel.inputError.error = false;
    inputErrorModel.inputError.text = '';
}
</script>
<template>
     <form style="width: 100%; position: relative;"
            @submit.prevent="submitAuthFormPhone">
            <ItemsSearch :selected-item="counrtiesModel.selectedCountry.value"
                            :items-list="counrtiesModel.filteredCountries.value"
                            :item-title="t('country')"
                            :search-query="counrtiesModel.searchQuery.value"
                            :show-search-query="true"
                            @update-selected-item="v => counrtiesModel.selectedCountry.value = v"
                            @update-search-query="v => counrtiesModel.searchQuery.value = v"></ItemsSearch>
            <PhoneInput :phone-code="counrtiesModel.selectedCountry.value.dial_code" 
                        :phone-number="phoneModel.phoneNumber.value"
                        :input-error="inputErrorModel.inputError"
                        @update-phone-number="v => updatePhoneNumber(v)"></PhoneInput>
            <button v-if="!authModel.isLoading.value"
                    class="auth-form__submit" 
                    type="submit" 
                    @click="submitAuthFormPhone">{{ t('continue') }}</button>
            <img v-else 
                class="auth-form__loading" 
                src="/loading.svg" 
                alt="Загрузка">
        </form>
</template>
<style scoped lang="scss">
.auth-form {
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
        position: relative;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>