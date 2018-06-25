import { Action } from "redux"

import { Option } from "ts-option"

import { Location, LocationSelectedAction } from "../location/city/types"

import { WeatherData, WeatherDataRetrievedAction } from "../weather/types"

export interface HistoryItem {
    // Last Weather Update
    lastUpdate: Option<Date>
    location: Location
    weatherData: Option<WeatherData>
}

export interface HistoryState {
    items: HistoryItem[]
}

export enum HistoryActionType {
    LOCATION_RELOAD = "LOCATION_RELOAD",
    LOCATION_REMOVE = "LOCATION_REMOVE"
}

export interface LocationReloadAction extends Action {
    type: HistoryActionType.LOCATION_RELOAD
    payload: {
        history: HistoryItem
    }
}

export interface LocationRemoveAction extends Action {
    type: HistoryActionType.LOCATION_REMOVE
    payload: {
        location: Location
    }
}

export type HistoryActions =
    LocationRemoveAction | LocationSelectedAction | WeatherDataRetrievedAction
