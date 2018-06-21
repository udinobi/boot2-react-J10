import { CountryActions, CountryActionType, CountryState } from "./types"

const countryState: CountryState = {
    countries: []
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
