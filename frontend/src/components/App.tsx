import { Layout } from "antd"

import React from "react"

import styled from "styled-components"

import logo from "../assets/logo.png"

import Content from "./Content"

import Logo from "./header/Logo"
import Title from "./header/Title"

class App extends React.Component {

    private readonly AppLayout = styled(Layout)`
        background: #ffffff;
        height: 100%;
    `

    private readonly ContentContainer = styled(Layout.Content)`
        @media (max-width: 459px) {
            padding: 0 12px;
        }
        @media (min-width: 460px) {
            padding: 0 50px;
        }
    `

    private readonly Header = styled(Layout.Header)`
        background-color: #111;
        height: 64px;
        @media (max-width: 459px) {
            padding: 0;
        }
        @media (min-width: 460px) {
            padding: 0 50px;
        }
    `

    public render() {
        return (
            <this.AppLayout>

                <this.Header>
                    <Logo src={logo} alt="'Weather In The World' logo"/>
                    <Title>Weather In The World</Title>
                </this.Header>

                <this.ContentContainer>
                    <Content />
                </this.ContentContainer>

            </this.AppLayout>
        )
    }
}

export default App
