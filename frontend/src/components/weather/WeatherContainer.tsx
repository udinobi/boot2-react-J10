import React from "react"

import { Option } from "tsoption"

import Description from "./Description"
import LastUpdate from "./LastUpdate"
import Temperature from "./Temperature"

import { LargeText } from "../lib/StyledText"

import { Location } from "../../store/location/city/types"

import { WeatherData } from "../../store/weather/types"

export interface Data {
    location: Location
    requestTime: Option<Date>
    weatherData: WeatherData
}

export default (props: Data) => 
    <div>
        <LargeText>{props.location.name} {"\u00a0"}({props.location.country.code})</LargeText>
        <LastUpdate requestTime={props.requestTime} />
        <Description weather={props.weatherData.weather} />
        <Temperature weatherData={props.weatherData} />
    </div>
