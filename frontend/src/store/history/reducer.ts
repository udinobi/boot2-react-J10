import { ActionType, HistoryActions, HistoryState } from "./types"

import { Location } from "../location/types"

export const initialState: HistoryState = {
    locations: []
}

const removeLocation = (locations: Location[], location: Location) =>
    locations.filter(l => location.geoId !== l.geoId)

const reducer = (state = initialState, action: HistoryActions) => {
    switch (action.type) {
        case ActionType.REMOVE_LOCATION:
            return {
                ...state,
                locations: removeLocation(state.locations, action.payload.location)
            }

        default:
            return state
    }
}

export default reducer