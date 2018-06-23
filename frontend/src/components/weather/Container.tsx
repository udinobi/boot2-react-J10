import React from "react"

import WeatherComponent from "../../containers/weather/Weather"

export default () => (
    <div>
        <div className="title-border">
            <h1 className="title">Weather Report</h1>
        </div>
        <div>
            <WeatherComponent />
        </div>
    </div>
)
