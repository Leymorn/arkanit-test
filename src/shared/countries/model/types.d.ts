import type { CountryCode } from 'libphonenumber-js';

export interface ICountry {
    name: string,
    flag: string,
    code: CountryCode,
    dial_code: string
}