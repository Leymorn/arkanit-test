import { reactive } from "vue";
import { InputError } from "./types";

export const useInputErrorModel = ()  => { 
    const inputError = reactive<InputError>({
        error: false,
        text: ''
    })

    function setError(isError: boolean, errorText: string) {
        inputError.error = isError;
        inputError.text = errorText;
    }

    return { inputError, setError }
}