import { Col, Row } from "antd"
import React from "react"
import ReactTooltip from 'react-tooltip'

import styled from "styled-components"

import City from "../../containers/location/City"
import Countries from "../../containers/location/Country"

import ReloadCountries from "./ReloadCountries"

const StyledCol = styled(Col)`
    @media (min-width: 1200px) {
      left: 4%;
    }
    @media (min-width: 1600px) {
      left: 8;
    }
    min-height: 180px;
    position: relative;
`

export default () => (
    <div>
        <Row>
            <div className="title-border">
                <h1 className="title">Location</h1>
            </div>
        </Row>
        <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={14} xxl={15} style={{ minHeight: 180 }}>
                <Row style={{ marginBottom: 6, textAlign: "center" }}>
                    <Col span={22}>
                        <label>Country</label>
                    </Col>
                </Row>
                <Row>
                    <Col xs={21} sm={21} md={21} lg={22}>
                        <Countries />
                    </Col>
                    {/* Even with hidden overflow, I was not able to use gutter for Row, so... rescue to inline styling */}
                    <Col span={1} />
                    <Col xs={2} sm={2} md={2} lg={1} style={{ marginTop: 2 }}>
                        <ReloadCountries />
                        <ReactTooltip id="ReloadCountries">
                            <div>Reload available countries</div>
                            <div>(because a new country was</div>
                            <div>&nbsp;probably added to the DB)</div>
                        </ReactTooltip>
                    </Col>
                </Row>
                <Row style={{ marginBottom: 6, marginTop: 28, textAlign: "center" }}>
                    <Col xs={21} sm={21} md={21} lg={22}>
                        <label>City</label>
                    </Col>
                </Row>
                <Row>
                    <Col xs={21} sm={21} md={21} lg={22}>
                        <City />
                    </Col>
                </Row>
            </Col>
            <Col xs={0} sm={0} md={0} lg={0} xl={1} xxl={2} />
            <StyledCol xs={0} sm={0} md={0} lg={0} xl={9} xxl={7}>
                <div style={{ fontSize : "1rem", position: "absolute", textAlign: "right", top: "60%", transform: "translateY(-50%)", width: "100%" }}>
                    Please, select here the location
                    you want the weather report for.
                </div>
            </StyledCol>
        </Row>
    </div>
)
