
import { Dispatch } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"

import historyReducer from "./history/reducer"
import { HistoryState } from "./history/types"

import { countriesReducer, suggestionsReducer } from "./location/reducer"
import { CountriesState, SuggestionsState } from "./location/types"

// Additional props for connected React components. This prop is passed by default with `connect()`
export interface ConnectedReduxProps<T> {
    // Correct types for the `dispatch` prop passed by `react-redux`.
    // Additional type information is given through generics.
    dispatch: Dispatch;
}
  
// The top-level state object
export interface AppState {
    countriesState: CountriesState
    historyState: HistoryState
    suggestionsState: SuggestionsState
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It"s important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
const reducers = combineReducers<AppState>({
    countriesState: countriesReducer,
    historyState: historyReducer,
    suggestionsState: suggestionsReducer
})

// redux-logger has to be the last middleware in chain.
export default createStore(reducers, applyMiddleware(thunk, logger))
