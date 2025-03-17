import { shallowRef, ref } from "vue"


export const useCodeModel = ()  => { 
    const code = ref<string>('');
    const needNewCode = ref<boolean>(false);
    
    return {code, needNewCode }
}