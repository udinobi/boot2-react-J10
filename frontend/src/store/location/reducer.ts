import { None, Option } from "tsoption"

import {
    CityActions, CityActionType, CityState,
    CountryActions, CountryActionType, CountryState
} from "./types"

const countryState: CountryState = {
    countries: []
}

export const initialCityState: CityState = {
    country: None.of(),
    suggestions: []
}

export const cityReducer = (state = initialCityState, action: CityActions) => {
    switch (action.type) {
        case CountryActionType.COUNTRY_SELECTED:
            return {
                country: Option.of(action.payload.country),
                suggestions: []
            }

        case CityActionType.SUGGESTIONS_FAILURE:
        case CityActionType.SUGGESTIONS_RESET:
            return {
                country: state.country,
                suggestions: []
            }

        case CityActionType.SUGGESTIONS_LOOKUP:

        default:
            return state

        case CityActionType.SUGGESTIONS_RETRIEVED:
            return {
                country: state.country,
                suggestions: action.payload.suggestions
            }
    }
}

export const countryReducer = (state = countryState, action: CountryActions) => {
    switch (action.type) {
        case CountryActionType.COUNTRIES_FAILURE:
            return {
                countries: []
            }

        case CountryActionType.COUNTRIES_LOADING:

        default:
            return state

        case CountryActionType.COUNTRIES_RETRIEVED:
            return {
                countries: action.payload.countries
            }
    }
}
