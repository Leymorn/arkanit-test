import { ref } from "vue";
import { IClientChanel } from "./types";

export const useClientsChannelModel = ()  => { 
    const selectedChannel = ref<IClientChanel | null>(getSelectedChannel());

    function getSelectedChannel() {
        const channel = localStorage.getItem('selectedChannel');
        if(channel) {
            return JSON.parse(channel)
        }
        else {
            return {
                name: '',    
                type: '',
                is_active: false,
                timeout: 0,
                description: '',
                image_url: '',
                link: '',
                sorting: 0
            }
        }
    }

    return { selectedChannel }
}