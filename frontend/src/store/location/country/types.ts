import { Action } from "redux"

export interface Country {
    code: string
    name: string
}

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
