import { Col, Row } from "antd"

import React from "react"

import Countries from "../../containers/location/Countries"

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
                <Col xs={24} sm={24} md={24} lg={12}>
                    <Countries />
                </Col>
            </Row>
        </div>
    </div>
)
