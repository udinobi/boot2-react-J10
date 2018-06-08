import { Action } from "redux"

import { Location } from "../location/types"

export interface LocationAddedAction extends Action {
    type: "history/LOCATION_ADDED"
    payload: {
        location: Location
    }
}

export interface LocationRemovedAction extends Action {
    type: "history/LOCATION_REMOVED"
    payload: {
        location: Location
    }
}

export type HistoryActions = LocationAddedAction | LocationRemovedAction

export interface HistoryState {
    locations: Location[]
}
