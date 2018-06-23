import React from "react"

import styled from "styled-components"

import { Sys, WeatherData } from "../../store/weather/types"

export interface Data {
    weatherData: WeatherData
}

const Celsius = styled.sup`
    color: #212121;
    font-size: 28px;
`

const Degrees = styled.span`
    color: #212121;
    font-size: 64px;
    padding-right: 6px;
`

const Icon = styled.i`
    font-size: 64px;
    padding-right: 22px;
`

const iconClass = (sys: Sys) => {
    const now = Math.floor(Date.now() / 1000)
    return now >= sys.sunrise && now <= sys.sunset ? "day" : "night"
}

const icon = (weatherData: WeatherData) =>
    weatherData.weather.length > 0
        ? <Icon className={`wi wi-owm-${iconClass(weatherData.sys)}-${weatherData.weather[0].id}`} />
        : <div style={{ height: 64, paddingRight: 22, width: 64 }} />

export default (props: Data) => 
    <div>
        {icon(props.weatherData)}
        <Degrees>{Math.round(props.weatherData.main.temp)}</Degrees>
        <Celsius>°C</Celsius>
    </div>
