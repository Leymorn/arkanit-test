<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale, t, messages } = useI18n();

const switchLang = () => {
  locale.value = locale.value === 'en' ? 'ru' : 'en';
  localStorage.setItem('lang', locale.value);
};

const differentLang = computed(() => locale.value === 'en' ? messages.value.ru.lang : messages.value.en.lang );
const showDifferentLang = shallowRef(false);

</script>
<template>
  <div class="lang-switch">
    <div class="lang-switch__show-button"
        @click="showDifferentLang = !showDifferentLang">
        <div>
          {{ t('lang') }}
        </div>
        <img :src="!showDifferentLang ? '/down_icon_2.svg' : '/up_icon_2.svg'" alt="">
    </div>
    <div class="lang-switch__change-button"
        :class="{'show' : showDifferentLang}">
      <div @click="switchLang"
          style="min-height: 0;" >
        {{differentLang }}
      </div>
    </div>
  </div>

</template>
<style lang="scss" scoped>

.lang-switch {  
  display: flex;
  flex-direction: column;
  cursor: pointer;
  font-size: 12px;
  font-weight: 400;
  color: #666666;
  
  &__show-button {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &__change-button {
    display: grid;
    grid-template-rows: 0fr;
    transition: all 0.3s ease-in-out;
    overflow: hidden;
  }
}


.show {
  grid-template-rows: 1fr;
}
</style>