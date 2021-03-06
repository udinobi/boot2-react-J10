import { Col, Layout, Row } from "antd"

import * as React from "react"

import styled from "styled-components"

import History from "../components/history/Container"
import Location from "../components/location/Container"
import Map from "../components/map/Container"
import WeatherReport from "../components/weather/Container"

const gutter = { xs: 8, sm: 16, md: 24, lg: 100 }

const StyledCol = styled(Col)`
    @media (max-width: 992px) {
        margin-top: 20px;
    }
`

const StyledRow = styled(Row)`
    margin-top: 20px;
`

const WeatherContainer = styled(Layout.Content)`
@media (max-width: 459px) {
    padding: 0 12px;
}
@media (min-width: 460px) {
    padding: 0 50px;
}
`

export default () => (
    <WeatherContainer>
        <div className="grid-overflow">
            <StyledRow gutter={gutter}>
                <StyledCol xs={24} sm={24} md={24} lg={12}>
                    <Location />
                </StyledCol>
                <StyledCol xs={24} sm={24} md={24} lg={12}>
                    <WeatherReport />
                </StyledCol>
            </StyledRow>
            <StyledRow gutter={gutter}>
                <StyledCol xs={24} sm={24} md={24} lg={8}>
                    <History />
                </StyledCol>
                <StyledCol xs={24} sm={24} md={24} lg={16}>
                    <Map />
                </StyledCol>
            </StyledRow>
        </div>
    </WeatherContainer>
)
