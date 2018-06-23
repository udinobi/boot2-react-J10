import React from "react"

import styled from "styled-components"

import { MediumText } from "../lib/StyledText"

import { Weather } from "../../store/weather/types"

export interface Data {
    weather: Weather[]
}

const camelCase = (s: string) =>
    s.replace(
        /\w\S*/g,
        (txt: string) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    )

const StyledDescription = styled(MediumText)`
    color: orange;
    margin: 6px 0 12px;
`

export default (props: Data) => 
    <StyledDescription>
        { props.weather.length > 0
            ? camelCase(props.weather[0].description)
            : ""
        }
    </StyledDescription>
