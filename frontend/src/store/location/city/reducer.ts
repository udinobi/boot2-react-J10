import { none, option } from "ts-option"

import { CountryActionType } from "../country/types"
import { CityActions, CityActionType, CityState } from "./types"

export const initialCityState: CityState = {
    country: none,
    suggestions: []
}

const reducer = (state = initialCityState, action: CityActions) => {
    switch (action.type) {
        case CountryActionType.COUNTRY_SELECTED:
            return {
                country: option(action.payload.country),
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
                suggestions: action.payload.suggestions.map(suggestion =>({
                    ...suggestion,
                    country: action.payload.country
                }))
            }
    }
}

export default reducer