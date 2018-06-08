import { combineReducers } from "redux"

import historyReducer from "./history/reducer"
import { HistoryState } from "./history/types"

import locationReducer from "./location/reducer"
import { LocationState } from "./location/types"

// The top-level state object
export interface ApplicationState {
    history: HistoryState
    locations: LocationState
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It"s important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export default combineReducers<ApplicationState>({
    history: historyReducer,
    locations: locationReducer
})
