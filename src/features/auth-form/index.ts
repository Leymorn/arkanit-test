import AuthForm from './ui/auth-form.vue';
import type { CreatePhoneResponse, CreatePhoneResponseData, CheckCodeResponse, CheckCodeResponseData, NewCodeResponse } from './model/types';
import { useAuthModel } from './model';
import CreatePhone from './ui/create-phone.vue';
import SendCode from './ui/send-code.vue'
import AuthTelegram from './ui/auth-telegram.vue';

export {AuthForm, CreatePhone, SendCode, AuthTelegram, type CreatePhoneResponse, type CreatePhoneResponseData,
    type CheckCodeResponse, type CheckCodeResponseData, type NewCodeResponse,
     useAuthModel}