import { Action } from "redux"

export interface Location {
    id: number
    name: string
    coord: Coordinates
}

export interface Coordinates {
    lat: string
    lon: string
}

export interface LocationChangedAction extends Action {
    type: "location/LOCATION_CHANGED"
    payload: {
        location: Location
    }
}

export type LocationActions = LocationChangedAction

export interface LocationState {
    location: Location | undefined
}
