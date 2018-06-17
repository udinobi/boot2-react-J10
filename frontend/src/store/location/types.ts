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

// Definitions related to the Country element ------------------------------------------------------

export interface CountryState {
    countries: Country[]
}

export enum CountryActionType {
    COUNTRIES_FAILURE = "COUNTRIES_FAILURE",
    COUNTRIES_LOADING = "COUNTRIES_LOADING",
    COUNTRIES_RETRIEVED = "COUNTRIES_RETRIEVED",
    COUNTRY_SELECTED = "COUNTRY_SELECTED"
}

export interface CountriesFailureAction extends Action {
    type: CountryActionType.COUNTRIES_FAILURE
}

export interface CountriesLoadingAction extends Action {
    type: CountryActionType.COUNTRIES_LOADING
}

export interface CountriesRetrievedAction extends Action {
    type: CountryActionType.COUNTRIES_RETRIEVED
    payload: {
        countries: Country[]
    }
}

export interface CountrySelectedAction extends Action {
    type: CountryActionType.COUNTRY_SELECTED
    payload: {
        country: Country
    }
}

export type CountryActions =
    CountriesFailureAction | CountriesLoadingAction | CountriesRetrievedAction

// Definitions related to the City element ---------------------------------------------------------

export interface CityState {
    country: Option<Country>,
    suggestions: Location[]
}

export enum CityActionType {
    LOCATION_SELECTED = "LOCATION_SELECTED",
    SUGGESTIONS_FAILURE = "SUGGESTIONS_FAILURE",
    SUGGESTIONS_LOOKUP = "SUGGESTIONS_LOOKUP",
    SUGGESTIONS_RESET = "SUGGESTIONS_RESET",
    SUGGESTIONS_RETRIEVED = "SUGGESTIONS_RETRIEVED"
}

export interface LocationSelectedAction extends Action {
    type: CityActionType.LOCATION_SELECTED
    payload: {
        location: Location
    }
}

export interface SuggestionsFailureAction extends Action {
    type: CityActionType.SUGGESTIONS_FAILURE
}

export interface SuggestionsLookupAction extends Action {
    type: CityActionType.SUGGESTIONS_LOOKUP
}

export interface SuggestionsResetAction extends Action {
    type: CityActionType.SUGGESTIONS_RESET
}

export interface SuggestionsRetrievedAction extends Action {
    type: CityActionType.SUGGESTIONS_RETRIEVED
    payload: {
        suggestions: Location[]
    }
}

export type CityActions =
    CountrySelectedAction | LocationSelectedAction | SuggestionsFailureAction |
    SuggestionsLookupAction | SuggestionsResetAction | SuggestionsRetrievedAction
