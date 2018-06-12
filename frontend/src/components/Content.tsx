import { Col, Row } from "antd"

import React from "react"

import styled from "styled-components"

import History from "./history/Container"
import Location from "./location/Container"
import Map from "./map/Container"
import WeatherReport from "./weather/Container"

class Content extends React.Component {

    private readonly content = styled.div`
        overflow: hidden;
        text-align: center;
    `

    private readonly row = styled(Row)`
        margin-top: 42px;
    `

    private readonly gutter = { xs: 8, sm: 16, md: 24, lg: 32 }

    public render() {
        return (
            <this.content>
                <this.row gutter={this.gutter}>
                    <Col xs={24} sm={24} md={24} lg={12}>
                        <Location />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12}>
                        <WeatherReport />
                    </Col>
                </this.row>
                <this.row gutter={this.gutter}>
                    <Col xs={24} sm={24} md={24} lg={8}>
                        <History />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={16}>
                        <Map />
                    </Col>
                </this.row>
            </this.content>
        )
    }
}

export default Content
