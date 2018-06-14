import { Col, Row } from "antd"

import React from "react"

import Countries from "../../containers/location/Countries"
import ReloadCountries from "../../containers/location/ReloadCountries"

export default () => (
    <div className="section">
        <div className="title-border">
            <h1 className="title">Please, enter the location you want the weather report for</h1>
        </div>
        <div className="grid-overflow">
            <Row>
                <Col xs={24} sm={24} md={24} lg={12} style={{ marginBottom: 8 }}>
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
                </Col>
            </Row>
        </div>
    </div>
)
