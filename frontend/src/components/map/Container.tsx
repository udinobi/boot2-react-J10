import React from "react"

import MapContainer from "../../containers/map/Map"

export default () => (
    <div>
        <div className="title-border map">
            <h1 className="title">Map</h1>
        </div>
        <div>
            <MapContainer />
        </div>
    </div>
)
