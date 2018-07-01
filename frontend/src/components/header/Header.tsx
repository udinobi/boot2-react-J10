import { Layout } from "antd"

import React from "react"
import { NavLink } from "react-router-dom"

import styled from "styled-components"

import Logo from "./Logo"
import Title from "./Title"


const Header = styled(Layout.Header)`
    background-color: #111;
    border-bottom: 1px solid #1890FF;
    display: flex;
    height: 64px;
    @media (max-width: 459px) {
        padding: 0;
    }
    @media (min-width: 460px) {
        padding: 0 50px;
    }
`

const Nav = styled.nav`
    flex: 1;
    margin-left: 6em;
`

export default () => (
    <Header>
        <Logo />
        <Title>Weather In The World</Title>
        <Nav>
            {/* tslint:disable:jsx-boolean-value */}
            <NavLink to="/" exact activeClassName="active">Home</NavLink>
            <NavLink to="/about" activeClassName="active">About</NavLink>
        </Nav>
    </Header>
)
