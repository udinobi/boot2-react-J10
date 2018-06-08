import { Reducer } from "redux"

import { LocationActions, LocationState } from "./types"

export const initialState: LocationState = {
    location: undefined
}

const reducer: Reducer<LocationState> = (state: LocationState = initialState, action: LocationActions ) => {
    switch (action.type) {
        case "location/LOCATION_CHANGED":
            return { 
                location: action.payload.location
            }

        default:
            return state
    }
}

export default reducer