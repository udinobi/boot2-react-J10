import { Action } from "redux"

import { Option } from "tsoption"

import { Country, CountrySelectedAction } from "../country/types"

export interface Coordinates {
    lat: string
    lon: string
}

export interface Location {
    geoId: number
    name: string
    coord: Coordinates
    country: Country
}

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
    type: CityActionType.SUGGESTIONS_LOOKUP,
    payload: {
        country: Country,
        locationTerm: string
    }
}

export interface SuggestionsResetAction extends Action {
    type: CityActionType.SUGGESTIONS_RESET
}

export interface SuggestionsRetrievedAction extends Action {
    type: CityActionType.SUGGESTIONS_RETRIEVED
    payload: {
        country: Country
        suggestions: Location[]
    }
}

export type CityActions =
    CountrySelectedAction |
    SuggestionsFailureAction | SuggestionsLookupAction |
    SuggestionsResetAction | SuggestionsRetrievedAction
