import React from "react"

import styled from "styled-components"

import { SmallerText } from "../lib/StyledText"

export interface Data {
    humidity: number
}

const Humidity = styled(SmallerText)`
    display: inline;
    font-family: "Roboto", "sans-serif";
`

const Icon = styled.i`
    color: #1890FF;
    font-size: 1.4rem;
    padding-right: 8px;
`

export default (props: Data) => 
    <div style={{ marginTop: 20 }}>
        <Icon className="wi wi-humidity" />
        <Humidity>{props.humidity}%</Humidity>
    </div>
