import React from "react"
import * as Renderer from 'react-test-renderer'

import { none } from "ts-option"

import  { RemoveLocation } from "../../../../containers/history/RemoveLocation"

import { HistoryProps } from "../../../../store/history/actions"

import { HistoryItem } from "../../../../store/history/types"

describe("--> Snapshot for Containers > history > 'RemoveLocation'", () => {
    let props: HistoryProps & HistoryItem

    beforeEach(() => {
        props = {
            lastUpdate: none,
            location: {
                coord: { lat: "", lon: "" },
                country: { code : "IT", name: "Italy" },
                geoId: 0,
                name: "",
                tz: ""
            },
            reloadLocation: jest.fn(),
            removeLocation: jest.fn(),
            weatherData: none
        }
    })

    it("matches", () => {
        const component = Renderer.create(
            <RemoveLocation {...props} />    
        )

        const tree = component.toJSON()
        expect(tree).toMatchSnapshot();
    });
})
