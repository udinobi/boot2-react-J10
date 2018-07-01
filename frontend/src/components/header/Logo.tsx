import React from "react"
import styled, { keyframes } from "styled-components"

import logo from "../../assets/logo.png"

const rotate360 = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`

const Logo = styled.img`
    animation: ${rotate360} infinite 120s linear;
    height: 80px;
    &:hover {
        animation: ${rotate360} infinite 1.5s linear;
    }
    z-index: 10;
    margin-left: 12px;
    margin-top: 12px;
`

export default () =>
    <Logo src={logo} alt="'Weather In The World' logo"/>
