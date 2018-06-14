import { Action } from "redux"

export interface Coordinates {
    lat: string
    lon: string
}

export interface Country {
    code: string
    name: string
}

export interface Location {
    id: number
    name: string
    coord: Coordinates
    country: Country
}

export interface CountriesState {
    countries: Country[]
}

export interface LocationState {
    suggestions: Location[]
}

export enum ActionType {
    COUNTRIES_UPDATE,
    COUNTRIES_UPDATED,
    SUGGESTIONS_LOOKUP,
    SUGGESTIONS_RETRIEVED
}

export interface CountriesUpdateAction extends Action {
    type: ActionType.COUNTRIES_UPDATE
}

export interface CountriesUpdatedAction extends Action {
    type: ActionType.COUNTRIES_UPDATED
    payload: {
        countries: Country[]
    }
}

export interface SuggestionsLookupAction extends Action {
    type: ActionType.SUGGESTIONS_LOOKUP
    payload: {
        prefix: string
    }
}

export interface SuggestionsRetrievedAction extends Action {
    type: ActionType.SUGGESTIONS_RETRIEVED
    payload: {
        suggestions: Location[]
    }
}

export type CountriesActions = CountriesUpdateAction | CountriesUpdatedAction

export type LocationActions = SuggestionsLookupAction | SuggestionsRetrievedAction
