import { Col, Row } from "antd"
import React from "react"
import ReactTooltip from 'react-tooltip'

import City from "../../containers/location/City"
import Countries from "../../containers/location/Countries"
import ReloadCountries from "../../containers/location/ReloadCountries"

export default () => (
    <div className="section">
        <div className="title-border">
            <h1 className="title">Please, enter the location you want the weather report for</h1>
        </div>
        <div className="grid-overflow">
            <Row>
                <Col xs={24} sm={24} md={24} lg={12} style={{ marginBottom: 6, textAlign: "center" }}>
                    <label>Country</label>
                </Col>
            </Row>
            <Row>
                <Col xs={20} sm={20} md={20} lg={12}>
                    <Countries />
                </Col>
                {/* Even with hidden overflow, I was not able to use gutter for Row, so... inline styling */}
                <Col span={2} style={{ marginLeft: 16, marginTop: 2 }}>
                    <ReloadCountries />
                    <ReactTooltip id="ReloadCountries">
                        <div>Reload available countries</div>
                        <div>(because a new country was</div>
                        <div>&nbsp;probably added to the DB)</div>
                    </ReactTooltip>
                </Col>
            </Row>
            <Row style={{ marginTop: 28 }}>
                <Col xs={24} sm={24} md={24} lg={12} style={{ marginBottom: 6, textAlign: "center" }}>
                    <label>City</label>
                </Col>
            </Row>
            <Row>
                <Col xs={20} sm={20} md={20} lg={12}>
                    <City />
                </Col>
            </Row>
        </div>
    </div>
)
