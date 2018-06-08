import { Reducer } from "redux"

import { HistoryActions, HistoryState } from "./types"

export const initialState: HistoryState = {
    locations: []
}

const reducer: Reducer<HistoryState> = (state = initialState, action: HistoryActions ) => {
    switch (action.type) {
        case "history/LOCATION_ADDED":
            return {
                locations: [ ...state.locations, action.payload.location ]
            }

        case "history/LOCATION_REMOVED":
            return {
                locations: state.locations.filter(location => location.id !== action.payload.location.id)
            }

        default:
            return state
    }
}

export default reducer