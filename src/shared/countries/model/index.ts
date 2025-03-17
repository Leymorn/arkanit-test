import { ref, shallowRef, computed } from "vue";
import { fetchAllCountriesAsync} from "../api";
import { ICountry } from "./types";

export const useCounriesModel = ()  => { 
    const selectedCountry = ref<ICountry>({
        name: 'Россия',
        dial_code: '+7',
        flag: '🇷🇺', 
        code: 'RU',
    });
    const searchQuery = shallowRef<string>('');
    const contries = ref<ICountry[]>([]);
    const filteredCountries = computed(() => {
        return contries.value?.filter((country) =>
            country.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    })

    const fetchCountires = async (): Promise<void> => {
        try {
            contries.value = await fetchAllCountriesAsync();
        } catch(error) {
            console.error('Ошибка загрузки стран, ', error);
        }
    }
    
    return {fetchCountires, selectedCountry, filteredCountries, searchQuery}
}