import axios, { AxiosResponse } from "axios"
import { ActionCreator, Dispatch } from "redux"

import {
    CountriesFailureAction, CountriesLoadingAction, CountriesRetrievedAction,
    Country, CountryActions, CountryActionType,
    CountrySelectedAction, CountryState
} from "./types"

// CountriesFailureAction --------------------------------------------------------------------------

const countriesFailure: ActionCreator<CountriesFailureAction> = () => ({
    type: CountryActionType.COUNTRIES_FAILURE
})

// CountriesLoadAction -----------------------------------------------------------------------------

const countriesLoading: ActionCreator<CountriesLoadingAction> = () => ({
    type: CountryActionType.COUNTRIES_LOADING
})

// Not checking yet, at this stage in our CSR app, if these properties are set or not.
// In a future SSR rendering feature branch we can also consider to implement logging
// to the server-side RT.
const url =
    `${process.env.REACT_APP_SERVICE_URL}${process.env.REACT_APP_LOAD_COUNTRIES_PATH}`

export const loadCountries = () =>
    async (dispatch: Dispatch<CountryActions>) => {
        dispatch(countriesLoading())

        try {
            const response: AxiosResponse<CountryState> = await axios.get(url)
            dispatch(countriesRetrieved(response.data))
        } catch (error) {
            dispatch(countriesFailure())
        }
    }
        
// CountriesRetrievedAction ------------------------------------------------------------------------

const countriesRetrieved: ActionCreator<CountriesRetrievedAction> = (countries: Country[]) => ({
    payload: { countries },
    type: CountryActionType.COUNTRIES_RETRIEVED,
})

// CountrySelectedAction ---------------------------------------------------------------------------

export const countrySelectedAction: ActionCreator<CountrySelectedAction> = (country: Country) => ({
    payload: { country },
    type: CountryActionType.COUNTRY_SELECTED
})

export const countrySelected = (country: Country) =>
    (dispatch: Dispatch<CountrySelectedAction>) => dispatch(countrySelectedAction(country))

// Action mapping ----------------------------------------------------------------------------------

export interface CountriesProps {
    countries: Country[]
    countrySelected: typeof countrySelected
    loadCountries: typeof loadCountries
}

export const mapCountryDispatchToProps = {
    countrySelected,
    loadCountries
}
    