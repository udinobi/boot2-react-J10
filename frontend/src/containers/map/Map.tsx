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

import { Option } from "tsoption"

import { AppState } from "../../store/store"

import { initialState } from "../../store/map/reducer"

import { MapState } from "../../store/map/types"


const minZoomLevel = +(process.env.REACT_APP_MIN_MAP_ZOOM_LEVEL as string)

const setZoomLevel = (zoom: number) => zoom < minZoomLevel ? minZoomLevel : zoom

const zoomOnLocationChange = setZoomLevel(+(process.env.REACT_APP_LOCATION_MAP_ZOOM_LEVEL as string))

interface OptionsState {
    // The coordinate system OpenLayers uses by default for the map view is (Web Mercator EPSG: 3857).
    coord: ol.Coordinate
    zoom: number
}

type MapOptionsState = MapState & OptionsState


class MapComponent extends React.Component<{}, MapOptionsState> {

    private readonly map: Map

    private readonly markerSource = new SourceVector()

    private readonly view: View

    constructor() {
        super({})

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

        sync(this.map)
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

    public componentWillReceiveProps(props: MapOptionsState) {
        props.location.map(location => {
            const zoom = this.state.zoom <= zoomOnLocationChange
                ? zoomOnLocationChange
                : this.state.zoom

            const coord = this.fromLonLat([ +location.coord.lat, +location.coord.lon ])

            this.setState({
                coord,
                location: Option.of(location),
                zoom
            })

            this.addMarker(location.name, coord)
        })
    }

    public render() {
        const height = process.env.REACT_APP_HISTORY_AND_MAP_HEIGHT
        const coord = this.toLonLat(this.state.coord)
        return (
            <MapContainer>
                <MapInfo>
                    zoom level ({this.state.zoom})
                    <CoordInfo>[{coord[1].toPrecision(8)}, {coord[0].toPrecision(9)}]</CoordInfo>
                </MapInfo>
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
  
        navigator.geolocation.getCurrentPosition(
            pos => coords = this.fromLonLat([ pos.coords.latitude, pos.coords.longitude ]),
            () => alert("Sadly, your browser cannot\nretrieve your current position.\nYou can check it out at:\nhttps://html5demos.com/geo/"),
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 8000
            }
        )

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
        const provider = Option.of(process.env.REACT_APP_MAP_TILES_PROVIDER as string).getOrElse("osm")
        switch (provider.toLowerCase()) {
            case "stamen" :
                return new XYZSource({
                    url: "http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg"
                })

            case "osm" :
            default :
                return new SourceOSM()
        }
    }
                                                         // 'EPSG:3857' -> 'EPSG:4326'
    private toLonLat = (coord: [number, number]) => Proj.toLonLat([ coord[0], coord[1] ])

    private updateMap() {
        const state = this.state
        this.view.setCenter(state.coord)
        this.view.setZoom(state.zoom)
    }
}

const CoordInfo = styled.span`
    padding-left: 38px;
`

const MapContainer = styled.div`
    @media (max-width: 991px) {
        margin-bottom: 18px;
    }
`

const MapInfo = styled.div`
    @media (max-width: 576px) {
        font-size: 0.9rem;
    }
    padding-bottom: 6px;
`

const mapStateToProps = (state: AppState): MapState => ({
    location: state.mapState.location
})

export default connect(mapStateToProps)(MapComponent)

/* to animate the moving between 2 places you can use...
       map.getView().animate({center: coords, zoom: 10})
*/
