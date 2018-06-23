import { ActionCreator } from "redux"

import {
    WeatherActionType, WeatherData, WeatherDataFailureAction,
    WeatherDataRetrieveAction, WeatherDataRetrievedAction } from "./types"

import { Location } from "../location/city/types"

// WeatherDataFailureAction ------------------------------------------------------------------------

export const weatherDataFailure: ActionCreator<WeatherDataFailureAction> = () => ({
    type: WeatherActionType.WEATHER_DATA_FAILURE
})

// WeatherDataRetrieveAction -----------------------------------------------------------------------

export const weatherDataRetrieve: ActionCreator<WeatherDataRetrieveAction> =
    (location: Location, owmApiKey: string) => ({
        payload: { location, owmApiKey },
        type: WeatherActionType.WEATHER_DATA_RETRIEVE
    })

// WeatherDataRetrievedAction ----------------------------------------------------------------------

export const weatherDataRetrieved: ActionCreator<WeatherDataRetrievedAction> =
    (location: Location, weatherData: WeatherData) => ({
        payload: { location, weatherData },
        type: WeatherActionType.WEATHER_DATA_RETRIEVED
    })

// Action mapping ----------------------------------------------------------------------------------

export interface WeatherDispatchProps {
    weatherDataRetrieve: typeof weatherDataRetrieve
}

export const mapWeatherDispatchToProps = {
    weatherDataRetrieve
}
