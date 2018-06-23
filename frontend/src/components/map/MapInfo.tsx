import ol from "ol"
import Proj from "ol/proj"

import React from "react"

import styled from "styled-components"

export interface MapInfoState {
    // The coordinate system OpenLayers uses by default for the map view is (Web Mercator EPSG: 3857).
    coord: ol.Coordinate
    zoom: number
}

const CoordInfo = styled.span`
    padding-left: 38px;
`

const MapInfo = styled.div`
    @media (max-width: 576px) {
        font-size: 0.9rem;
    }
    padding-bottom: 6px;
`
                                                   // 'EPSG:3857' -> 'EPSG:4326'
const toLonLat = (coord: [number, number]) => Proj.toLonLat([ coord[0], coord[1] ])

export default (props: MapInfoState) => {
    const coord = toLonLat(props.coord)
    return <MapInfo>
        zoom level ({props.zoom})
        <CoordInfo>[ {coord[1].toPrecision(8)}, {"\u00a0"}{coord[0].toPrecision(9)} ]</CoordInfo>
    </MapInfo>
}
