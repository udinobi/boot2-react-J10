import axios, { AxiosResponse } from "axios"
import { ActionCreator, Dispatch } from "redux"

import { CountriesState } from "./types"

import {
    ActionType, CountriesUpdateAction, CountriesUpdatedAction, Country,
    Location, SuggestionsLookupAction, SuggestionsRetrievedAction } from './types';

export const countriesUpdate: ActionCreator<CountriesUpdateAction> = () => ({
    type: ActionType.COUNTRIES_UPDATE
});

export const countriesUpdated: ActionCreator<CountriesUpdatedAction> = (countries: Country[]) => ({
    payload: {
        countries,
    },
    type: ActionType.COUNTRIES_UPDATED
});
 
export const suggestionsLookup: ActionCreator<SuggestionsLookupAction> = (prefix: string) => ({
    payload: {
        prefix,
    },
    type: ActionType.SUGGESTIONS_LOOKUP
})

export const suggestionsRetrieved: ActionCreator<SuggestionsRetrievedAction> = (suggestions: Location[]) => ({
    payload: {
        suggestions,
    },
    type: ActionType.SUGGESTIONS_RETRIEVED
});

export const updateCountries = () =>
    async (dispatch: Dispatch<CountriesUpdatedAction>) => {
        const response: AxiosResponse<CountriesState> = await axios.get("http://localhost:8088/geo/countries")
        dispatch(countriesUpdated(response.data))
        // No need to handle catch. Errors while retrieving
        // countries get just ignored for the time being.
    }