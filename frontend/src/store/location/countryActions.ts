import axios, { AxiosResponse } from "axios"
import { ActionCreator, Dispatch } from "redux"

import {
    CountriesFailureAction, CountriesLoadingAction, CountriesRetrievedAction,
    Country, CountryActions, CountryActionType,
    CountrySelectedAction, CountryState
} from './types'

// CountriesFailureAction --------------------------------------------------------------------------

const countriesFailure: ActionCreator<CountriesFailureAction> = () => ({
    type: CountryActionType.COUNTRIES_FAILURE
})

// CountriesLoadAction -----------------------------------------------------------------------------

const countriesLoading: ActionCreator<CountriesLoadingAction> = () => ({
    type: CountryActionType.COUNTRIES_LOADING
})

const loadCountries = () =>
    async (dispatch: Dispatch<CountryActions>) => {
        dispatch(countriesLoading())

        try {
            const url = "http://localhost:8088/geo/countries"
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

export interface LoadCountryDispatchProps {
    countrySelected: typeof countrySelected
    loadCountries: typeof loadCountries
}

export const mapCountryDispatchToProps = {
    countrySelected,
    loadCountries
}
    