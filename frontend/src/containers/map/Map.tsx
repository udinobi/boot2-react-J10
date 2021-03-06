import ol from "ol"
import sync from "ol-hashed"
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

import MapInfo, { MapInfoState } from "../../components/map/MapInfo"

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

type MapState = MapAndWeatherState & MapInfoState

// Ughh! Global flags
let stillToSync = true
let getCurrentPosition = true

class MapComponent extends React.Component<any, MapState> {

    private readonly map: Map

    private readonly markerSource = new SourceVector()

    private readonly view: View

    constructor(props: any) {
        super(props)

        this.state = {
            coord: this.initialCoords(),
            location: initialState.location,
            zoom: minZoomLevel
        }

        this.map = new Map({
            controls: Control.defaults({ attributionOptions: { collapsible: false } }),
            layers: [
                new TileLayer({ source: this.source() }),
                new LayerVector({ source: this.markerSource, style: this.markerStyle() }),
            ],
            target: undefined,
            view: new View({
                center: this.state.coord,
                zoom: minZoomLevel
            })
        })

        if (stillToSync) {
            stillToSync = false
            sync(this.map)
        }

        this.view = this.map.getView()
    }

    public componentDidMount() {
        this.map.setTarget("map")

        // Listen to map changes
        this.map.on("moveend", () => {
            this.setState({
                coord: this.view.getCenter(),
                zoom: setZoomLevel(this.view.getZoom())
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

            const coord = this.fromLonLat([ +location.coord.lat, +location.coord.lon ])

            this.setState({
                coord,
                location: option(location),
                zoom
            })

            this.addMarker(location.name, coord)
        })
    }

    public render() {
        const height = historyAndMapHeight
        return (
            <MapContainer>
                <MapInfo coord={this.state.coord} zoom={this.state.zoom} />
                <div id="map" style={{ height, width: "100%" }} />
            </MapContainer>
        )
    }

    private addMarker = (name: string, coord: ol.Coordinate) => this.markerSource.addFeature(new Feature({
        geometry: new Point(coord),
        name
    }))
      
                                                           // 'EPSG:4326' -> 'EPSG:3857'
    private fromLonLat = (coord: [number, number]) => Proj.fromLonLat([ coord[1], coord[0] ])

    private initialCoords = (): ol.Coordinate => {
        let coords = this.fromLonLat([48.2082, 16.3738])  // Arbitrary... Vienna, AT :)
  
        if (getCurrentPosition) {
            getCurrentPosition = false
                navigator.geolocation.getCurrentPosition(
                pos => coords = this.fromLonLat([ pos.coords.latitude, pos.coords.longitude ]),
                () => alert("Sadly, your browser cannot\nretrieve your current position.\nYou can check it out at:\nhttps://html5demos.com/geo/"),
                {
                    enableHighAccuracy: true,
                    maximumAge: 0,
                    timeout: 8000
                }
            )
        }

        return coords  
    }

    private markerStyle = () => new Style({
        image: new Icon({
            anchor: [0.5, 46],
            anchorXUnits: "fraction",
            anchorYUnits: "pixels",
            opacity: 1,
            // src: "https://openlayers.org/en/v4.6.5/examples/data/icon.png"
            src: require("assets/marker.png")
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

const MapContainer = styled.div`
    @media (max-width: 991px) {
        margin-bottom: 18px;
    }
`

const mapStateToProps = (state: AppState): MapAndWeatherState => ({
    location: state.mapState.location
})

export default connect(mapStateToProps)(MapComponent)

/* to animate the moving between 2 places you can use...
       map.getView().animate({center: coords, zoom: 10})
*/
