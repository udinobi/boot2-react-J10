import React from "react"

import WeatherContainer from "./WeatherContainer"

import CenteredDiv from "../lib/CenteredDiv"

import { WeatherState } from "../../store/weather/types"

export default (props: WeatherState) => 
    props.location.map(location =>
        props.weatherData
            .map(weatherData => <WeatherContainer
                /* tslint:disable:jsx-key */
                    location={location}
                    requestTime={props.requestTime}
                    weatherData={weatherData}
                />
            )
            .getOrElse(<CenteredDiv>No weather information available!</CenteredDiv>)
    )
    .getOrElse(<div />)
