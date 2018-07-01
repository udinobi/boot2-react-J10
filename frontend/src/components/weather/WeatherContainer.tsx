import { Col, Row } from "antd"
import * as moment from "moment-timezone"
import React from "react"

import { option, Option } from "ts-option"

import Description from "./Description"
import Humidity from "./Humidity"
import LastUpdate from "./LastUpdate"
import Sunrise from "./Sunrise"
import Sunset from "./Sunset"
import Temperature from "./Temperature"
import TemperatureMax from "./TemperatureMax"
import TemperatureMin from "./TemperatureMin"

import { LargeText } from "../lib/StyledText"

import { Location } from "../../store/location/city/types"

import { WeatherData } from "../../store/weather/types"

export interface Data {
    location: Location
    lastUpdate: Option<Date>
    weatherData: WeatherData
}

export const frmt = (val: number) => ("0" + val).slice(-2)

export const time = (t: number) => {
    const dt = new Date(t)
    return `${frmt(dt.getUTCHours())}:${frmt(dt.getUTCMinutes())}:${frmt(dt.getUTCSeconds())}`
}

export default (props: Data) => {

    const offsetInMinutes = moment.tz(props.location.tz).utcOffset()
    const offsetInMillis = offsetInMinutes * 60 * 1000

    const sunrise = props.weatherData.sys.sunrise * 1000 + offsetInMillis
    const sunset = props.weatherData.sys.sunset * 1000 + offsetInMillis

    const offsetInHours = Math.round(offsetInMinutes / 60)
    const GMT = ` GMT${offsetInHours < 0 ? "" : "+"}${offsetInHours}`

    return <div>
        <Row>
            <LargeText>{props.location.name} {"\u00a0"}({props.location.country.code})</LargeText>
            <LastUpdate lastUpdate={props.lastUpdate} />
        </Row>
        <Row>
            <Col xs={24} sm={24} md={24} lg={15}>
                <Row>
                    <Col>
                        <Description weather={props.weatherData.weather} />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Temperature weatherData={option(props.weatherData)} />
                    </Col>
                    <Col span={12}>
                        <div style={{ float: "right", marginTop: 8 }}>
                            <Humidity humidity={props.weatherData.main.humidity} />
                            <TemperatureMin minTemperature={props.weatherData.main.temp_min} />
                            <TemperatureMax maxTemperature={props.weatherData.main.temp_max} />
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col xs={24} sm={24} md={24} lg={9}>
                <Sunrise sunrise={`${time(sunrise)}${GMT}`} />
                <Sunset sunset={`${time(sunset)}${GMT}`} />
            </Col>
        </Row>
    </div>
}
