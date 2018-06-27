import { Route } from "react-router-dom"

import * as React from "react"

import About from "../pages/About"
import Weather from "../pages/Weather"

export default () => (
    <div>
        {/* tslint:disable:jsx-boolean-value */}
        <Route exact path="/" component={Weather} />
        <Route path="/about" component={About} />
    </div>
)
