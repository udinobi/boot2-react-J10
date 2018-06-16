import { None, Option } from "tsoption"

import {
    CountriesActions, CountriesActionType, CountriesState,
    SuggestionsActions, SuggestionsActionType, SuggestionsState
} from "./types"

const countriesState: CountriesState = {
    countries: []
}

const suggestionsState: SuggestionsState = {
    country: None.of(),
    suggestions: []
}

export const countriesReducer = (state = countriesState, action: CountriesActions) => {
    switch (action.type) {
        case CountriesActionType.COUNTRIES_FAILURE:
            return {
                countries: []
            }

        case CountriesActionType.COUNTRIES_LOADING:

        default:
            return state

        case CountriesActionType.COUNTRIES_RETRIEVED:
            return {
                countries: action.payload.countries
            }
    }
}

export const suggestionsReducer = (state = suggestionsState, action: SuggestionsActions) => {
    switch (action.type) {
        case SuggestionsActionType.COUNTRY_SELECTED:
            return {
                country: Option.of(action.payload.country),
                suggestions: []
            }

        case SuggestionsActionType.SUGGESTIONS_FAILURE:
            return {
                country: state.country,
                suggestions: []
            }

        case SuggestionsActionType.SUGGESTIONS_LOOKUP:

        default:
            return state

        case SuggestionsActionType.SUGGESTIONS_RETRIEVED:
            return {
                country: state.country,
                suggestions: action.payload.suggestions
            }
    }
}
