import React from "react"

import styled from "styled-components"

import { Option } from "ts-option"

import { WeatherData } from "../../store/weather/types"

export interface Data {
    weatherData: Option<WeatherData>
}

const Celsius = styled.sup`
    color: #212121;
    font-size: 28px;
`

const Degrees = styled.span`
    color: #212121;
    font-family: "Roboto", "sans-serif";
    font-size: 64px;
    padding-right: 6px;
`

const Icon = styled.i`
    font-size: 64px;
    padding-right: 22px;
`

const dayIconColor = (temp: number) => {
    /* tslint:disable:curly */
    if (temp <  5) return "day-under-5-icon-color"
    if (temp < 12) return "day-under-12-icon-color"
    if (temp < 22) return "day-under-22-icon-color"
    if (temp < 32) return "day-under-32-icon-color"
    return "day-from-32-icon-color"
}

const iconClasses = (weatherData: WeatherData) => {
    const now = Math.floor(Date.now() / 1000)
    return now >= weatherData.sys.sunrise && now <= weatherData.sys.sunset
        ? `${dayIconColor(weatherData.main.temp)} wi wi-owm-day`
        : "night-icon-color wi wi-owm-night"
}

const icon = (weatherData: WeatherData) =>
    weatherData.weather.length > 0
        ? <Icon className={`${iconClasses(weatherData)}-${weatherData.weather[0].id}`} />
        : <div style={{ height: 64, paddingRight: 22, width: 64 }} />

export default (props: Data) =>
    props.weatherData.map(weatherData => (
        <div>
            {icon(weatherData)}
            <Degrees>{Math.round(weatherData.main.temp)}</Degrees>
            <Celsius>°C</Celsius>
        </div>
    ))
    .getOrElse(<div />)
