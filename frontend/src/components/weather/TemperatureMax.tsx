import React from "react"

import styled from "styled-components"

import { SmallerText } from "../lib/StyledText"

export interface Data {
    maxTemperature: number
}

const Span = styled.span`
    font-family: "Roboto", "sans-serif";
`

const MaxTemperature = styled(SmallerText)`
    display: inline;
`

const Icon = styled.i`
    color: #F21822;
    font-size: 1.4rem;
    padding-right: 10px;
    padding-left: 3px;
`

export default (props: Data) => 
    <div style={{ marginTop: 6 }}>
        <Icon className="wi wi-thermometer" />
        <MaxTemperature>
            <Span>{Math.round(props.maxTemperature)}</Span>
            <sup>°C</sup> {"\u00A0"}(max.)
        </MaxTemperature>
    </div>
