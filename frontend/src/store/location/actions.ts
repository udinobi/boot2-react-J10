import { ActionCreator } from "redux"

import { Location } from "./types"

import { LocationChangedAction } from "./types"

export const changeCurrentLocation: ActionCreator<LocationChangedAction> = (location: Location) => ({
    payload: {
        location,
    },
    type: "location/LOCATION_CHANGED"
})
