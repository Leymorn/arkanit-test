import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    lang: 'English',
    welcome: "Welcome!",
    logo: 'Logo (Height 40px, width to 300px)',
    authFormTitle: 'Enter your phone number',
    authFormSubtitle: 'To login or register',
    phonePlaceholder: 'Phone number',
    continue: 'Continue',
    conditions: 'Conditions',
    confidentiality: 'Confidentiality',
    country: 'Country',
    noMatches: 'No matches',
    invalidNumberFormat: 'Invalid number format',
    getCode: 'How to get code',
    sentByNumber: 'Sent by number',
    back: 'Back',
    enterCode: 'Enter your code',
    send: 'Send code',
    invalidCode: 'Invalid code',
    telegramAuth: 'To use this communication channel, you need to log in to the bot',
    telegramAuthLink: 'Login to the bot',
    checkStatus: 'Check status'    
  },
  ru: {
    lang: 'Русский',
    welcome: "Добро пожаловать!",
    logo: 'Логотип (Высота 40px, длина до 300px)',
    authFormTitle: 'Введите номер телефона',
    authFormSubtitle: 'Чтобы войти или зарегистрироваться',
    phonePlaceholder: 'Номер телефона',
    continue: 'Продолжить',
    conditions: 'Условия',
    confidentiality: 'Конфиденциальность',
    country: 'Страна',
    noMatches: 'Ничего не найдено',
    invalidNumberFormat: 'Неверный формат номера',
    getCode: 'Способ получения кода',
    sentByNumber: 'Отправлен по номеру',
    back: 'Назад',
    enterCode: 'Введите код',
    send: 'Отправить',
    invalidCode: 'Код введен неверно',
    telegramAuth: 'Для использования данного канала связи вам необходимо авторизоваться в боте',
    telegramAuthLink: 'Авторизоваться в боте',
    checkStatus: 'Проверить статус'
  }
};

const i18n = createI18n({
  legacy: false, 
  locale: localStorage.getItem('lang') || 'ru',
  messages
});

export default i18n;