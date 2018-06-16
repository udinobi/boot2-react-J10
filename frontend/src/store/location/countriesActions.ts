import axios, { AxiosResponse } from "axios"
import { ActionCreator, Dispatch } from "redux"

import { countrySelected } from "./suggestionsActions"

import {
    CountriesActions, CountriesActionType, CountriesFailureAction,
    CountriesLoadingAction, CountriesRetrievedAction, CountriesState,
    Country,
} from './types'

// CountriesFailureAction --------------------------------------------------------------------------

const countriesFailure: ActionCreator<CountriesFailureAction> = () => ({
    type: CountriesActionType.COUNTRIES_FAILURE
})

// CountriesLoadAction -----------------------------------------------------------------------------

const countriesLoading: ActionCreator<CountriesLoadingAction> = () => ({
    type: CountriesActionType.COUNTRIES_LOADING
})

const loadCountries = () =>
    async (dispatch: Dispatch<CountriesActions>) => {
        dispatch(countriesLoading())

        try {
            const url = "http://localhost:8088/geo/countries"
            const response: AxiosResponse<CountriesState> = await axios.get(url)
            dispatch(countriesRetrieved(response.data))
        } catch (error) {
            dispatch(countriesFailure())
        }
    }
    
export interface LoadCountriesDispatchProps {
    countrySelected: typeof countrySelected
    loadCountries: typeof loadCountries
}

export const mapCountriesDispatchToProps = {
    countrySelected, loadCountries
}
        
// CountriesRetrievedAction ------------------------------------------------------------------------

const countriesRetrieved: ActionCreator<CountriesRetrievedAction> = (countries: Country[]) => ({
    payload: { countries },
    type: CountriesActionType.COUNTRIES_RETRIEVED,
})
