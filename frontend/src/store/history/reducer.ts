import { Option } from "tsoption"

import { HistoryActions, HistoryActionType, HistoryState } from "./types"

import { CityActionType, Location } from "../location/city/types"

export const initialHistoryState: HistoryState = {
    locations: []
}

const locationSelected = (locations: Location[], location: Location) => {
    const inHistory = Option.of(locations.find(_ => _.geoId === location.geoId))
    return inHistory.nonEmpty() ? locations : [ location, ...locations ]
}

const removeLocation = (locations: Location[], location: Location) =>
    locations.filter(_ => _.geoId !== location.geoId)

const reducer = (state = initialHistoryState, action: HistoryActions) => {
    switch (action.type) {
        case CityActionType.LOCATION_SELECTED:
            return {
                locations: locationSelected(state.locations, action.payload.location)
            }

        case HistoryActionType.LOCATION_REMOVE:
            return {
                locations: removeLocation(state.locations, action.payload.location)
            }

        default:
            return state
    }
}

export default reducer