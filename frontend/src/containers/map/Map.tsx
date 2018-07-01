import ol from "ol"
import Control from "ol/control"
import Feature from "ol/feature"
import Point from "ol/geom/point"
import TileLayer from "ol/layer/tile"
import LayerVector from "ol/layer/vector"
import Map from "ol/map"
import Proj from "ol/proj"
import SourceOSM from "ol/source/osm"
import SourceVector from "ol/source/vector"
import XYZSource from "ol/source/xyz"
import Icon from "ol/style/icon"
import Style from "ol/style/style"
import View from "ol/view"

import React from "react"
import { connect } from "react-redux"

import styled from "styled-components"

import { option } from "ts-option"

import marker from "../../assets/marker.png"

import MapInfo, { MapInfoState } from "../../components/map/MapInfo"

import synchronize from "../../lib/ol-hashed"

import { AppState } from "../../store/store"

import { initialState } from "../../store/map/reducer"

import { MapAndWeatherState } from "../../store/mapAndWeather/types"


export const historyAndMapHeight = option(process.env.REACT_APP_HISTORY_AND_MAP_HEIGHT)
    .getOrElse("360px")

const minZoomLevel = +option(process.env.REACT_APP_MIN_MAP_ZOOM_LEVEL).getOrElse("2")

const setZoomLevel = (zoom: number) => zoom < minZoomLevel ? minZoomLevel : zoom

const zoomOnLocationChange =
    setZoomLevel(+option(process.env.REACT_APP_LOCATION_MAP_ZOOM_LEVEL).getOrElse("11"))

const provider = option(process.env.REACT_APP_MAP_TILES_PROVIDER as string)
    .getOrElse("osm")
    .toLowerCase()
                                                        // 'EPSG:4326' -> 'EPSG:3857'
const fromLonLat = (coord: [number, number]) => Proj.fromLonLat([ coord[1], coord[0] ])

const initialCoords = (): ol.Coordinate => {
    let coords = fromLonLat([48.2082, 16.3738])  // Arbitrary... Vienna, AT :)

    if (getCurrentPosition) {
        getCurrentPosition = false
        if (navigator) {
            navigator.geolocation.getCurrentPosition(
                pos => coords = fromLonLat([ pos.coords.latitude, pos.coords.longitude ]),
                () => alert("Sadly, your browser cannot\nretrieve your current position.\nYou can check it out at:\nhttps://html5demos.com/geo/"),
                {
                    enableHighAccuracy: true,
                    maximumAge: 0,
                    timeout: 8000
                }
            )
        }
    }

    return coords  
}

const mapInfoState: MapInfoState = {
    coord: initialCoords(),
    zoom: minZoomLevel
}

let getCurrentPosition = process.env.REACT_APP_PROFILE !== "testing"

type MapState = MapAndWeatherState & MapInfoState

export class MapContainer extends React.Component<any, MapState> {

    private readonly map: Map

    private readonly markerSource = new SourceVector()

    private readonly unregister: () => void

    private readonly view: View

    constructor(props: any) {
        super(props)

        this.state = {
            coord: mapInfoState.coord,
            location: initialState.location,
            zoom: mapInfoState.zoom
        }

        this.map = new Map({
            controls: Control.defaults({ attributionOptions: { collapsible: false } }),
            layers: [
                new TileLayer({ source: this.source() }),
                new LayerVector({ source: this.markerSource, style: this.markerStyle() }),
            ],
            target: undefined,
            view: new View()
        })

        this.unregister = synchronize(this.map)

        this.view = this.map.getView()
    }

    public componentDidMount() {
        this.map.setTarget("map")

        const coord = this.view.getCenter()
        if (coord[0] === 0 && coord[1] === 0) {
            this.updateMap()
        }

        // Listen to map changes
        this.map.on("moveend", () => {
            this.setState({
                coord: mapInfoState.coord = this.view.getCenter(),
                zoom: mapInfoState.zoom = setZoomLevel(this.view.getZoom())
            })
        })
    }

    public componentDidUpdate() {
        this.updateMap()
    }

    public componentWillReceiveProps(props: MapState) {
        props.location.map(location => {
            const zoom = this.state.zoom <= zoomOnLocationChange
                ? zoomOnLocationChange
                : this.state.zoom

            const coord = fromLonLat([ +location.coord.lat, +location.coord.lon ])

            this.setState({
                coord,
                location: option(location),
                zoom
            })

            this.addMarker(location.name, coord)
        })
    }

    public componentWillUnmount() {
        this.unregister()
    }

    public render() {
        const height = historyAndMapHeight
        return (
            <StyledMap>
                <MapInfo coord={this.state.coord} zoom={this.state.zoom} />
                <div id="map" style={{ height, width: "100%" }} />
            </StyledMap>
        )
    }

    private addMarker = (name: string, coord: ol.Coordinate) => this.markerSource.addFeature(new Feature({
        geometry: new Point(coord),
        name
    }))

    private markerStyle = () => new Style({
        image: new Icon({
            anchor: [0.5, 46],
            anchorXUnits: "fraction",
            anchorYUnits: "pixels",
            opacity: 1,
            // src: "https://openlayers.org/en/v4.6.5/examples/data/icon.png"
            src: marker
        })
    })

    private source = () => {
        switch (provider) {
            case "stamen" :
                return new XYZSource({
                    url: "http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg"
                })

            case "osm" :
            default :
                return new SourceOSM()
        }
    }

    private updateMap() {
        const state = this.state
        this.view.setCenter(state.coord)
        this.view.setZoom(state.zoom)
    }
}

const StyledMap = styled.div`
    @media (max-width: 991px) {
        margin-bottom: 18px;
    }
`

const mapStateToProps = (state: AppState): MapAndWeatherState => ({
    location: state.mapState.location
})

export default connect(mapStateToProps)(MapContainer)

/* to animate the moving between 2 places you can use...
       map.getView().animate({center: coords, zoom: 10})
*/
