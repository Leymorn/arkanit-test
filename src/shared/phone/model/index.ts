import { shallowRef } from "vue";
import { CountryCode } from "libphonenumber-js";
import parsePhoneNumberFromString  from 'libphonenumber-js';

export const usePhoneModel = ()  => { 
    const phoneNumber = shallowRef<string | ''>(localStorage.getItem('phone') || '');

    function isValidPhoneNumber(phone: string, country: CountryCode ): boolean {
        const phoneNumberParse = parsePhoneNumberFromString(phone, country);
        if (phoneNumberParse && phoneNumberParse.isValid()) {
            localStorage.setItem('phone', phone)
            phoneNumber.value = phone;
            return true
        } else {
            return false
        }
    }
    
    return { phoneNumber, isValidPhoneNumber }
}