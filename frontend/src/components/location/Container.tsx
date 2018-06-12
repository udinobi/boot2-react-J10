import React from "react"

// import styled from "styled-components"

import Section from "../Section"

import Countries from "./Countries"

class Container extends React.Component {

    public render() {
        return (
            <Section>
                <h1 className="title">Please, enter the location you want the weather report for</h1>
                <Countries />
            </Section>
        )
    }
}

export default Container
