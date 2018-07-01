import { Action } from "redux"

import { Option } from "ts-option"

import { Location } from "../location/city/types"

import { MapAndWeatherActions, MapAndWeatherState } from "../mapAndWeather/types"

export interface Weather {
    description: string
    icon: string
    id: number
    main: string
}

export interface WeatherData {
    base?: string
    clouds?: {
        all: number
    }
    cod?: number
    coord: {
        lat: number
        lon: number
    }
    dt?: number
    id?: number
    main: {
        grnd_level: number
        humidity: number
        pressure: number
        sea_level: number
        temp: number
        temp_max: number
        temp_min: number
    }
    name?: string
    rain?: {
        h3: string
        val: number
    }
    snow?: {
        h3: string
        val: number
    }
    sys: {
        sunrise: number
        sunset: number
    }
    visibility?: number
    weather: Weather[]
    wind?: {
        deg: number
        speed: number
    }
}

export interface WeatherState extends MapAndWeatherState {
    askingWeatherDataToOWM: boolean
    lastUpdate: Option<Date>
    weatherData: Option<WeatherData>
}

export enum WeatherActionType {
    WEATHER_DATA_FAILURE = "WEATHER_DATA_FAILURE",
    WEATHER_DATA_RETRIEVE = "WEATHER_DATA_RETRIEVE",
    WEATHER_DATA_RETRIEVED = "WEATHER_DATA_RETRIEVED"
}

export interface WeatherDataFailureAction extends Action {
    type: WeatherActionType.WEATHER_DATA_FAILURE
}

export interface WeatherDataRetrieveAction extends Action {
    type: WeatherActionType.WEATHER_DATA_RETRIEVE,
    payload: {
        location: Location
        owmApiKey: string
    }
}

export interface WeatherDataRetrievedAction extends Action {
    type: WeatherActionType.WEATHER_DATA_RETRIEVED
    payload: {
        location: Location
        weatherData: WeatherData
    }
}

export type WeatherActions =
    MapAndWeatherActions | WeatherDataFailureAction | WeatherDataRetrievedAction
