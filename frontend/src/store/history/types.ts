import { Action } from "redux"

import { Location, LocationSelectedAction } from "../location/city/types"

export interface HistoryLocation {
    location: Location
}

export interface HistoryState {
    locations: Location[]
}

export enum HistoryActionType {
    LOCATION_RELOAD = "LOCATION_RELOAD",
    LOCATION_REMOVE = "LOCATION_REMOVE"
}

export interface LocationReloadAction extends Action {
    type: HistoryActionType.LOCATION_RELOAD
    payload: {
        location: Location
    }
}

export interface LocationRemoveAction extends Action {
    type: HistoryActionType.LOCATION_REMOVE
    payload: {
        location: Location
    }
}

export type HistoryActions =
    LocationRemoveAction | LocationSelectedAction
