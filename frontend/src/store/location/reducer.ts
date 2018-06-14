import { ActionType, CountriesActions, CountriesState, LocationActions, LocationState } from "./types"

const countriesState: CountriesState = {
    countries: []
}

const locationState: LocationState = {
    suggestions: []
}

export const countriesReducer = (state = countriesState, action: CountriesActions) => {
    switch (action.type) {
        case ActionType.COUNTRIES_UPDATE:

        default:
            return state

        case ActionType.COUNTRIES_UPDATED:
            return {
                ...state,
                countries: action.payload.countries
            }
    }
}

export const locationReducer = (state = locationState, action: LocationActions) => {
    switch (action.type) {
        case ActionType.SUGGESTIONS_LOOKUP:
            return { 
                ...state,
                prefix: action.payload.prefix
            }

        case ActionType.SUGGESTIONS_RETRIEVED:
            return { 
                ...state,
                suggestions: action.payload.suggestions
            }

        default:
            return state
    }
}
