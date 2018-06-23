import { CountryActions, CountryActionType } from "./types"

const reducer = (state = { countries: [] }, action: CountryActions) => {
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

export default reducer