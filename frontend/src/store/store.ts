import { applyMiddleware, combineReducers, createStore } from "redux"

// Not using the developmentOnly version as it only handles the "production" profile
// I want instead to exactly replicate same configuration for production and staging.
import { composeWithDevTools } from "redux-devtools-extension"

import { combineEpics, createEpicMiddleware } from "redux-observable"

import thunk from "redux-thunk"

import historyReducer from "./history/reducer"
import { HistoryState } from "./history/types"

import { lookupSuggestions } from "./location/city/epics"
import { cityReducer } from "./location/city/reducer"
import { CityState } from "./location/city/types"

import { countryReducer } from "./location/country/reducer"
import { CountryState } from "./location/country/types"

import mapReducer from "./map/reducer"
import { MapState } from "./map/types"
  
export interface AppState {
    cityState: CityState
    countryState: CountryState
    historyState: HistoryState
    mapState: MapState
}

const reducers = combineReducers<AppState>({
    cityState: cityReducer,
    countryState: countryReducer,
    historyState: historyReducer,
    mapState: mapReducer
})

const epics = combineEpics(lookupSuggestions)

const epicMiddleware = createEpicMiddleware()
let storeEnhancer = applyMiddleware(
    thunk, // Has to be placed before the redux-observable middleware
    epicMiddleware
)

if (process.env.REACT_APP_PROFILE === "development") {
    const composeEnhancer = composeWithDevTools({ name: "Weather In The World" })
    storeEnhancer = composeEnhancer(storeEnhancer)
}

export default createStore(reducers, storeEnhancer)

epicMiddleware.run(epics)
