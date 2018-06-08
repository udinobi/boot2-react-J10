import { ActionCreator } from "redux"

import { Location } from "../location/types"

import { LocationAddedAction, LocationRemovedAction } from "./types"

export const addLocationToHistory: ActionCreator<LocationAddedAction> = (location: Location) => ({
    payload: {
        location,
    },
    type: "history/LOCATION_ADDED"
})

export const removeLocationFromHistory: ActionCreator<LocationRemovedAction> = (location: Location) => ({
    payload: {
        location,
    },
    type: "history/LOCATION_REMOVED"
})