import { none, option } from "ts-option"

import { HistoryActions, HistoryActionType, HistoryItem, HistoryState } from "./types"

import { CityActionType, Location } from "../location/city/types"

import { WeatherActionType, WeatherData } from "../weather/types"

export const initialHistoryState: HistoryState = {
    items: []
}

const locationSelected = (items: HistoryItem[], location: Location) => {
    const inHistory = option(items.find(_ => _.location.geoId === location.geoId))
    return inHistory.isDefined
        ? items
        : [ {
                lastUpdate: none,
                location,
                weatherData: none
            }, ...items
        ]
}

const removeLocation = (items: HistoryItem[], location: Location) =>
    items.filter(_ => _.location.geoId !== location.geoId)

const updateWeatherData = (items: HistoryItem[], location: Location, weatherData: WeatherData) => {
    let found = false
    const newItem = {
        lastUpdate: option(new Date()),
        location,
        weatherData: option(weatherData)
    }

    // Have to keep the order of the items in the history.
    const newItems = items.map(_ => {
        if (_.location.geoId !== location.geoId) {
            return _
        }

        found = true
        return newItem
    })

    if (!found) {
        // Was the location item removed before getting back the weather data from OWM ?
        newItems.push(newItem)
    }

    return newItems
}

const reducer = (state = initialHistoryState, action: HistoryActions) => {
    switch (action.type) {
        case CityActionType.LOCATION_SELECTED:
            return {
                items: locationSelected(state.items, action.payload.location)
            }

        case HistoryActionType.LOCATION_REMOVE:
            return {
                items: removeLocation(state.items, action.payload.location)
            }

        case WeatherActionType.WEATHER_DATA_RETRIEVED:
            return {
                items: updateWeatherData(
                    state.items,
                    action.payload.location,
                    action.payload.weatherData
                )
            }

        default:
            return state
    }
}

export default reducer