import ol from "ol"
import Proj from "ol/proj"

import React from "react"

import styled from "styled-components"

import { num2Text } from "../../lib/utils"

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
        <CoordInfo>
            [ {num2Text(coord[1], 8)}, {"\u00a0"}{num2Text(coord[0], 9)} ]
        </CoordInfo>
    </MapInfo>
}
