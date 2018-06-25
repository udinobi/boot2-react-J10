import React from "react"

import { Option } from "ts-option"

import { frmt } from "./WeatherContainer"

import { MediumText } from "../lib/StyledText"

export interface Data {
    lastUpdate: Option<Date>
}

const days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]

const time = (dt: Date) => {
    const gmt = -Math.round(dt.getTimezoneOffset() / 60)
    const est = gmt < 0 ? "" : "+"
    return `${dt.getHours()}:${frmt(dt.getMinutes())}:${frmt(dt.getSeconds())} GMT${est}${gmt}`
}

export default (props: Data) => 
    props.lastUpdate
        .map(_ => (
            <MediumText>
                {days[_.getDay()]} {"\u00A0"}
                <span style={{ fontFamily: "Roboto, sans-serif" }}>
                    {time(_)}
                </span>
                {"\u00A0"} (last update)
            </MediumText>
        ))
        .getOrElse(<span />)
    
