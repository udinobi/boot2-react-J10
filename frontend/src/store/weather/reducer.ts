import { none, option, Option } from "ts-option"

import { WeatherActions, WeatherActionType, WeatherData, WeatherState } from "./types"

import { HistoryActionType, HistoryItem } from "../history/types"

import { CityActionType, Location } from "../location/city/types"

export const initialState: WeatherState = {
    askingWeatherDataToOWM: false,
    lastUpdate: none,
    location: none,
    weatherData: none
}

// In minutes 
const weatherUpdateInterval =
    +option(process.env.REACT_APP_WEATHER_UPDATE_INTERVAL).getOrElse("30") * 60 * 1000

const resetLastUpdate = (isTrueCondition: boolean) => isTrueCondition
    ? none
    : option(new Date())

const isWeatherDataExpired = (weatherData: Option<WeatherData>, lastUpdate: Option<Date>) =>
    weatherData.isEmpty || lastUpdate
        .map(lu => Date.now() >= lu.getTime() + weatherUpdateInterval)
        .getOrElse(true)

const newStateIfDifferentHistoryLocation = (state: WeatherState, history: HistoryItem) =>
    state.location
        .map(_ => _.geoId === history.location.geoId
            ? state
            : newStateFromHistory(history)
        )
        .getOrElse(newStateFromHistory(history))

const reducer = (state = initialState, action: WeatherActions) => {
    switch (action.type) {
        case HistoryActionType.LOCATION_RELOAD:
            return locationReloaded(state, action.payload.history)

        case CityActionType.LOCATION_SELECTED:
            return locationSelected(state, action.payload.location)

        case WeatherActionType.WEATHER_DATA_FAILURE:
            return {
                ...state,
                askingWeatherDataToOWM: false,
            }
    
        case WeatherActionType.WEATHER_DATA_RETRIEVED:
            return {
                askingWeatherDataToOWM: false,
                lastUpdate: option(new Date()),
                location: option(action.payload.location),
                weatherData: option(action.payload.weatherData)
            }

        default:
            return state
    }
}

export default reducer


// State is not altered if the selected location is equal to the current one
// and time of last weather update from openweathermap for the location
// was taken not more than REACT_APP_WEATHER_UPDATE_INTERVAL minutes ago.
// In this case we return the original state instance.

const locationReloaded = (state: WeatherState, history: HistoryItem) =>
    isWeatherDataExpired(history.weatherData, history.lastUpdate)
        ? newStateAndAskWeatherDataToOWM(history.location, history.lastUpdate)
        : newStateIfDifferentHistoryLocation(state, history)

const locationSelected = (state: WeatherState, location: Location) =>
    state.location
        .map(_ => _.geoId === location.geoId &&
                  !isWeatherDataExpired(state.weatherData, state.lastUpdate)
            ? state
            : newStateAndAskWeatherDataToOWM(location,  resetLastUpdate(_.geoId !== location.geoId))
        )
        .getOrElse(newStateAndAskWeatherDataToOWM(location, resetLastUpdate(true)))

const newStateFromHistory = (history: HistoryItem) => ({
    askingWeatherDataToOWM: false,
    lastUpdate : history.lastUpdate,
    location: option(history.location),
    weatherData: history.weatherData
})

const newStateAndAskWeatherDataToOWM = (location: Location, lastUpdate: Option<Date>) => ({
    askingWeatherDataToOWM: true,
    lastUpdate,
    location : option(location),
    weatherData: none
})
