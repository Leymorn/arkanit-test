<script setup lang="ts"> 
import { useI18n } from 'vue-i18n';
import { useAuthModel } from '..';

const emit = defineEmits<{
    'update-auth-telegram': [boolean]
}>()

const {t} = useI18n();

</script>
<template>
    <div class="auth-telegram">
        <img src="/telegram_logo.png" 
            alt="Телеграм"
            class="auth-telegram__logo">
        <div class="auth-telegram__title">
            Telegram
        </div>
        <div class="auth-telegram__subtitle">
            {{ t('telegramAuth') }}
        </div>
        <button class="auth-telegram__link" 
                type="submit">
                {{ t('telegramAuthLink') }}
        </button>
        <button class="auth-telegram__check" >
            {{ t('checkStatus') }}
        </button>
        <button class="auth-telegram__back"
            @click="emit('update-auth-telegram', false) ">
            <img src="/left_icon.svg" alt="назад">
        </button>
    </div>
</template>
<style lang="scss" scoped>
.auth-telegram {
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    width: 500px;
    padding: 50px 30px 24px 30px;
    border: 1px solid #DFDFDF;
    border-radius: 8px;

    &__logo {
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
        margin-bottom: 70px;
        text-align: center;
    }

    &__link {
        width: 100%;
        background-color: #007AFF;
        padding: 10px;
        color: white;
        margin-bottom: 10px;
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

    &__check {
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

    &__back {
        position: absolute;
        left: 24px;
        top: 24px;
        background-color: transparent;
        border: 0;
        cursor: pointer;
    }
}
</style>
