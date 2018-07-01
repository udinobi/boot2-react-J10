/*
 * Cloned from ol-hashed 2.0.0-beta.2
 *
 */

import hashed from "hashed"

import Map from "ol/map"
import proj from "ol/proj"
import View from "ol/view"

import { num2Text } from "./utils"

function synchronize(map: Map, animate?: { duration: number | undefined}) {

    const view: View = map.getView()

    const projection = view.getProjection().getCode()

    const hasDefinedView = !!view.getCenter() && view.getResolution() !== undefined

    const initZoom = () => {
        const viewport = map.getViewport()
        return viewport ? Math.LOG2E * Math.log(viewport.clientWidth / 256) : 0
    }

    const config = {
        center: {
            default: hasDefinedView ? view.getCenter() : [0, 0],

            deserialize: (str: string) => {
                const parts = str.split(',')
                if (parts.length !== 2) {
                    throw new Error("Expected lon,lat but got " + str)
                }

                const coord: [ number, number ] = [parseFloat(parts[1]), parseFloat(parts[0])]
                return proj.transform(coord, "EPSG:4326", projection)
            },

            serialize: (coords: [number, number], centerState: any) => {
                const coord = proj.transform(coords, projection, "EPSG:4326")
                return `${num2Text(coord[1], 8)},${num2Text(coord[0], 9)}`
            }
        },

        rotation: {
            default: hasDefinedView ? view.getRotation() : 0,

            deserialize: Number,

            serialize: (value: number) =>  num2Text(value, 2)
        },

        zoom: {
            default: hasDefinedView ? view.getZoom() : initZoom(),

            deserialize: Number,

            serialize: (value: number) =>  num2Text(value, 2)
        },
    }

    function hashHandler(viewState: any) {
        if (hasDefinedView && animate) {
            const duration = "duration" in animate ? animate.duration : 250
            view.animate(Object.assign({}, viewState, duration))
            return
        }

        if ("center" in viewState) {
            view.setCenter(viewState.center)
        }

        if ("zoom" in viewState) {
            view.setZoom(viewState.zoom)
        }

        if ("rotation" in viewState) {
            view.setRotation(viewState.rotation)
        }
    }

    const update = hashed.register(config, hashHandler)

    const onMoveEnd = () => {
      update({
            center: view.getCenter(),
            rotation: view.getRotation(),
            zoom: view.getZoom(),
        })
    }

    map.on("moveend", onMoveEnd)

    return function unregister() {
        map.un("moveend", onMoveEnd)
        hashed.unregister(hashHandler)
    }
}

export default synchronize
