import { Epic, ofType } from "redux-observable"
import { of } from "rxjs"
import { ajax } from "rxjs/ajax"
import { catchError, map, switchMap, takeUntil } from "rxjs/operators"

import { weatherDataFailure, weatherDataRetrieved } from "./actions"

import {
    WeatherActions, WeatherActionType, WeatherData,
    WeatherDataRetrieveAction, WeatherDataRetrievedAction
} from "./types"

import { HistoryActionType } from "../history/types"

import { CityActionType, Location } from "../location/city/types"


const url = "http://api.openweathermap.org/data/2.5/weather?lat="

const composeUrl = (p: { location: Location, owmApiKey: string }) => {
    const coord = p.location.coord
    return encodeURI(`${url}${coord.lat}&lon=${coord.lon}&units=metric&APPID=${p.owmApiKey}`)
}

const retrieveWeatherData: Epic<WeatherDataRetrieveAction | WeatherActions> = action$ =>
    action$.pipe(
        ofType(WeatherActionType.WEATHER_DATA_RETRIEVE),
        switchMap<WeatherDataRetrieveAction, WeatherDataRetrievedAction>(action =>
            ajax.getJSON<WeatherData>(composeUrl(action.payload))
                .pipe(
                    map(weatherData => weatherDataRetrieved(action.payload.location, weatherData)),
                    takeUntil(action$.pipe(
                        ofType(CityActionType.LOCATION_SELECTED),
                        ofType(HistoryActionType.LOCATION_RELOAD)
                    )),
                    catchError(error => of(weatherDataFailure()))
                )
        )
    )

export default retrieveWeatherData