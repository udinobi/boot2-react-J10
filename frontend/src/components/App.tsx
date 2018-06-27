import { Layout } from "antd"

import React from "react"

import styled from "styled-components"

import Content from "./Content"

import Header from "./header/Header"

class App extends React.Component {

    private readonly AppLayout = styled(Layout)`
        background: #ffffff;
        height: 100%;
    `

    public render() {
        return (
            <this.AppLayout>

                <Header />

                <Content />

            </this.AppLayout>
        )
    }
}

export default App
