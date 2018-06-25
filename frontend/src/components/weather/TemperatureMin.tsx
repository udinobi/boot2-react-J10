import React from "react"

import styled from "styled-components"

import { SmallerText } from "../lib/StyledText"

export interface Data {
    minTemperature: number
}

const Span = styled.span`
    font-family: "Roboto", "sans-serif";
`

const MinTemperature = styled(SmallerText)`
    display: inline;
`

const Icon = styled.i`
    color: #0093DC;
    font-size: 1.4rem;
    padding-right: 10px;
    padding-left: 3px;
`

export default (props: Data) => 
    <div style={{ marginTop: 6 }}>
        <Icon className="wi wi-thermometer-exterior" />
        <MinTemperature>
            <Span>{Math.round(props.minTemperature)}</Span>
            <sup>°C</sup> {"\u00A0"}(min.)
        </MinTemperature>
    </div>
