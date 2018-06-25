import React from "react"

import styled from "styled-components"

import { SmallerText } from "../lib/StyledText"

export interface Data {
    sunrise: string
}

const Sunrise = styled(SmallerText)`
    display: inline;
    font-family: "Roboto", "sans-serif";
`

const Icon = styled.i`
    color: #EE671E;
    font-size: 1.4rem;
    padding-right: 8px;
    margin-top: 20px;
`

export default (props: Data) => 
    <div>
        <Icon className="wi wi-sunrise" />
        <Sunrise>{props.sunrise}</Sunrise>
    </div>
