import { Action } from "redux"

import { Option } from "tsoption"

export interface Coordinates {
    lat: string
    lon: string
}

export interface Country {
    code: string
    name: string
}

export interface Location {
    geoId: number
    name: string
    coord: Coordinates
    country: Country
}

// Definitions related to the Countries element ----------------------------------------------------

export interface CountriesState {
    countries: Country[]
}

export enum CountriesActionType {
    COUNTRIES_FAILURE = "COUNTRIES_FAILURE",
    COUNTRIES_LOADING = "COUNTRIES_LOADING",
    COUNTRIES_RETRIEVED = "COUNTRIES_RETRIEVED"
}

export interface CountriesFailureAction extends Action {
    type: CountriesActionType.COUNTRIES_FAILURE
}

export interface CountriesLoadingAction extends Action {
    type: CountriesActionType.COUNTRIES_LOADING
}

export interface CountriesRetrievedAction extends Action {
    type: CountriesActionType.COUNTRIES_RETRIEVED
    payload: {
        countries: Country[]
    }
}

export type CountriesActions =
    CountriesFailureAction | CountriesLoadingAction | CountriesRetrievedAction

// Definitions related to the City widget ----------------------------------------------------------

export interface SuggestionsState {
    country: Option<Country>,
    suggestions: Location[]
}

export enum SuggestionsActionType {
    COUNTRY_SELECTED = "COUNTRY_SELECTED",
    SUGGESTIONS_FAILURE = "SUGGESTIONS_FAILURE",
    SUGGESTIONS_LOOKUP = "SUGGESTIONS_LOOKUP",
    SUGGESTIONS_RETRIEVED = "SUGGESTIONS_RETRIEVED"
}

export interface CountrySelectedAction extends Action {
    type: SuggestionsActionType.COUNTRY_SELECTED
    payload: {
        country: Country
    }
}

export interface SuggestionsFailureAction extends Action {
    type: SuggestionsActionType.SUGGESTIONS_FAILURE
}

export interface SuggestionsLookupAction extends Action {
    type: SuggestionsActionType.SUGGESTIONS_LOOKUP
}

export interface SuggestionsRetrievedAction extends Action {
    type: SuggestionsActionType.SUGGESTIONS_RETRIEVED
    payload: {
        suggestions: Location[]
    }
}

export type SuggestionsActions =
    CountrySelectedAction | SuggestionsFailureAction | SuggestionsLookupAction | SuggestionsRetrievedAction
