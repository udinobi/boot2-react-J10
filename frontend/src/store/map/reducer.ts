import { None, Option } from "tsoption"

import { MapActions, MapState } from "./types"

import { HistoryActionType } from "../history/types"

import { CityActionType, Location } from "../location/types"

export const initialState: MapState = {
    location: None.of(),
}

const locationSelected = (stateLocation: Option<Location>, location: Location) =>
    stateLocation
        .map(_ => _.geoId === location.geoId ? _ : location)
        .orElse(Option.of(location))

const reducer = (state = initialState, action: MapActions) => {
    switch (action.type) {
        case CityActionType.LOCATION_SELECTED:
        case HistoryActionType.LOCATION_RELOAD:
            return {
                location: locationSelected(state.location, action.payload.location)
            }

        default:
            return state
    }
}

export default reducer