import React from "react"
import * as Renderer from 'react-test-renderer'

import  { City } from "../../../../containers/location/City"

import { CityProps } from "../../../../store/location/city/actions"

describe("--> Snapshot for Containers > location > 'City'", () => {
    let props: CityProps

    beforeEach(() => {
        props = {
            locationSelected: jest.fn(),
            suggestionsLookup: jest.fn(),
            suggestionsReset:  jest.fn()
        }
    })

    it("matches", () => {
        const component = Renderer.create(
            <City {...props} />    
        )

        const tree = component.toJSON()
        expect(tree).toMatchSnapshot();
    });
})
