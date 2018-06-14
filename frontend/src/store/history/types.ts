import { Action } from "redux"

import { Location } from "../location/types"

export interface HistoryState {
    locations: Location[]
}

export enum ActionType {
    REMOVE_LOCATION
}

export interface RemoveLocationAction extends Action {
    type: ActionType.REMOVE_LOCATION
    payload: {
        location: Location
    }
}

export type HistoryActions = RemoveLocationAction
