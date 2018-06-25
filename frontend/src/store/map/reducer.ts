import { none, option, Option } from "ts-option"

import { MapAndWeatherActions, MapAndWeatherState } from "../mapAndWeather/types"

import { HistoryActionType } from "../history/types"

import { CityActionType, Location } from "../location/city/types"

export const initialState: MapAndWeatherState = {
    location: none
}

const locationSelected = (stateLocation: Option<Location>, location: Location) =>
    // Why flatMap ? In order to not alter state if the selected location is equal to
    // the current one. In this case we return the original stateLocation instance.
    stateLocation
        .flatMap(_ => _.geoId === location.geoId ? stateLocation : option(location))
        .orElse(() => option(location))

const reducer = (state = initialState, action: MapAndWeatherActions) => {
    switch (action.type) {
        case HistoryActionType.LOCATION_RELOAD:
            return {
                location: locationSelected(state.location, action.payload.history.location)
            }

        case CityActionType.LOCATION_SELECTED:
            return {
                location: locationSelected(state.location, action.payload.location)
            }

        default:
            return state
    }
}

export default reducer