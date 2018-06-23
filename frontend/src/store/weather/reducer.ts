import { None, Option, Some } from "tsoption"

import { WeatherActions, WeatherActionType, WeatherData, WeatherState } from "./types"

import { HistoryActionType } from "../history/types"

import { CityActionType, Location } from "../location/city/types"

export const initialState: WeatherState = {
    askingWeatherDataToOWM: false,
    location: None.of<Location>(),
    requestTime: None.of<Date>(),
    weatherData: None.of<WeatherData>()
}

// In minutes 
const weatherUpdateInterval =
    +Option.of(process.env.REACT_APP_WEATHER_UPDATE_INTERVAL).getOrElse("30") * 60 * 1000

const isExpired = (state: WeatherState) =>
    state.requestTime
        .map(rt => Date.now() >= rt.getTime() + weatherUpdateInterval)
        .getOrElse(true)

const newState = (location: Location, resetRequestTime: boolean) => ({
    askingWeatherDataToOWM: true,
    location: Option.of<Location>(location),
    requestTime: resetRequestTime ? None.of<Date>() : Some.of(new Date()),
    weatherData: None.of<WeatherData>()
})

const locationSelected = (state: WeatherState, location: Location) =>
    // State is not altered if the selected location is equal to the current one
    // and time of last weather update from openweathermap for the location
    // was taken not more than REACT_APP_WEATHER_UPDATE_INTERVAL minutes ago.
    // In this case we return the original state instance.
    state.location
        .map(_ => _.geoId !== location.geoId || isExpired(state)
            ? newState(location,  _.geoId !== location.geoId)
            : state
        )
        .getOrElse(newState(location, true))

const reducer = (state = initialState, action: WeatherActions) => {
    switch (action.type) {
        case CityActionType.LOCATION_SELECTED:
        case HistoryActionType.LOCATION_RELOAD:
            return locationSelected(state, action.payload.location)

        case WeatherActionType.WEATHER_DATA_FAILURE:
            return {
                ...state,
                askingWeatherDataToOWM: false,
            }
    
        case WeatherActionType.WEATHER_DATA_RETRIEVED:
            return {
                askingWeatherDataToOWM: false,
                location: Option.of(action.payload.location),
                requestTime: Option.of(new Date()),
                weatherData: Option.of(action.payload.weatherData)
            }

        default:
            return state
    }
}

export default reducer