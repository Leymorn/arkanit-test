import { ref } from "vue"
import { createPhoneAsync, sendCodeAsync, checkCodeAsync } from "../api";
import { CreatePhoneResponse, } from "./types";
import { CreatePhoneResponseData, CheckCodeResponse, NewCodeResponse} from "./types";

export const useAuthModel = ()  => { 
    const isLoading = ref<boolean>(false);
    const authInTelegram = ref<boolean>(false);

    const createPhoneData = ref<CreatePhoneResponseData>({  
        session_id: localStorage.getItem('sessionId') || 'none',
        sent_to: '',
        client_channels: getClientChannels()
    });

    function getClientChannels() {
        const channels = localStorage.getItem('clientChannels');
        if(channels) {
            return JSON.parse(channels)
        }
        else {
            return []
        }
    }

    async function fetchCreatePhone(number: string): Promise<CreatePhoneResponse> {
        try {
            const response = await createPhoneAsync(number);
            return response
        } catch(error) {
            console.error('Ошибка при создании сессии, ', error)
            return {
                success: false,
                error: error
            }
        }
    }
    
    async function fetchSendCode(session_id: string, type: string): Promise<NewCodeResponse> {
        try {
            const response = await sendCodeAsync(session_id, type);
            return response
        } catch(error) {
            console.error('Ошибка при отправке кода, ', error)
            return {
                success: false,
                error: error
            }
        }
    }    

    async function fetchCheckCode(session_id: string, code: string): Promise<CheckCodeResponse> {
        try {
            const response = await checkCodeAsync(session_id, code);
            return response
        } catch(error) {
            console.error('Ошибка при проверке кода, ', error)
            return {
                success: false,
                error: error
            }
        }
    }    

    return { fetchCreatePhone, fetchSendCode, fetchCheckCode, createPhoneData, isLoading, authInTelegram}
}