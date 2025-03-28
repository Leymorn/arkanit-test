import type { ICountry } from "../model/types";

export async function fetchAllCountriesAsync(): Promise<ICountry[] | []> {
    const response = await fetch(
        'https://gist.githubusercontent.com/DmytroLisitsyn/1c31186e5b66f1d6c52da6b5c70b12ad/raw/2bc71083a77106afec2ec37cf49d05ee54be1a22/country_dial_info.json'
    );
    return await response.json() ?? [];
}
