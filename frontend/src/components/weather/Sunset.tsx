import React from "react"

import styled from "styled-components"

import { SmallerText } from "../lib/StyledText"

export interface Data {
    sunset: string
}

const Sunset = styled(SmallerText)`
    display: inline;
    font-family: "Roboto", "sans-serif";
`

const Icon = styled.i`
    color: #00008B;
    font-size: 1.4rem;
    padding-right: 8px;
`

export default (props: Data) => 
    <div>
        <Icon className="wi wi-sunset" />
        <Sunset>{props.sunset}</Sunset>
    </div>
