import React from "react"

import { Option } from "tsoption"

import { MediumText } from "../lib/StyledText"

export interface Data {
    requestTime: Option<Date>
}

const days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]

export default (props: Data) => 
    <MediumText>
        {props.requestTime
            .map(_ => `${days[_.getDay()]} \u00a0 ${_.toTimeString()} \u00a0 (last update)`)
            .getOrElse("")
        }
    </MediumText>
